# 🚀 Refactorización: Sistema de Solicitudes Web Asíncrono

## ✅ **Cambios Implementados**

### **Problema Resuelto**
- ❌ **ANTES**: Procesamiento síncrono de 30-60 segundos → duplicidades, timeouts, mala UX
- ✅ **AHORA**: Procesamiento asíncrono con respuesta inmediata → sin duplicidades, progreso en tiempo real

---

## 📋 **Arquitectura Nueva**

### **Flujo de Procesamiento**

```
┌─────────────────────────────────────────────────────────────┐
│  FRONTEND                                                    │
├─────────────────────────────────────────────────────────────┤
│  1. Genera UUID único (idempotencyKey)                      │
│  2. POST /solicitud-web/iniciar + DTO                       │
│  3. Recibe respuesta INMEDIATA (<2s)                        │
│  4. Conecta WebSocket para recibir actualizaciones          │
└─────────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────┐
│  BACKEND - iniciarProcesoSolicitud() (SÍNCRONO - <2s)       │
├─────────────────────────────────────────────────────────────┤
│  1. ✅ Verificar idempotencia (UUID)                        │
│  2. 🔒 Adquirir lock distribuido (Redis)                   │
│  3. ✅ Validar solicitud activa existente                   │
│  4. 💾 Crear solicitud en estado PROCESANDO (0)            │
│  5. 📊 Guardar estado inicial en Redis                     │
│  6. 🚀 Iniciar procesamiento async (background)            │
│  7. 📤 Retornar INMEDIATAMENTE                             │
└─────────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────┐
│  BACKEND - procesarSolicitudAsync() (ASYNC - 30-60s)        │
├─────────────────────────────────────────────────────────────┤
│  1. 🔍 Consultar Equifax (3-5s) → Progreso 10-20%          │
│  2. 🏢 Consultar COGNO (30-60s) → Progreso 25-70%          │
│     - Token                                                  │
│     - Datos personales                                       │
│     - Datos laborales                                        │
│     - Jubilado, deudas                                       │
│  3. 💾 Guardar en BD (2-4s) → Progreso 70-85%              │
│  4. 🎯 Calificar crédito (2-3s) → Progreso 85-100%         │
│  5. 🔔 Emitir WebSocket de completado                      │
│  6. 🔓 Liberar lock                                        │
└─────────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────┐
│  FRONTEND - Recibe eventos WebSocket                        │
├─────────────────────────────────────────────────────────────┤
│  - solicitud-progreso → Actualiza barra (5%, 10%, 25%...)  │
│  - solicitud-web-completada → Muestra resultado            │
│  - solicitud-web-error → Muestra error                     │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔧 **Cambios en el Código**

### **1. DTO Actualizado**

```typescript
// dto/create-cre_solicitud-web.dto.ts

export class CreateCreSolicitudWebDto {
  // ... campos existentes ...

  @IsUUID()
  @IsOptional()
  idempotencyKey?: string; // ← NUEVO: UUID para idempotencia
}
```

### **2. Servicio Refactorizado**

```typescript
// cre_solicitud-web.service.ts

@Injectable()
export class CreSolicitudWebService {
  constructor(
    // ... inyecciones existentes ...
    @Inject(CACHE_MANAGER) private cacheManager: Cache, // ← NUEVO
  ) {}

  // NUEVO: Endpoint principal (reemplaza create)
  async iniciarProcesoSolicitud(dto: CreateCreSolicitudWebDto) {
    // 1. Idempotencia
    // 2. Lock distribuido
    // 3. Crear solicitud
    // 4. Iniciar async
    // 5. Retornar INMEDIATAMENTE
  }

  // NUEVO: Procesamiento en background
  private async procesarSolicitudAsync(...) {
    // Consultas COGNO + Equifax
    // Guardar datos
    // Calificar
    // Emitir WebSocket
  }

  // NUEVO: Consultar estado
  async obtenerEstadoProceso(idSolicitud: number) {
    // Retorna estado actual desde Redis
  }

  // ANTIGUO: Mantenido para compatibilidad
  async create(dto: CreateCreSolicitudWebDto) {
    // Redirige a iniciarProcesoSolicitud()
  }
}
```

---

## 📡 **Integración Frontend**

### **Ejemplo React/TypeScript**

```typescript
import { v4 as uuidv4 } from 'uuid';
import io from 'socket.io-client';

