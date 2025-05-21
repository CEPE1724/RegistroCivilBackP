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
  
    // Enviar notificaciones a usuarios involucrados
    const notificarUsuario = (socket: any) => {
      socket?.emit('solicitud-web-usuario', {
        id: solicitud.idCre_SolicitudWeb,
        cambios,
        mensaje: mensajeFinal,
      });
    };
  
    if (idGrupoEjecutor === 1) {
      if (idAnalista) notificarUsuario(this.wsService.getSocketByUserId(idAnalista));
      if (nombreVendedor) notificarUsuario(this.wsService.getSocketByNombre(nombreVendedor));
    } else {
      if (idUsuarioEjecutor === idAnalista && nombreVendedor) {
        notificarUsuario(this.wsService.getSocketByNombre(nombreVendedor));
      }
  
      if (nombreVendedor === usuarioEjecutor?.Nombre && idAnalista) {
        notificarUsuario(this.wsService.getSocketByUserId(idAnalista));
      }
    }
  }
  
  
}
