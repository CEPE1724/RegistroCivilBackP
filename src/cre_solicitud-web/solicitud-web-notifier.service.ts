import { Injectable } from '@nestjs/common';
import { CreSolicitudwebWsService } from '../cre_solicitudweb-ws/cre_solicitudweb-ws.service'
import { CreSolicitudwebWsGateway } from '../cre_solicitudweb-ws/cre_solicitudweb-ws.gateway';
import { CreSolicitudWeb } from './entities/cre_solicitud-web.entity';
@Injectable()
export class SolicitudWebNotifierService {
  constructor(
    private readonly wsService: CreSolicitudwebWsService,
    private readonly wsGateway: CreSolicitudwebWsGateway,
  ) {}

 async emitirCambioSolicitudWeb(params: {
  solicitud: CreSolicitudWeb;
  cambios: any;
  usuarioEjecutor?: any;
  original?: CreSolicitudWeb;
}) {
  const { solicitud, cambios, usuarioEjecutor, original } = params;
  const idUsuarioEjecutor = usuarioEjecutor?.idUsuario;
  const idGrupoEjecutor = usuarioEjecutor?.idGrupo;
  const idAnalista = solicitud.idAnalista;

  console.log('ID Analista:', idAnalista);
  console.log('Usuario Ejecutor:', usuarioEjecutor);
  console.log('ID Usuario Ejecutor:', idUsuarioEjecutor);
  console.log('ID Grupo Ejecutor:', idGrupoEjecutor);

  // Construir mensaje
  const mensajes: string[] = [];
  const camposConMensajes: Record<string, string> = {
    idEstadoVerificacionDocumental: 'Se actualizó la verificación documental',
    idEstadoVerificacionSolicitud: 'Se cambió el estado de la solicitud',
    idEstadoVerificacionTelefonica: 'Se actualizó la verificación telefónica',
    idEstadoVerificacionTerrena: 'Se actualizó la verificación de terreno',
    idEstadoVerificacionDomicilio: 'Se actualizó la verificación del domicilio',
    Resultado: 'Se actualizó el resultado final de la solicitud ',
    Entrada: 'Se cambió el valor de entrada inicial',
    TerrenoDomicilio: 'Se modificó el terreno del domicilio',
    TerrenoLaboral: 'Se modificó el terreno laboral',
    Estado: 'Se cambió el estado general de la solicitud',
  };

  for (const campo in camposConMensajes) {
    if (
      campo in cambios &&
      original?.[campo as keyof CreSolicitudWeb] !== solicitud?.[campo as keyof CreSolicitudWeb]
    ) {
      mensajes.push(camposConMensajes[campo]);
    }
  }

  if (mensajes.length === 0) {
    mensajes.push('La solicitud fue actualizada');
  }

  const mensajeFinal = `${mensajes.join(', ')} (ID: ${solicitud.NumeroSolicitud || solicitud.idCre_SolicitudWeb})`;

  // ✅ Emitir evento global a TODOS los usuarios conectados
  this.wsGateway.wss.emit('solicitud-web-changed', {
    id: solicitud.idCre_SolicitudWeb,
    cambios,
    updatedAt: new Date(),
  });

  // ✅ Función helper para notificar usuarios usando Redis rooms
  const notificarUsuarioPorId = (idUsuario: number) => {
    if (!idUsuario) {
      console.log('⚠️ ID de usuario no válido');
      return;
    }
    console.log(`📤 Notificando a usuario ID: ${idUsuario} en room: user:${idUsuario}`);
    
    // ✅ Usar Redis rooms - funciona en TODAS las instancias del servidor
    this.wsGateway.wss.to(`user:${idUsuario}`).emit('solicitud-web-usuario', {
      id: solicitud.idCre_SolicitudWeb,
      cambios,
      mensaje: mensajeFinal,
    });
  };

  // ✅ Lógica de notificación optimizada con Redis rooms
  if (idGrupoEjecutor === 1) {
    // Admin o grupo 1, notificar ambos (analista y vendedor)
    console.log('✅ Ejecutor es admin o grupo 1, notificando a analista');
    if (idAnalista) {
      notificarUsuarioPorId(idAnalista);
    }
    // TODO: Si tienes el idUsuario del vendedor, agrégalo aquí
    // notificarUsuarioPorId(idVendedor);
    
  } else if (idUsuarioEjecutor === idAnalista) {
    // Si ejecutor es analista, notificar vendedor
    console.log('✅ Ejecutor es analista');
    // TODO: Si tienes el idUsuario del vendedor, agrégalo aquí
    // notificarUsuarioPorId(idVendedor);
    
  } else {
    // Si ejecutor es vendedor u otro, notificar analista
    console.log('✅ Ejecutor es vendedor u otro, notificando analista');
    if (idAnalista) {
      notificarUsuarioPorId(idAnalista);
    }
  }
}

  
  
}