async function crearSolicitud(formData) {
  const idempotencyKey = uuidv4(); // Generar UUID único
  
  try {
    // 1. Conectar WebSocket
    const socket = io('http://localhost:3000');
    
    // 2. Configurar listeners
    socket.on('solicitud-progreso', (data) => {
      if (data.idSolicitud === idSolicitud) {
        setProgreso(data.progreso);
        setMensaje(data.mensaje);
        setFase(data.fase);
      }
    });
    
    socket.on('solicitud-web-completada', (data) => {
      if (data.idSolicitud === idSolicitud) {
        setEstado('COMPLETADA');
        mostrarResultado(data);
      }
    });
    
    socket.on('solicitud-web-error', (data) => {
      if (data.idSolicitud === idSolicitud) {
        mostrarError(data.error);
      }
    });
    
    // 3. Enviar solicitud
    const response = await api.post('/solicitud-web/iniciar', {
      ...formData,
      idempotencyKey, // ← Incluir UUID
    });
    
    if (!response.data.success) {
      mostrarError(response.data.mensaje);
      return;
    }
    
    const { idSolicitud } = response.data.data;
    
    // 4. Mostrar modal de progreso
    mostrarModalProgreso(idSolicitud);
    
    console.log('✅ Solicitud iniciada:', idSolicitud);
    
  } catch (error) {
    mostrarError(error.message);
  }
}
```

### **Ejemplo UI con Progreso**

```tsx
function ModalProgresoSolicitud({ idSolicitud }) {
  const [progreso, setProgreso] = useState(0);
  const [fase, setFase] = useState('INICIANDO');
  const [mensaje, setMensaje] = useState('');

  return (
    <Modal>
      <h3>Procesando Solicitud #{idSolicitud}</h3>
      
      <ProgressBar value={progreso} max={100} />
      
      <p className="fase">{fase}</p>
      <p className="mensaje">{mensaje}</p>
      
      {/* Mensajes amigables por fase */}
      {fase === 'CONSULTANDO_COGNO' && (
        <Alert type="info">
          Consultando datos personales... 
          Esto puede tomar 1-2 minutos ⏳
        </Alert>
      )}
    </Modal>
  );
}
```

---

## 🎯 **Estados de Solicitud**

| Estado | Valor | Descripción |
|--------|-------|-------------|
| **PROCESANDO** | 0 | Solicitud creada, procesando async |
| **APROBADA** | 1 | Calificación exitosa |
| **PENDIENTE** | 2 | Requiere revisión manual |
| **RECHAZADA** | 5 | No cumple requisitos |
| **ERROR** | 6 | Error durante procesamiento |

---

## 📊 **Fases del Proceso**

| Fase | Progreso | Duración | Descripción |
|------|----------|----------|-------------|
| `INICIADO` | 5% | <1s | Solicitud creada |
| `CONSULTANDO_EQUIFAX` | 10% | 3-5s | Verificando historial crediticio |
| `EQUIFAX_COMPLETADO` | 20% | - | Historial verificado |
| `CONSULTANDO_COGNO` | 25% | 5-10s | Obteniendo token |
| `TOKEN_OBTENIDO` | 30% | - | Token obtenido |
| `DATOS_PERSONALES_OBTENIDOS` | 50% | 20-30s | Datos personales consultados |
| `DATOS_LABORALES_OBTENIDOS` | 70% | 10-20s | Datos laborales consultados |
| `DATOS_GUARDADOS` | 85% | 2-4s | Información guardada en BD |
| `COMPLETADO` | 100% | 2-3s | Calificación finalizada |
| `ERROR` | 0% | - | Ocurrió un error |

---

## 🔔 **Eventos WebSocket**

### **1. solicitud-progreso**
```typescript
{
  idSolicitud: number,
  fase: string,
  progreso: number, // 0-100
  mensaje: string,
  fechaUltimaActualizacion: Date
}
```

### **2. solicitud-web-completada**
```typescript
{
  idSolicitud: number,
  numeroSolicitud: string,
  estado: 'APROBADA' | 'RECHAZADA',
  tipoCliente: number,
  solicitud: CreSolicitudWeb
}
```

### **3. solicitud-web-error**
```typescript
{
  idSolicitud: number,
  error: string,
  fase: string
}
```

---

## 🔍 **Endpoint Consultar Estado (Opcional)**

Si el frontend pierde conexión WebSocket, puede consultar el estado:

```typescript
// GET /solicitud-web/:id/estado
const estado = await api.get(`/solicitud-web/${idSolicitud}/estado`);

