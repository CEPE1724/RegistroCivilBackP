# Cambios en el Frontend - AuthContext

## 1. Modificar la función `login` para guardar timestamp

```javascript
// Función de login
const login = (newToken, expirationTime) => {
  setToken(newToken);
  localStorage.setItem("token", newToken);
  localStorage.setItem("tokenExpiration", expirationTime);
  localStorage.setItem("loginTimestamp", Date.now().toString()); // ✅ NUEVO
  setIsLoggedIn(true);
  setIsSessionExpired(false);
};
```

## 2. Modificar el useEffect del socket para enviar `isNewLogin`

```javascript
useEffect(() => {
  if (token && !socketRef.current) {
    // Verificar si el login fue reciente (últimos 5 segundos)
    const loginTimestamp = parseInt(localStorage.getItem("loginTimestamp") || "0");
    const timeSinceLogin = Date.now() - loginTimestamp;
    const isNewLogin = timeSinceLogin < 5000; // true si login fue hace menos de 5 segundos
    
    console.log(`🔌 Conectando WebSocket | Nuevo Login: ${isNewLogin} | Tiempo desde login: ${timeSinceLogin}ms`);
    
    const socket = connectToServer(token, isNewLogin); // ✅ MODIFICADO: pasar isNewLogin
    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("✅ WebSocket conectado");
      setIsConnected(true);
    });
    
    socket.on("disconnect", () => {
      console.log("❌ WebSocket desconectado");
      setIsConnected(false);
    });
    
    socket.on("clients-updated", (clients) => setConnectedClients(clients));

    // Escuchar el evento de sesión terminada por nuevo login
    socket.on("session-terminated", (data) => {
      console.warn("⚠️ Sesión terminada:", data);
      setSessionMessage(data.message || "Tu sesión fue cerrada por un nuevo login");
      setShowSessionModal(true);
      
      setTimeout(() => {
        setShowSessionModal(false);
        logout();
      }, 3000);
    });

    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }
}, [token]);
```

## 3. Modificar `socket-client.js` (archivo donde defines `connectToServer`)

**Antes:**
```javascript
export const connectToServer = (token) => {
  const socket = io('http://tu-servidor', {
    auth: {
      token: token
    }
  });
  return socket;
};
```

**Después:**
```javascript
export const connectToServer = (token, isNewLogin = false) => {
  const socket = io('http://tu-servidor', {
    auth: {
      token: token,
      isNewLogin: isNewLogin  // ✅ NUEVO
    }
  });
  return socket;
};
```

## 4. Modificar el `logout` para limpiar el timestamp

```javascript
const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("tokenExpiration");
  localStorage.removeItem("rutaUsuario");
  localStorage.removeItem("loginTimestamp"); // ✅ NUEVO
  setToken(null);
  setIsSessionExpired(false);
  setIsLoggedIn(false);
  setUserData(null);
  setUserUsuario(null);
  navigate("/login");
};

const logoutinactividad = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("tokenExpiration");
  localStorage.removeItem("rutaUsuario");
  localStorage.removeItem("loginTimestamp"); // ✅ NUEVO
  setToken(null);
  setIsSessionExpired2(true);
  setIsLoggedIn(false);
  setUserData(null);
  setUserUsuario(null);
  navigate("/login");
};
```

## Comportamiento esperado

✅ **Login nuevo** (desde formulario):
- Guarda `loginTimestamp` en localStorage
- `isNewLogin = true` → cierra TODAS las sesiones anteriores en otros navegadores/pestañas

✅ **Duplicar pestaña / Refrescar**:
- Lee `loginTimestamp` del localStorage
- Si pasó más de 5 segundos: `isNewLogin = false` → permite múltiples pestañas

✅ **Resultado**:
- Login nuevo → cierra todo y deja solo la nueva sesión
- Múltiples pestañas → todas funcionan simultáneamente hasta el próximo login
