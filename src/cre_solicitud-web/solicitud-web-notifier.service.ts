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
  const nombreVendedor = solicitud.Usuario;

  console.log('ID Analista:', idAnalista);
  console.log('Nombre Vendedor:', nombreVendedor);
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

  // Emitir evento global
  this.wsGateway.wss.emit('solicitud-web-changed', {
    id: solicitud.idCre_SolicitudWeb,
    cambios,
    updatedAt: new Date(),
  });

  const notificarUsuario = (socket: any) => {
    if (!socket) {
      console.log('Socket no encontrado, no se puede notificar');
      return;
    }
    console.log('Notificando usuario con socket:', socket.id || socket);
    socket.emit('solicitud-web-usuario', {
      id: solicitud.idCre_SolicitudWeb,
      cambios,
      mensaje: mensajeFinal,
    });
  };

  // Lógica de notificación
  if (idGrupoEjecutor === 1) {
    // Admin o grupo 1, notificar ambos
    console.log('Ejecutor es admin o grupo 1, notificando a analista y vendedor');
    if (idAnalista) {
      const socketAnalista = this.wsService.getSocketByUserId(idAnalista);
      console.log('Socket Analista:', socketAnalista);
      notificarUsuario(socketAnalista);
    }
    if (nombreVendedor) {
      const socketVendedor = this.wsService.getSocketByNombre(nombreVendedor);
      console.log('Socket Vendedor:', socketVendedor);
      notificarUsuario(socketVendedor);
    }
  } else if (idUsuarioEjecutor === idAnalista) {
    // Si ejecutor es analista, notificar vendedor
    console.log('Ejecutor es analista, notificando vendedor');
    if (nombreVendedor) {
      const socketVendedor = this.wsService.getSocketByNombre(nombreVendedor);
      console.log('Socket Vendedor:', socketVendedor);
      notificarUsuario(socketVendedor);
    }
  } else if (nombreVendedor === usuarioEjecutor?.Nombre) {
    // Si ejecutor es vendedor, notificar analista
    console.log('Ejecutor es vendedor, notificando analista');
    if (idAnalista) {
      const socketAnalista = this.wsService.getSocketByUserId(idAnalista);
      console.log('Socket Analista:', socketAnalista);
      notificarUsuario(socketAnalista);
    }
  } else {
    console.log('Ejecutor no es ni analista, ni vendedor ni admin/grupo 1. No se notifica.');
  }
}

  
  
}