console.log(estado);
// {
//   idSolicitud: 123,
//   fase: 'CONSULTANDO_COGNO',
//   progreso: 35,
//   mensaje: 'Consultando datos personales...',
//   fechaUltimaActualizacion: '2025-12-16T10:30:00Z'
// }
```

---

## ✅ **Ventajas del Nuevo Sistema**

| Aspecto | Antes | Después |
|---------|-------|---------|
| **Tiempo de respuesta** | 30-60s bloqueado | <2s respuesta inmediata |
| **Duplicidad** | ❌ Común (doble clic) | ✅ Eliminada (idempotencia) |
| **Progreso visible** | ❌ Loading genérico | ✅ Barra + mensajes por fase |
| **Reintento** | ❌ Reprocesa todo | ✅ Solo reenvía UUID |
| **Timeout navegador** | ❌ Corta conexión | ✅ Proceso sigue en background |
| **Lock distribuido** | ❌ En memoria (se pierde) | ✅ Redis (persistente) |
| **UX** | ❌ Usuario espera sin info | ✅ Feedback tiempo real |
| **Escalabilidad** | ❌ 1 thread 60s | ✅ Libera thread inmediatamente |
| **Cache Equifax** | ❌ Consulta siempre | ✅ Cache por mes |
| **Debugging** | ❌ Difícil | ✅ Logs por fase |

---

## 🚨 **Notas Importantes**

### **Idempotencia**
- El frontend **DEBE** generar un UUID único por solicitud
- Si el usuario hace doble clic → segunda llamada retorna resultado cacheado
- TTL: 24 horas en Redis

### **Lock Distribuido**
- TTL: 90 segundos (mayor que tiempo máximo de COGNO)
- Funciona con múltiples instancias del servidor
- Se libera automáticamente si el proceso falla

### **Estados en Redis**
- TTL: 24 horas
- Permite consultar progreso sin consultar BD
- Se limpia automáticamente

### **WebSocket**
- Es la forma RECOMENDADA de obtener actualizaciones
- Si no está disponible, usar polling con `/estado`

---

## 🔄 **Migración**

### **Opción 1: Cambio Directo (Recomendado)**
El método `create()` ahora redirige a `iniciarProcesoSolicitud()`, por lo que:
- ✅ El frontend existente sigue funcionando
- ✅ Pero NO recibirá actualizaciones de progreso
- ⚠️ Actualizar frontend para usar WebSocket

### **Opción 2: Crear Nuevo Endpoint**
```typescript
// En controller:
@Post('iniciar')
async iniciar(@Body() dto: CreateCreSolicitudWebDto) {
  return await this.service.iniciarProcesoSolicitud(dto);
}

// Frontend:
// Cambiar de POST /solicitud-web a POST /solicitud-web/iniciar
```

---

## 📝 **Checklist de Implementación Frontend**

- [ ] Agregar dependencia: `npm install uuid socket.io-client`
- [ ] Generar UUID único por solicitud
- [ ] Conectar WebSocket al servidor
- [ ] Escuchar eventos: `solicitud-progreso`, `solicitud-web-completada`, `solicitud-web-error`
- [ ] Crear componente de progreso visual
- [ ] Manejar reintentos con mismo UUID
- [ ] Implementar fallback a polling si WebSocket falla
- [ ] Actualizar mensajes de error amigables

---

## 🧪 **Testing**

### **Prueba 1: Duplicidad**
```bash
# Ejecutar 2 veces con mismo UUID
curl -X POST http://localhost:3000/solicitud-web/iniciar \
  -H "Content-Type: application/json" \
  -d '{"idempotencyKey": "same-uuid-123", "Cedula": "1234567890", ...}'

# Resultado: Segunda llamada retorna resultado cacheado
```

### **Prueba 2: Progreso**
```javascript
// Conectar WebSocket y observar eventos
const socket = io('http://localhost:3000');
socket.on('solicitud-progreso', console.log);
```

### **Prueba 3: Lock**
```bash
# Ejecutar 2 solicitudes simultáneas con DIFERENTE UUID pero MISMA CÉDULA
# Resultado: Segunda solicitud espera a que termine la primera
```

---

## 🐛 **Debugging**

### **Ver estado en Redis**
```bash
# Conectar a Redis
redis-cli

# Ver lock
GET lock:solicitud:1234567890

# Ver estado de proceso
GET proceso:solicitud:123

# Ver idempotencia
GET idempotency:crear-solicitud:uuid-123

# Ver cache Equifax
GET equifax:1234567890:2025-12
```

---

## 📞 **Soporte**

¿Dudas o problemas?
- Revisar logs del servidor: `[CreSolicitudWebService]`
- Verificar Redis esté corriendo
- Confirmar WebSocket Gateway configurado correctamente
