import { BadRequestException, Inject, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { Brackets, In, Repository } from 'typeorm';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { CreateCreSolicitudWebDto } from './dto/create-cre_solicitud-web.dto';
import { UpdateCreSolicitudWebDto } from './dto/update-cre_solicitud-web.dto';
import { CreSolicitudWeb } from './entities/cre_solicitud-web.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { FilterCreSolicitudWebDto } from './dto/filter-cre-solicitud-web.dto';
import { AuthService } from 'src/cognosolicitudcredito/auth/auth.service';
import { EqfxidentificacionconsultadaService } from 'src/eqfxidentificacionconsultada/eqfxidentificacionconsultada.service';
import { CreSolicitudwebWsGateway } from "../cre_solicitudweb-ws/cre_solicitudweb-ws.gateway";
import { CreSolicitudwebWsService } from 'src/cre_solicitudweb-ws/cre_solicitudweb-ws.service';
import { SolicitudWebNotifierService } from './solicitud-web-notifier.service';
import { EmailService } from 'src/email/email.service';
import { Socket } from 'dgram';
import { where } from 'sequelize';
import { DeudaEmovDto } from 'src/cognosolicitudcredito/dto/deudaEmov/deuda-emov.dto';
import { AfiliacionesDto } from 'src/cognosolicitudcredito/dto/afiliaciones/afiliaciones.dto';
import { AfiliacionIessDto } from 'src/cognosolicitudcredito/dto/afiliacion_iess/afiliacionesIess.dto';


@Injectable()
export class CreSolicitudWebService {
  private readonly EQFX_UAT = process.env.EQFX_UAT;
  private readonly EQFX_UAT_url = process.env.EQFX_UAT_url;
  private readonly EQFX_UAT_token = process.env.EQFX_UAT_token;
  private readonly logger = new Logger('CreSolicitudWebService');
  private readonly LOCK_TIMEOUT = 90000; // 90 segundos (mayor que tiempo de COGNO)
  private readonly processingRequests = new Map<string, { timestamp: number }>();

  constructor(
    @InjectRepository(CreSolicitudWeb)
    private readonly creSolicitudWebRepository: Repository<CreSolicitudWeb>,
    private readonly authService: AuthService,
    private readonly eqfxidentificacionconsultadaService: EqfxidentificacionconsultadaService,
    private readonly creSolicitudwebWsGateway: CreSolicitudwebWsGateway,
    private readonly creSolicitudwebWsService: CreSolicitudwebWsService,
    private readonly notifierService: SolicitudWebNotifierService,
    private readonly emailService: EmailService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) { }

  async create(createCreSolicitudWebDto: CreateCreSolicitudWebDto) {
    const cedula = createCreSolicitudWebDto.Cedula;
    const processing = this.processingRequests.get(cedula);
    if (processing && Date.now() - processing.timestamp < this.LOCK_TIMEOUT) {
      return {
        success: false,
        mensaje: 'Ya existe una solicitud en proceso para esta cédula. Por favor espere.',
        errorOrigen: 'SolicitudEnProceso',
        data: null,
      };
    }
    this.processingRequests.set(cedula, { timestamp: Date.now() });

    try {

      const existingSolicitud = await this.creSolicitudWebRepository.findOne({
        where: { Cedula: cedula, Estado: In([1, 2]) },
      });

      if (existingSolicitud) {
        return {
          success: false,
          mensaje: `Ya existe una solicitud activa (N° ${existingSolicitud.NumeroSolicitud}) para la cédula ${cedula}.`,
          errorOrigen: 'SolicitudExistente',
          data: null,
        };
      }

      let debeConsultarEquifax = true;
      const eqfxData = await this.eqfxidentificacionconsultadaService.findOneUAT(cedula);

      if (eqfxData.success) {
        const fechaConsulta = new Date(eqfxData.data.FechaSistema);
        const ahora = new Date();

        if (
          fechaConsulta.getMonth() === ahora.getMonth() &&
          fechaConsulta.getFullYear() === ahora.getFullYear()
        ) {
          debeConsultarEquifax = false;
        }
      }

      if (debeConsultarEquifax) {
        const equifaxResult = await this.EquifaxDataUAT('C', cedula);

        if (!equifaxResult.success) {
          return {
            success: false,
            mensaje: 'No se pudo consultar los datos en Equifax. Intente nuevamente más tarde.',
            errorOrigen: 'Equifax',
            data: null,
          };
        }
      }

      const token = await this.authService.getToken(cedula);
      if (!token) {
        return {
          success: false,
          mensaje: 'No se pudo obtener el token Cogno.',
          errorOrigen: 'AuthService',
          data: null,
        };
      }

      const apiResult = await this.authService.getApiData(token, cedula);
      if (!apiResult.success) {
        return {
          success: false,
          mensaje: `Error desde API externa: ${apiResult.mensaje}`,
          errorOrigen: 'ApiExterna',
          data: null,
        };
      }

      const apiData = apiResult.data;

      const trabajoResult = await this.authService.getApiDataTrabajo(token, cedula);
      const jubiladoResult = await this.authService.getApiDataJubilado(token, cedula);
      const deudaEmovResult = await this.authService.getApiDataDeudaEmov(token, cedula);

      const deudaData = deudaEmovResult.data?.deudaEmov?.[0];

      const idSituacionLaboral = createCreSolicitudWebDto.idSituacionLaboral;
      const idActEconomina = createCreSolicitudWebDto.idActEconomina;

      let trabajos = [];
      const esJubilado =
        jubiladoResult.success &&
        Array.isArray(jubiladoResult.data?.trabajos) &&
        jubiladoResult.data.trabajos.length > 0;

      // Obligatorio si es dependiente y no es actividad 301
      if (idSituacionLaboral === 1 && idActEconomina !== 301) {
        if (!trabajoResult.success || !trabajoResult.data?.trabajos?.length) {
          return {
            success: false,
            mensaje: 'Información laboral obligatoria no disponible.',
            errorOrigen: 'ApiEmpleo',
            data: null,
          };
        }
        trabajos = trabajoResult.data.trabajos;
      } else {
        if (trabajoResult.success && trabajoResult.data?.trabajos?.length) {
          trabajos = trabajoResult.data.trabajos;
        }
      }

      const bApiDataTrabajo = trabajos.length > 0 || (esJubilado && idActEconomina === 301);


      const creSolicitudWeb = this.creSolicitudWebRepository.create(createCreSolicitudWebDto);
      const savedSolicitud = await this.creSolicitudWebRepository.save(creSolicitudWeb);
      const idSolicitud = savedSolicitud.idCre_SolicitudWeb;

      const saveData = await this.authService.create(apiData, bApiDataTrabajo, idSolicitud);

      await this.authService.createNatural(apiData, saveData.idCognoSolicitudCredito, 0);

      if (
        apiData.personaNaturalConyuge?.personaConyuge?.identificacion &&
        apiData.personaNaturalConyuge?.personaConyuge?.nombre
      ) {
        await this.authService.createNaturalConyugue(
          apiData,
          saveData.idCognoSolicitudCredito,
          1,
        );
      }

      if (apiData.personaNatural.lugarNacimiento) {
        await this.authService.createLugarNacimiento(apiData, saveData.idCognoSolicitudCredito, 0);
      }

      if (apiData.estadoCivil.estadoCivil.descripcion === 'CASADO') {
        await this.authService.createLugarNacimiento(apiData, saveData.idCognoSolicitudCredito, 1);
      }

      await this.authService.createNacionalidades(apiData, saveData.idCognoSolicitudCredito);
      await this.authService.createProfesiones(apiData, saveData.idCognoSolicitudCredito);

      // Datos laborales
      if (!esJubilado && trabajos.length > 0) {
        await this.authService.createTrabajo(trabajos, saveData.idCognoSolicitudCredito);
      }

      if (esJubilado) {
        await this.authService.createTrabajoLite(
          jubiladoResult.data.trabajos,
          saveData.idCognoSolicitudCredito,
        );
      }

      if (deudaData) {
        await this.authService.guardarDeudaEmovConInfracciones(
          deudaData,
          saveData.idCognoSolicitudCredito,
        );
      }

      const storedProcedureResult = await this.creSolicitudWebRepository.query(
        `EXEC Cre_RetornaTipoCliente @Cedula = @0, @idSolicitud = @1`,
        [cedula, idSolicitud],
      );

      if (!storedProcedureResult || storedProcedureResult.length === 0) {
        return {
          success: false,
          mensaje: 'El procedimiento almacenado no devolvió resultados.',
          errorOrigen: 'StoredProcedure',
          data: null,
        };
      }

      const tipoCliente = storedProcedureResult[0].TipoCliente;
      const Resultado = storedProcedureResult[0].Resultado;
      const estado = Resultado === 0 ? 5 : 1;

      // Actualizar solicitud
      await this.creSolicitudWebRepository.update(idSolicitud, {
        idTipoCliente: tipoCliente || 0,
        Estado: estado,
      });

      const updatedSolicitud = await this.creSolicitudWebRepository.findOne({
        where: { idCre_SolicitudWeb: idSolicitud },
      });

      this.creSolicitudwebWsGateway.wss.emit('solicitud-web-changed', {
        id: savedSolicitud.idCre_SolicitudWeb,
        cambios: createCreSolicitudWebDto,
      });

      return {
        success: true,
        mensaje: `Solicitud N° ${savedSolicitud.NumeroSolicitud} creada exitosamente.`,
        data: updatedSolicitud,
      };
    } catch (error) {
      this.logger.error(`Error en create para cédula ${cedula}: ${error.message}`, error.stack);
      return {
        success: false,
        mensaje: 'Ocurrió un error inesperado al procesar la solicitud.',
        error: error.message,
        errorOrigen: 'Servidor',
      };
    } finally {
      // Liberar lock
      this.processingRequests.delete(cedula);
    }
  }

  /* =====================================================
   *                  MÉTODOS HELPER REDIS
   * ===================================================== */

  /**
   * Adquiere un lock distribuido usando Redis
   */
  private async adquirirLock(cedula: string): Promise<boolean> {
    const lockKey = `lock:solicitud:${cedula}`;
    const lockValue = Date.now().toString();

    try {
      // Intentar SET NX (solo si no existe) con expiración
      const result = await this.cacheManager.set(
        lockKey,
        lockValue,
        this.LOCK_TIMEOUT
      );

      if (result) {
        this.logger.log(`🔒 Lock adquirido para: ${cedula}`);
        return true;
      }

      // Verificar si es un lock antiguo (por si quedó colgado)
      const existingLock = await this.cacheManager.get<string>(lockKey);
      if (existingLock) {
        const lockTime = parseInt(existingLock);
        if (Date.now() - lockTime > this.LOCK_TIMEOUT) {
          // Lock expirado, forzar liberación
          await this.cacheManager.del(lockKey);
          return await this.adquirirLock(cedula);
        }
      }

      this.logger.warn(`⚠️ Lock ya existe para cédula: ${cedula}`);
      return false;
    } catch (error) {
      this.logger.error(`Error al adquirir lock: ${error.message}`);
      return false;
    }
  }

  /**
   * Libera el lock de Redis
   */
  private async liberarLock(cedula: string): Promise<void> {
    const lockKey = `lock:solicitud:${cedula}`;
    await this.cacheManager.del(lockKey);
    this.logger.log(`🔓 Lock liberado para: ${cedula}`);
  }

  /**
   * Verifica si una operación ya fue ejecutada (idempotencia)
   */
  private async verificarIdempotencia(
    key: string,
    operation: string
  ): Promise<{ existe: boolean; resultado?: any }> {
    const cacheKey = `idempotency:${operation}:${key}`;
    const cached = await this.cacheManager.get(cacheKey);

    if (cached) {
      this.logger.log(`✅ IDEMPOTENCIA - Operación ya ejecutada: ${cacheKey}`);
      return { existe: true, resultado: cached };
    }

    return { existe: false };
  }

  /**
   * Guarda resultado de operación para idempotencia
   */
  private async guardarIdempotencia(
    key: string,
    operation: string,
    resultado: any,
    ttl: number = 86400 // 24 horas
  ): Promise<void> {
    const cacheKey = `idempotency:${operation}:${key}`;
    await this.cacheManager.set(cacheKey, resultado, ttl);
    this.logger.log(`💾 Idempotencia guardada: ${cacheKey}`);
  }

  /* =====================================================
   *                  MÉTODOS HELPER REDIS
   * ===================================================== */

  /**
   * Adquiere un lock distribuido usando Redis
   */

  async obtenerEstadoProceso(idSolicitud: number): Promise<any> {
    const cacheKey = `proceso:solicitud:${idSolicitud}`;
    const estado = await this.cacheManager.get(cacheKey);

    if (!estado) {
      // Si no hay estado en cache, consultar BD para obtener info básica
      const solicitud = await this.creSolicitudWebRepository.findOne({
        where: { idCre_SolicitudWeb: idSolicitud }
      });

      if (!solicitud) {
        throw new NotFoundException('Solicitud no encontrada');
      }

      return {
        idSolicitud,
        fase: this.obtenerFaseByEstado(solicitud.Estado),
        progreso: this.obtenerProgresoByEstado(solicitud.Estado),
        mensaje: this.obtenerMensajeByEstado(solicitud.Estado),
        estado: solicitud.Estado,
        numeroSolicitud: solicitud.NumeroSolicitud,
        fechaUltimaActualizacion: solicitud.Fecha,
        encontradoEnBD: true
      };
    }

    return estado;
  }

  /**
   * Obtiene el estado de una solicitud por cédula
   */
  async obtenerEstadoPorCedula(cedula: string): Promise<any> {
    // Buscar solicitud activa por cédula
    const solicitud = await this.creSolicitudWebRepository.findOne({
      where: { Cedula: cedula, Estado: In([0, 1, 2]) }, // PROCESANDO, APROBADA, PENDIENTE
      order: { Fecha: 'DESC' }
    });

    if (!solicitud) {
      throw new NotFoundException('No se encontró una solicitud activa para esta cédula');
    }

    return await this.obtenerEstadoProceso(solicitud.idCre_SolicitudWeb);
  }

  /**
   * Obtiene historial completo del proceso de una solicitud
   */
  async obtenerHistorialProceso(idSolicitud: number): Promise<any> {
    const cacheKey = `proceso:solicitud:${idSolicitud}`;
    const historialKey = `historial:solicitud:${idSolicitud}`;

    // Obtener estado actual
    const estadoActual = await this.cacheManager.get(cacheKey);

    // Obtener historial almacenado
    const historial: any[] = (await this.cacheManager.get<any[]>(historialKey)) || [];

    // Obtener datos de la solicitud de BD
    const solicitud = await this.creSolicitudWebRepository.findOne({
      where: { idCre_SolicitudWeb: idSolicitud }
    });

    return {
      solicitud,
      estadoActual,
      historial,
      resumen: this.generarResumenProceso(estadoActual, historial, solicitud)
    };
  }

  /**
   * Guarda el estado del proceso en Redis con historial
   */
  private async guardarEstadoProceso(
    idSolicitud: number,
    estado: {
      fase: string;
      progreso: number;
      mensaje?: string;
      error?: string;
      datos?: any;
    }
  ): Promise<void> {
    const cacheKey = `proceso:solicitud:${idSolicitud}`;
    const historialKey = `historial:solicitud:${idSolicitud}`;

    const estadoActual = await this.cacheManager.get<any>(cacheKey) || {};

    const nuevoEstado = {
      ...estadoActual,
      ...estado,
      idSolicitud,
      fechaUltimaActualizacion: new Date(),
    };

    // Guardar estado actual
    await this.cacheManager.set(cacheKey, nuevoEstado, 86400); // 24 horas

    // Guardar en historial
    const historial = await this.cacheManager.get<any[]>(historialKey) || [];
    historial.push({
      ...nuevoEstado,
      timestamp: new Date()
    });

    // Mantener solo los últimos 50 estados en el historial
    if (historial.length > 50) {
      historial.splice(0, historial.length - 50);
    }

    await this.cacheManager.set(historialKey, historial, 172800); // 48 horas

    // Emitir WebSocket para actualización en tiempo real
    this.creSolicitudwebWsGateway.wss.emit('solicitud-progreso', nuevoEstado);

    this.logger.log(
      `📊 Estado actualizado - Solicitud ${idSolicitud}: ${estado.fase} (${estado.progreso}%)`
    );
  }

  /**
   * Helper para obtener fase por estado de BD
   */
  private obtenerFaseByEstado(estado: number): string {
    const estados = {
      0: 'PROCESANDO',
      1: 'APROBADA',
      2: 'PENDIENTE',
      3: 'EN_VERIFICACION',
      4: 'VERIFICADA',
      5: 'RECHAZADA',
      6: 'ERROR'
    };
    return estados[estado] || 'DESCONOCIDO';
  }

  /**
   * Helper para obtener progreso por estado de BD
   */
  private obtenerProgresoByEstado(estado: number): number {
    const progreso = {
      0: 50,   // PROCESANDO
      1: 100,  // APROBADA
      2: 90,   // PENDIENTE
      3: 95,   // EN_VERIFICACION
      4: 100,  // VERIFICADA
      5: 100,  // RECHAZADA
      6: 0     // ERROR
    };
    return progreso[estado] || 0;
  }

  /**
   * Helper para obtener mensaje por estado de BD
   */
  private obtenerMensajeByEstado(estado: number): string {
    const mensajes = {
      0: 'Solicitud en procesamiento...',
      1: 'Solicitud aprobada',
      2: 'Solicitud pendiente de documentación',
      3: 'En verificación telefónica',
      4: 'Solicitud verificada',
      5: 'Solicitud rechazada',
      6: 'Error en el procesamiento'
    };
    return mensajes[estado] || 'Estado desconocido';
  }

  /**
   * Genera un resumen del proceso
   */
  private generarResumenProceso(estadoActual: any, historial: any[], solicitud: any): any {
    const fasesCompletadas = historial?.map(h => h.fase) || [];
    const tiempoTotal = solicitud ? new Date().getTime() - new Date(solicitud.Fecha).getTime() : 0;

    return {
      fasesCompletadas: [...new Set(fasesCompletadas)],
      tiempoTranscurridoMs: tiempoTotal,
      tiempoTranscurridoFormateado: this.formatearTiempo(tiempoTotal),
      ultimaFase: estadoActual?.fase || 'DESCONOCIDO',
      progreso: estadoActual?.progreso || 0,
      error: estadoActual?.error || null,
      estadoBD: solicitud?.Estado,
      numeroSolicitud: solicitud?.NumeroSolicitud
    };
  }

  /**
   * Formatea tiempo en ms a texto legible
   */
  private formatearTiempo(ms: number): string {
    if (ms < 1000) return `${ms}ms`;
    if (ms < 60000) return `${Math.round(ms / 1000)}s`;
    if (ms < 3600000) return `${Math.round(ms / 60000)}min`;
    return `${Math.round(ms / 3600000)}h`;
  }

  /**
   * Obtiene datos de Equifax desde cache si existen
   */
  private async obtenerEquifaxCache(cedula: string): Promise<any> {
    const year = new Date().getFullYear();
    const month = new Date().getMonth() + 1;
    const cacheKey = `equifax:${cedula}:${year}-${month}`;

    const cached = await this.cacheManager.get(cacheKey);

    if (cached) {
      this.logger.log(`✅ Equifax desde cache: ${cedula}`);
      return cached;
    }

    return null;
  }

  /**
   * Guarda resultado de Equifax en cache hasta fin de mes
   */
  private async guardarEquifaxCache(cedula: string, data: any): Promise<void> {
    const year = new Date().getFullYear();
    const month = new Date().getMonth() + 1;
    const cacheKey = `equifax:${cedula}:${year}-${month}`;

    // Cache hasta fin de mes
    const finDeMes = new Date(year, month, 0, 23, 59, 59);
    const ttl = Math.floor((finDeMes.getTime() - Date.now()) / 1000);

    await this.cacheManager.set(cacheKey, data, ttl);
    this.logger.log(`💾 Equifax guardado en cache: ${cacheKey} (TTL: ${ttl}s)`);
  }

  /* =====================================================
   *              FIN MÉTODOS HELPER REDIS
   * ===================================================== */

  private async EquifaxData(tipoDocumento: string, numeroDocumento: string): Promise<{ success: boolean, message: string }> {
    const PostData = {
      tipoDocumento: tipoDocumento,
      numeroDocumento: numeroDocumento
    };
    try {
      const response = await axios.post('https://appservices.com.ec/v1/equifax/consultarEquifax', PostData, {
        headers: { 'Content-Type': 'application/json' }
      });
      return {
        success: true,
        message: response.data.message
      };
    } catch (error) {
      console.error("Error al obtener datos de Equifax:", error);
      return { success: false, message: "Error al obtener datos de Equifax." };
    }
  }

  private async EquifaxDataUAT(tipoDocumento: string, numeroDocumento: string): Promise<{ success: boolean, message: string }> {

    const PostData = {
      tipoDocumento: tipoDocumento,
      numeroDocumento: numeroDocumento
    };
    try {
      const response = await axios.post(this.EQFX_UAT_url, PostData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.EQFX_UAT_token}`
        }
      });
      console.log('Respuesta Equifax UAT:', response.data);
      return {
        success: true,
        message: response.data.message
      };
    } catch (error) {
      console.error("Error al obtener datos de Equifax:", error);
      return { success: false, message: "Error al obtener datos de Equifax." };
    }
  }
  private async callStoredProcedureRetornaTipoCliente(cedula: string, idSolicitud: number): Promise<any> {
    try {

      // Ejecutamos la consulta y pasamos el parámetro correctamente
      const result = await this.creSolicitudWebRepository.query(
        `EXEC Cre_RetornaTipoCliente @Cedula = @0, @idSolicitud = @1`, // Usamos el nombre del parámetro en la consulta
        [cedula, idSolicitud] // Aseguramos que el parámetro se pase como un objeto con el tipo correcto
      );
      // Si el procedimiento devuelve algo, procesamos el resultado
      return result;
    } catch (error) {
      this.logger.error('Error al llamar al procedimiento Cre_RetornaTipoCliente', error);
      throw new Error('Error al llamar al procedimiento almacenado Cre_RetornaTipoCliente');
    }
  }



  /**
   * MÉTODO ANTIGUO - DEPRECADO
   * Usar iniciarProcesoSolicitud() en su lugar
   * Mantenido para compatibilidad temporal
   */
  async createnuevasolicitud(createCreSolicitudWebDto: CreateCreSolicitudWebDto) {
    this.logger.warn('⚠️ Método create() deprecado. Use iniciarProcesoSolicitud()');
    return await this.iniciarProcesoSolicitud(createCreSolicitudWebDto);
  }

  /* =====================================================
   *      NUEVO FLUJO: PROCESAMIENTO ASÍNCRONO
   * ===================================================== */

  /**
   * ENDPOINT PRINCIPAL - Fase 1: Iniciar Proceso (Síncrono - <2s)
   * 
   * - Validaciones rápidas
   * - Creación de solicitud en estado PROCESANDO
   * - Inicia procesamiento asíncrono
   * - Retorna INMEDIATAMENTE
   */
  async iniciarProcesoSolicitud(createCreSolicitudWebDto: CreateCreSolicitudWebDto) {
    const cedula = createCreSolicitudWebDto.Cedula;
    const idempotencyKey = createCreSolicitudWebDto.idempotencyKey || uuidv4();

    this.logger.log(`🚀 Iniciando proceso de solicitud para cédula: ${cedula}`);

    try {
      /* =====================================================
       *          1. VERIFICAR IDEMPOTENCIA
       * ===================================================== */
      const idempotencia = await this.verificarIdempotencia(
        idempotencyKey,
        'crear-solicitud'
      );

      if (idempotencia.existe) {
        this.logger.log(`✅ Solicitud ya procesada (idempotencia): ${idempotencyKey}`);
        return idempotencia.resultado;
      }

      /* =====================================================
       *          2. ADQUIRIR LOCK DISTRIBUIDO
       * ===================================================== */
      const lockAdquirido = await this.adquirirLock(cedula);

      if (!lockAdquirido) {
        const resultado = {
          success: false,
          mensaje: 'Ya existe una solicitud en proceso para esta cédula. Por favor espere.',
          errorOrigen: 'SolicitudEnProceso',
          data: null,
        };
        await this.guardarIdempotencia(idempotencyKey, 'crear-solicitud', resultado);
        return resultado;
      }

      /* =====================================================
       *          3. VALIDAR SOLICITUD ACTIVA EXISTENTE
       * ===================================================== */
      const existingSolicitud = await this.creSolicitudWebRepository.findOne({
        where: { Cedula: cedula, Estado: In([1, 2]) },
      });

      if (existingSolicitud) {
        await this.liberarLock(cedula);
        const resultado = {
          success: false,
          mensaje: `Ya existe una solicitud activa (N° ${existingSolicitud.NumeroSolicitud}) para la cédula ${cedula}.`,
          errorOrigen: 'SolicitudExistente',
          data: existingSolicitud,
        };
        await this.guardarIdempotencia(idempotencyKey, 'crear-solicitud', resultado);
        return resultado;
      }

      /* =====================================================
       *          4. CREAR SOLICITUD EN ESTADO "PROCESANDO"
       * ===================================================== */
      const creSolicitudWeb = this.creSolicitudWebRepository.create({
        ...createCreSolicitudWebDto,
        Estado: 0, // PROCESANDO
        Fecha: new Date(),
      });

      const savedSolicitud = await this.creSolicitudWebRepository.save(creSolicitudWeb);
      const idSolicitud = savedSolicitud.idCre_SolicitudWeb;

      this.logger.log(`✅ Solicitud ${savedSolicitud.NumeroSolicitud} creada en estado PROCESANDO`);

      /* =====================================================
       *          5. GUARDAR ESTADO INICIAL EN REDIS
       * ===================================================== */
      await this.guardarEstadoProceso(idSolicitud, {
        fase: 'INICIADO',
        progreso: 5,
        mensaje: 'Solicitud creada, iniciando procesamiento...',
      });

      /* =====================================================
       *          6. INICIAR PROCESAMIENTO ASÍNCRONO
       * ===================================================== */
      // Ejecutar en background (sin await)
      this.procesarSolicitudAsync(
        idSolicitud,
        cedula,
        createCreSolicitudWebDto,
        idempotencyKey
      ).catch(async (error) => {
        this.logger.error(
          `❌ Error CRÍTICO en procesamiento async de solicitud ${idSolicitud}: ${error.message}`,
          error.stack
        );

        // Asegurar que el error llegue al frontend
        await this.guardarEstadoProceso(idSolicitud, {
          fase: 'ERROR',
          progreso: 0,
          mensaje: 'Error al procesar la solicitud',
          error: error.message,
        }).catch(() => { });

        this.creSolicitudwebWsGateway.wss.emit('solicitud-web-error', {
          idSolicitud,
          error: error.message,
          fase: 'INICIO_PROCESAMIENTO',
        });
      });

      /* =====================================================
       *          7. RESPUESTA INMEDIATA
       * ===================================================== */
      const resultado = {
        success: true,
        mensaje: 'Solicitud iniciada. Recibirás notificaciones del progreso en tiempo real.',
        data: {
          idSolicitud: savedSolicitud.idCre_SolicitudWeb,
          numeroSolicitud: savedSolicitud.NumeroSolicitud,
          cedula: savedSolicitud.Cedula,
          estado: 'PROCESANDO',
          mensaje: 'Consultando información, por favor espere (esto puede tomar 1-2 minutos)...',
        },
      };

      // Guardar en idempotencia
      await this.guardarIdempotencia(idempotencyKey, 'crear-solicitud', resultado);

      return resultado;
    } catch (error) {
      this.logger.error(`❌ Error al iniciar solicitud: ${error.message}`, error.stack);

      await this.liberarLock(cedula).catch(() => { });

      return {
        success: false,
        mensaje: 'Error al iniciar el proceso de solicitud.',
        error: error.message,
        errorOrigen: 'Servidor',
      };
    }
  }

  /**
   * Fase 2: Procesamiento Asíncrono (Background - 30-60s)
   * 
   * - Consulta COGNO (30-60s)
   * - Consulta Equifax (3-5s)
   * - Guarda datos en BD (2-4s)
   * - Califica crédito (2-3s)
   * - Emite WebSocket al finalizar
   */
  private async procesarSolicitudAsync(
    idSolicitud: number,
    cedula: string,
    dto: CreateCreSolicitudWebDto,
    idempotencyKey: string
  ): Promise<void> {
    this.logger.log(`⚙️ [ASYNC-START] Iniciando procesamiento async de solicitud ${idSolicitud}`);

    try {
      /* =====================================================
       *          FASE 1: CONSULTAR EQUIFAX (3-5s)
       * ===================================================== */
      this.logger.log(`📊 [EQUIFAX] Consultando Equifax para solicitud ${idSolicitud}`);

      await this.guardarEstadoProceso(idSolicitud, {
        fase: 'CONSULTANDO_EQUIFAX',
        progreso: 10,
        mensaje: 'Verificando historial crediticio...',
      });

      // Verificar cache primero
      let equifaxData = await this.obtenerEquifaxCache(cedula);

      // Si no está en cache, verificar si ya fue consultado este mes en BD
      if (!equifaxData) {
        this.logger.log(`🔍 [EQUIFAX] No encontrado en cache, verificando BD...`);

        let debeConsultarEquifax = true;
        const eqfxData = await this.eqfxidentificacionconsultadaService.findOneUAT(cedula);

        if (eqfxData.success) {
          const fechaConsulta = new Date(eqfxData.data.FechaSistema);
          const ahora = new Date();

          if (
            fechaConsulta.getMonth() === ahora.getMonth() &&
            fechaConsulta.getFullYear() === ahora.getFullYear()
          ) {
            debeConsultarEquifax = false;
            this.logger.log(`✅ [EQUIFAX] Encontrado en BD del mes actual, reutilizando datos`);
            // Reutilizar datos existentes y guardarlos en cache
            equifaxData = eqfxData;
            await this.guardarEquifaxCache(cedula, equifaxData);
          }
        }

        // Solo consultar API si no existe en BD del mes actual
        if (debeConsultarEquifax) {
          this.logger.log(`📡 [EQUIFAX] Consultando API externa para cédula ${cedula}`);
          const equifaxResult = await this.EquifaxDataUAT('C', cedula);

          if (!equifaxResult.success) {
            throw new Error('No se pudo consultar Equifax');
          }

          await this.guardarEquifaxCache(cedula, equifaxResult);
          equifaxData = equifaxResult;
          this.logger.log(`✅ [EQUIFAX] Consulta exitosa y guardada en cache`);
        }
      } else {
        this.logger.log(`✅ [EQUIFAX] Datos obtenidos desde cache`);
      }

      await this.guardarEstadoProceso(idSolicitud, {
        fase: 'EQUIFAX_COMPLETADO',
        progreso: 20,
        mensaje: 'Historial crediticio verificado',
      });

      /* =====================================================
       *          FASE 2: CONSULTAR COGNO (30-60s)
       * ===================================================== */
      this.logger.log(`🏢 [COGNO] Iniciando consulta COGNO para solicitud ${idSolicitud}`);

      await this.guardarEstadoProceso(idSolicitud, {
        fase: 'CONSULTANDO_COGNO',
        progreso: 25,
        mensaje: 'Consultando datos personales (esto puede tomar 1 minuto)...',
      });

      this.logger.log(`🔑 [COGNO] Obteniendo token...`);
      const token = await this.authService.getToken(cedula);
      if (!token) {
        throw new Error('No se pudo obtener token COGNO');
      }
      this.logger.log(`✅ [COGNO] Token obtenido`);

      await this.guardarEstadoProceso(idSolicitud, {
        fase: 'TOKEN_OBTENIDO',
        progreso: 30,
        mensaje: 'Obteniendo información personal...',
      });

      this.logger.log(`📋 [COGNO] Consultando datos generales...`);
      const apiResult = await this.authService.getApiData(token, cedula);
      if (!apiResult.success) {
        throw new Error(`Error API COGNO: ${apiResult.mensaje}`);
      }
      this.logger.log(`✅ [COGNO] Datos generales obtenidos`);

      const apiData = apiResult.data;

      await this.guardarEstadoProceso(idSolicitud, {
        fase: 'DATOS_PERSONALES_OBTENIDOS',
        progreso: 50,
        mensaje: 'Consultando información laboral...',
      });

      /* =====================================================
       *          FASE 3: DATOS LABORALES (10-20s)
       * ===================================================== */
      this.logger.log(`💼 [COGNO] Consultando datos laborales...`);

      const trabajoResult = await this.authService.getApiDataTrabajo(token, cedula);
      const jubiladoResult = await this.authService.getApiDataJubilado(token, cedula);
      const deudaEmovResult = await this.authService.getApiDataDeudaEmov(token, cedula);

      this.logger.log(`✅ [COGNO] Datos laborales consultados`);

      const deudaData = deudaEmovResult.data?.deudaEmov?.[0];

      const idSituacionLaboral = dto.idSituacionLaboral;
      const idActEconomina = dto.idActEconomina;

      let trabajos = [];
      const esJubilado =
        jubiladoResult.success &&
        Array.isArray(jubiladoResult.data?.trabajos) &&
        jubiladoResult.data.trabajos.length > 0;

      // Validar datos laborales si son obligatorios
      if (idSituacionLaboral === 1 && idActEconomina !== 301) {
        if (!trabajoResult.success || !trabajoResult.data?.trabajos?.length) {
          throw new Error('Información laboral obligatoria no disponible');
        }
        trabajos = trabajoResult.data.trabajos;
      } else {
        if (trabajoResult.success && trabajoResult.data?.trabajos?.length) {
          trabajos = trabajoResult.data.trabajos;
        }
      }

      const bApiDataTrabajo = trabajos.length > 0 || (esJubilado && idActEconomina === 301);

      await this.guardarEstadoProceso(idSolicitud, {
        fase: 'DATOS_LABORALES_OBTENIDOS',
        progreso: 70,
        mensaje: 'Guardando información...',
      });

      /* =====================================================
       *          FASE 4: GUARDAR DATOS EN BD (2-4s)
       * ===================================================== */
      this.logger.log(`💾 [BD] Guardando datos en base de datos...`);

      const saveData = await this.authService.create(apiData, bApiDataTrabajo, idSolicitud);
      this.logger.log(`✅ [BD] Registro principal creado: ${saveData.idCognoSolicitudCredito}`);

      await this.authService.createNatural(apiData, saveData.idCognoSolicitudCredito, 0);
      this.logger.log(`✅ [BD] Datos naturales guardados`);

      if (
        apiData.personaNaturalConyuge?.personaConyuge?.identificacion &&
        apiData.personaNaturalConyuge?.personaConyuge?.nombre
      ) {
        await this.authService.createNaturalConyugue(
          apiData,
          saveData.idCognoSolicitudCredito,
          1
        );
        this.logger.log(`✅ [BD] Datos de cónyuge guardados`);
      }

      if (apiData.personaNatural.lugarNacimiento) {
        await this.authService.createLugarNacimiento(apiData, saveData.idCognoSolicitudCredito, 0);
        this.logger.log(`✅ [BD] Lugar de nacimiento guardado`);
      }

      if (apiData.estadoCivil.estadoCivil.descripcion === 'CASADO') {
        await this.authService.createLugarNacimiento(apiData, saveData.idCognoSolicitudCredito, 1);
        this.logger.log(`✅ [BD] Datos domicilio cónyuge guardados`);
      }

      await this.authService.createNacionalidades(apiData, saveData.idCognoSolicitudCredito);
      await this.authService.createProfesiones(apiData, saveData.idCognoSolicitudCredito);
      this.logger.log(`✅ [BD] Nacionalidades y profesiones guardadas`);

      // Datos laborales
      if (!esJubilado && trabajos.length > 0) {
        await this.authService.createTrabajo(trabajos, saveData.idCognoSolicitudCredito);
        this.logger.log(`✅ [BD] Trabajos guardados (${trabajos.length} registros)`);
      }

      if (esJubilado) {
        await this.authService.createTrabajoLite(
          jubiladoResult.data.trabajos,
          saveData.idCognoSolicitudCredito
        );
        this.logger.log(`✅ [BD] Datos de jubilado guardados`);
      }

      if (deudaData) {
        await this.authService.guardarDeudaEmovConInfracciones(
          deudaData,
          saveData.idCognoSolicitudCredito
        );
        this.logger.log(`✅ [BD] Deuda EMOV guardada`);
      }

      await this.guardarEstadoProceso(idSolicitud, {
        fase: 'DATOS_GUARDADOS',
        progreso: 85,
        mensaje: 'Calificando crédito...',
      });

      /* =====================================================
       *          FASE 5: CALIFICACIÓN (2-3s)
       * ===================================================== */
      this.logger.log(`🎯 [CALIFICACIÓN] Ejecutando procedimiento almacenado...`);

      const storedProcedureResult = await this.creSolicitudWebRepository.query(
        `EXEC Cre_RetornaTipoCliente @Cedula = @0, @idSolicitud = @1`,
        [cedula, idSolicitud]
      );

      if (!storedProcedureResult || storedProcedureResult.length === 0) {
        throw new Error('Procedimiento almacenado no devolvió resultados');
      }

      const tipoCliente = storedProcedureResult[0].TipoCliente;
      const Resultado = storedProcedureResult[0].Resultado;
      const estado = Resultado === 0 ? 5 : 1;

      this.logger.log(`✅ [CALIFICACIÓN] Tipo cliente: ${tipoCliente}, Resultado: ${Resultado}, Estado: ${estado}`);

      // Actualizar solicitud con estado final
      await this.creSolicitudWebRepository.update(idSolicitud, {
        idTipoCliente: tipoCliente || 0,
        Estado: estado,
      });

      const updatedSolicitud = await this.creSolicitudWebRepository.findOne({
        where: { idCre_SolicitudWeb: idSolicitud },
      });

      /* =====================================================
       *          FASE 6: NOTIFICACIÓN FINAL
       * ===================================================== */
      await this.guardarEstadoProceso(idSolicitud, {
        fase: 'COMPLETADO',
        progreso: 100,
        mensaje: estado === 1 ? 'Solicitud aprobada' : 'Solicitud procesada',
        datos: updatedSolicitud,
      });

      // Emitir WebSocket de completado
      this.creSolicitudwebWsGateway.wss.emit('solicitud-web-completada', {
        idSolicitud,
        numeroSolicitud: updatedSolicitud.NumeroSolicitud,
        estado: estado === 1 ? 'APROBADA' : 'RECHAZADA',
        tipoCliente,
        solicitud: updatedSolicitud,
      });

      this.logger.log(`✅✅✅ [COMPLETADO] Solicitud ${idSolicitud} procesada exitosamente`);
    } catch (error) {
      this.logger.error(
        `❌❌❌ [ERROR] Error procesando solicitud ${idSolicitud}: ${error.message}`,
        error.stack
      );

      // Actualizar solicitud a estado ERROR (6)
      await this.creSolicitudWebRepository
        .update(idSolicitud, { Estado: 6 })
        .catch((err) => {
          this.logger.error(`Error al actualizar estado a ERROR: ${err.message}`);
        });

      // Guardar estado de error
      await this.guardarEstadoProceso(idSolicitud, {
        fase: 'ERROR',
        progreso: 0,
        mensaje: 'Error al procesar la solicitud',
        error: error.message,
      }).catch((err) => {
        this.logger.error(`Error al guardar estado ERROR en Redis: ${err.message}`);
      });

      // Emitir WebSocket de error
      this.creSolicitudwebWsGateway.wss.emit('solicitud-web-error', {
        idSolicitud,
        error: error.message,
        fase: 'PROCESAMIENTO',
        stack: error.stack,
      });

      this.logger.error(`🔔 [WEBSOCKET] Evento de error emitido para solicitud ${idSolicitud}`);
    } finally {
      // Liberar lock siempre
      await this.liberarLock(cedula).catch((err) => {
        this.logger.error(`Error al liberar lock: ${err.message}`);
      });

      this.logger.log(`🔓 [LOCK] Lock liberado para cédula ${cedula}`);
    }
  }



  async procesarDatosCogno(cedula: string) {
    try {

      const token = await this.authService.getToken(cedula);
      if (!token) {
        return {
          success: false,
          mensaje: 'Error al obtener token de COGNO.',
          errorOrigen: 'AuthService',
          data: null,
        };
      }


      const apiResult = await this.authService.getApiData(token, cedula);
      if (!apiResult.success) {
        return {
          success: false,
          mensaje: `Error desde API externa: ${apiResult.mensaje}`,
          errorOrigen: 'ApiExterna',
          data: null,
        };
      }
      const apiData = apiResult.data;

      /** ────────────────────────────────
       * 💼 3. Consultar datos laborales y deuda EMOV
       * ──────────────────────────────── */
      const trabajoResult = await this.authService.getApiDataTrabajo(token, cedula);

      const deudaEmovResult = await this.authService.getApiDataDeudaEmov(token, cedula);
      const deudaData: DeudaEmovDto = deudaEmovResult.data?.deudaEmov?.[0];

      const IssfacCertMedico = await this.authService.getApiIssfacCertMedico(token, cedula);
      const IssfacCertMedicoData: AfiliacionesDto = IssfacCertMedico.data?.afiliaciones || [];

      const afiliacionIess = await this.authService.getafilicacion_iess(token, cedula);
      const afiliacionIessData: AfiliacionIessDto = afiliacionIess.data?.afiliacionIess?.[0];

      console.log('Afiliacion IESS Data:', afiliacionIess);
      const trabajos = trabajoResult.data?.trabajos || [];
      const bApiDataTrabajo = trabajos.length > 0;

      /** ────────────────────────────────
       * 💾 4. Guardar datos de COGNO
       * ──────────────────────────────── */
      const saveData = await this.authService.create(apiData, bApiDataTrabajo, 0);

      // Guardar persona natural
      await this.authService.createNatural(apiData, saveData.idCognoSolicitudCredito, 0);

      // Guardar conyugue si existe
      const conyuge = apiData.personaNaturalConyuge?.personaConyuge;
      if (conyuge?.identificacion && conyuge?.nombre) {
        await this.authService.createNaturalConyugue(apiData, saveData.idCognoSolicitudCredito, 1);
      }

      // Guardar lugar nacimiento si existe
      const lugarNacimiento = apiData.personaNatural?.lugarNacimiento;
      if (lugarNacimiento) {
        await this.authService.createLugarNacimiento(apiData, saveData.idCognoSolicitudCredito, 0);
      }

      // Si está casado, guardar domicilio conyuge
      if (apiData.estadoCivil?.estadoCivil?.descripcion === 'CASADO') {
        await this.authService.createLugarNacimiento(apiData, saveData.idCognoSolicitudCredito, 1);
      }

      // Nacionalidades y profesiones
      await this.authService.createNacionalidades(apiData, saveData.idCognoSolicitudCredito);
      await this.authService.createProfesiones(apiData, saveData.idCognoSolicitudCredito);

      // Deuda EMOV
      if (deudaData) {
        await this.authService.guardarDeudaEmovConInfracciones(deudaData, saveData.idCognoSolicitudCredito);
      }

      // Afiliaciones ISSFAC
      if (IssfacCertMedicoData) {
        await this.authService.saveCognoIssfacCertMedico(IssfacCertMedicoData, saveData.idCognoSolicitudCredito);
      }

      // Afiliacion IESS
      if (afiliacionIessData) {
        await this.authService.saveCognoAfiliacionIess(afiliacionIessData, saveData.idCognoSolicitudCredito);
      }

      // Trabajos (si existen)
      if (bApiDataTrabajo && trabajos[0]?.fechaActualizacion) {
        await this.authService.createTrabajo(trabajos, saveData.idCognoSolicitudCredito);
      }



      return {
        success: true,
        mensaje: 'Datos de COGNO procesados correctamente.',
        data: saveData,
      };
    } catch (error) {
      this.logger.error(`❌ Error al procesar datos COGNO: ${error.message}`);
      return {
        success: false,
        mensaje: 'Error al procesar datos de COGNO.',
        error: error.message,
        errorOrigen: 'Cogno',
      };
    }
  }



  private readonly preposiciones = ['DE', 'DEL', 'LA', 'LOS', 'LAS'];

  private isPrepositional(word: string): boolean {
    return this.preposiciones.includes(word.toUpperCase());
  }

  private agruparCompuesto(palabras: string[], startIndex: number): { valor: string, nextIndex: number } {
    let compuesto = palabras[startIndex];
    let i = startIndex + 1;

    while (i < palabras.length && this.isPrepositional(palabras[i])) {
      compuesto += ' ' + palabras[i];
      i++;
      if (i < palabras.length) {
        compuesto += ' ' + palabras[i];
        i++;
      }
    }

    return { valor: compuesto, nextIndex: i };
  }

  private splitNombreCompleto(nombreCompleto: string) {
    const palabras = nombreCompleto.trim().split(/\s+/);
    let i = 0;

    // Apellido Paterno
    const apellido1 = this.agruparCompuesto(palabras, i);
    const apellidoPaterno = apellido1.valor;
    i = apellido1.nextIndex;

    // Apellido Materno
    const apellido2 = this.agruparCompuesto(palabras, i);
    const apellidoMaterno = apellido2.valor;
    i = apellido2.nextIndex;

    // Resto son nombres
    const nombresRestantes = palabras.slice(i);
    const primerNombre = nombresRestantes[0] || '';
    const segundoNombre = nombresRestantes.slice(1).join(' ') || '';

    return {
      apellidoPaterno: apellidoPaterno.toUpperCase(),
      apellidoMaterno: apellidoMaterno.toUpperCase(),
      primerNombre: primerNombre.toUpperCase(),
      segundoNombre: segundoNombre.toUpperCase(),
    };
  }

  private toTitleCase(str: string) {
    return str
      .toLowerCase()
      .split(' ')
      .map(p => p.charAt(0).toUpperCase() + p.slice(1))
      .join(' ');
  }

  async getSolicitudCogno(cedula: string) {
    try {
      const token = await this.authService.getToken(cedula); // Llamada a AuthService para obtener el token

      const apiData = await this.authService.getApiDataFind(token, cedula);
      const apiJubilado = await this.authService.getApiDataJubilado(token, cedula);

      if (apiData.estado.codigo === "OK") {
        const apiLaboral = await this.authService.getApiDataTrabajo(token, cedula);
        let afiliado = false;
        let afiliadoVoluntario = false;

        if (
          apiLaboral?.success === true &&
          apiLaboral?.data?.estado?.codigo === 'OK' &&
          Array.isArray(apiLaboral.data.trabajos) &&
          apiLaboral.data.trabajos.length > 0
        ) {
          afiliado = true;

          const trabajos = apiLaboral?.data?.trabajos;

          if (Array.isArray(trabajos) && trabajos.length > 0) {
            const cargoNombre = trabajos[0].cargo?.nombre || '';

            if (cargoNombre.toUpperCase().includes('VOLUNTA')) {
              afiliado = false;
              afiliadoVoluntario = true;
            }
          }

        } else {
          afiliado = false;
        }

        const trabajoJubilado = apiJubilado.success && Array.isArray(apiJubilado.data?.trabajos) && apiJubilado.data.trabajos.length > 0 ? true : false;

        const { identificacion, nombre, fechaNacimiento } = apiData.personaNatural;
        const partesNombre = this.splitNombreCompleto(nombre);

        // Calcular la edad actual en años
        const birthDate = new Date(fechaNacimiento);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
          age--;
        }
        afiliado = trabajoJubilado ? true : afiliado;

        return {
          identificacion, nombre, fechaNacimiento, edad: age, codigo: apiData.estado.codigo, afiliado: afiliado, afiliadoVoluntario: afiliadoVoluntario,
          trabajoJubilado: trabajoJubilado, jubilado: trabajoJubilado,
          ...partesNombre
        };
      }
      return {
        codigo: false,

      }; // Devuelve falso si el estado no es "OK"
    } catch (error) {
      this.logger.error('Error al obtener la solicitud de Cogno', error);
      return { codigo: false }; // Devuelve falso en caso de error
    }
  }

  async getMotivoContinuidad(Vendedor: number) {
    // consultar solicitud web con idMotivoContinuidad = 0 i estado in [1,2] y devolver solo NumeroSolicitud-Cedula-Fecha and la fecha sea mayor a 13/08/2025 y menor al dia actual
    //console .log('Vendedor:', Vendedor);
    const fechaInicio = new Date('2025-08-17');
    // Obtener la fecha actual en la zona horaria de Ecuador (UTC-5)
    const fechaFin = new Date(
      new Date(new Date().toLocaleString("en-US", { timeZone: "America/Guayaquil" }))
        .setDate(new Date().getDate() - 1)
    );
    const queryBuilder = this.creSolicitudWebRepository
      .createQueryBuilder('cre')
      .select(['cre.NumeroSolicitud', 'cre.Cedula', 'cre.Fecha', 'cre.ApellidoMaterno',
        'cre.ApellidoPaterno', 'cre.PrimerNombre', 'cre.SegundoNombre', 'cre.idCre_SolicitudWeb'


      ])
      .where('cre.idMotivoContinuidad = :idMotivoContinuidad', { idMotivoContinuidad: 0 })
      .andWhere('cre.Estado IN (:...estados)', { estados: [1, 2] })
      .andWhere('CONVERT(date, cre.Fecha) BETWEEN :fechaInicio AND :fechaFin', { fechaInicio, fechaFin });

    if (Vendedor > 0) {
      queryBuilder.andWhere('cre.idVendedor = :Vendedor', { Vendedor });
    }

    queryBuilder.orderBy('cre.Fecha', 'DESC');

    // count de registros
    const totalCount = await queryBuilder.getCount();
    // Ejecutar la consulta para obtener los resultados
    const creSolicitudWeb = await queryBuilder.getMany();
    // Retornar los resultados con el total count
    return {
      totalCount,
      data: creSolicitudWeb,
    };
  }


  async findAllFilter(filterCreSolicitudWebDto: FilterCreSolicitudWebDto) {
    const { limit = 10, offset = 0, Filtro = '', bodega = 0 } = filterCreSolicitudWebDto;

    let queryBuilder = this.creSolicitudWebRepository.createQueryBuilder('cre_solicitud_web');

    // Filtro por bodega
    if (bodega > 0) {
      queryBuilder = queryBuilder.andWhere('cre_solicitud_web.Bodega = :bodega', { bodega });
    }

    // Filtro general por nombre o cualquier otro campo
    if (Filtro) {
      queryBuilder = queryBuilder.andWhere(
        `cre_solicitud_web.NumeroSolicitud LIKE :Filtro OR cre_solicitud_web.PrimerNombre LIKE :Filtro OR cre_solicitud_web.SegundoNombre LIKE :Filtro`,
        { Filtro: `%${Filtro}%` },
      );
    }

    // Para obtener el total count de los registros
    const totalCountQueryBuilder = this.creSolicitudWebRepository.createQueryBuilder('cre_solicitud_web');

    // Reaplicar los mismos filtros sin paginación
    if (bodega > 0) {
      totalCountQueryBuilder.andWhere('cre_solicitud_web.Bodega = :bodega', { bodega });
    }
    if (Filtro) {
      totalCountQueryBuilder.andWhere(
        `cre_solicitud_web.NumeroSolicitud LIKE :Filtro OR cre_solicitud_web.PrimerNombre LIKE :Filtro OR cre_solicitud_web.SegundoNombre LIKE :Filtro`,
        { Filtro: `%${Filtro}%` },
      );
    }

    // Ejecutar la consulta para el total count
    const totalCount = await totalCountQueryBuilder.getCount();

    // Aplicar paginación a la consulta principal
    // queryBuilder = queryBuilder.skip(offset).take(limit);
    if (limit && limit > 0) {
      queryBuilder.skip(offset).take(limit);
    }
    // Ejecutar la consulta para obtener los resultados
    try {
      const creSolicitudWeb = await queryBuilder.getMany();

      // Retornar los resultados con el total count
      return {
        totalCount,
        data: creSolicitudWeb,
      };
    } catch (error) {
      throw new Error(`Error al obtener solicitudes: ${error.message}`);
    }
  }


  async findAll(paginationDto: PaginationDto, bodega: number[]) {
    const { limit, offset = 0, fechaInicio, fechaFin, estado, vendedor = 0, analista = 0, EstadoSolicitud = 0, EstadoDocumental = 0, EstadoTelefonica = 0, cedula, nombres, numeroSolicitud, idTipoCliente = 0, idCompraEncuesta = 0, operador = 0 } = paginationDto;


    const queryBuilder = this.creSolicitudWebRepository.createQueryBuilder('cre_solicitud_web');

    // Aplicar los filtros de fechas con las horas ajustadas
    if (fechaInicio && fechaFin) {
      const fechaInicioStr = fechaInicio.toISOString().split('T')[0];
      const fechaFinStr = fechaFin.toISOString().split('T')[0];

      queryBuilder.andWhere(
        'CONVERT(date, cre_solicitud_web.Fecha) BETWEEN CONVERT(date, :fechaInicio) AND CONVERT(date, :fechaFin)',
        { fechaInicio: fechaInicioStr, fechaFin: fechaFinStr }
      );
    }

    if (estado !== undefined) {
      queryBuilder.andWhere('(cre_solicitud_web.estado = :estado OR :estado = 0)', { estado });
    }

    if (vendedor !== undefined) {
      queryBuilder.andWhere('(cre_solicitud_web.idVendedor = :vendedor OR :vendedor = 0)', { vendedor });
    }

    if (analista !== undefined) {
      queryBuilder.andWhere('(cre_solicitud_web.idAnalista = :analista OR :analista = 0)', { analista });
    }

    if (operador !== undefined) {
      queryBuilder.andWhere('(cre_solicitud_web.idOperador = :operador OR :operador = 0)', { operador });
    }


    if (EstadoSolicitud !== undefined) {
      queryBuilder.andWhere('(cre_solicitud_web.idEstadoVerificacionSolicitud = :EstadoSolicitud OR :EstadoSolicitud = 0)', { EstadoSolicitud });
    }

    if (EstadoDocumental !== undefined) {
      queryBuilder.andWhere('(cre_solicitud_web.idEstadoVerificacionDocumental = :EstadoDocumental OR :EstadoDocumental = 0)', { EstadoDocumental });
    }

    if (EstadoTelefonica !== undefined) {
      queryBuilder.andWhere('(cre_solicitud_web.idEstadoVerificacionTelefonica = :EstadoTelefonica OR :EstadoTelefonica = 0)', { EstadoTelefonica });
    }
    // Agregar el filtro para bodegas usando IN si el array de bodegasIds no está vacío
    if (bodega && bodega.length > 0) {
      queryBuilder.andWhere('cre_solicitud_web.bodega IN (:...bodega)', { bodega });
    }

    if (cedula) {
      queryBuilder.andWhere('cre_solicitud_web.Cedula LIKE :cedula', {
        cedula: `%${cedula}%`,
      });
    }

    // Filtro por número de solicitud
    if (numeroSolicitud) {
      queryBuilder.andWhere('cre_solicitud_web.NumeroSolicitud LIKE :numeroSolicitud', {
        numeroSolicitud: `%${numeroSolicitud}%`,
      });
    }

    // Filtro por nombres y apellidos (búsqueda parcial)
    if (nombres) {
      const nombreBusqueda = `${nombres}%`; // Buscar por inicio es más rápido
      queryBuilder.andWhere(
        new Brackets(qb => {
          qb.where('cre_solicitud_web.PrimerNombre LIKE :nombreBusqueda', { nombreBusqueda })
            .orWhere('cre_solicitud_web.SegundoNombre LIKE :nombreBusqueda', { nombreBusqueda })
            .orWhere('cre_solicitud_web.ApellidoPaterno LIKE :nombreBusqueda', { nombreBusqueda })
            .orWhere('cre_solicitud_web.ApellidoMaterno LIKE :nombreBusqueda', { nombreBusqueda });
        })
      );
    }
    // Filtro por idTipoCliente
    if (idTipoCliente !== undefined) {
      queryBuilder.andWhere('(cre_solicitud_web.idTipoCliente = :idTipoCliente OR :idTipoCliente = 0)', { idTipoCliente });
    }
    // Filtro por idCompraEncuesta
    if (idCompraEncuesta !== undefined) {
      queryBuilder.andWhere('(cre_solicitud_web.idCompraEncuesta = :idCompraEncuesta OR :idCompraEncuesta = 0)', { idCompraEncuesta });
    }

    // Optimización: Ejecutar data y count en paralelo
    const [data, totalCount] = await Promise.all([
      queryBuilder
        .clone()
        .orderBy('cre_solicitud_web.Fecha', 'DESC')
        .skip(offset)
        .take(limit)
        .getMany(),
      queryBuilder
        .clone()
        .select('COUNT(1)', 'cnt')
        .getRawOne()
        .then(r => parseInt(r.cnt, 10))
    ]);

    return {
      data,          // ya contiene los registros paginados
      total: totalCount, // total sin paginación
    };

  }


  async getSolicitudesWebRepositorio(anio?: number, mes?: number): Promise<any[]> {

    const anioValue = (anio != null && !isNaN(anio)) ? anio : 'NULL';
    const mesValue = (mes != null && !isNaN(mes)) ? mes : 'NULL';
    const query = `EXEC sp_GetSolicitudWebRepositorio @Anio = ${anioValue}, @Mes = ${mesValue}`;


    const result = await this.creSolicitudWebRepository.query(query);
    return result;
  }

  /* traer idFirmaDigital igual 1 por cedula */
  async findByCedulaWithFirmaDigital(cedula: string, idFirmaElectronica: number) {
    return this.creSolicitudWebRepository.findOne({ where: { Cedula: cedula, idFirmaElectronica: idFirmaElectronica, Estado: 1 } });
  }

  findOne(id: number) {
    return this.creSolicitudWebRepository.findOne({ where: { idCre_SolicitudWeb: id } });
  }

  async update(
    idCre_SolicitudWeb: number,
    updateCreSolicitudWebDto: UpdateCreSolicitudWebDto,
    usuarioEjecutor?: any,
  ) {
    const creSolicitudWeb = await this.creSolicitudWebRepository.findOne({ where: { idCre_SolicitudWeb } });
    if (!creSolicitudWeb) {
      throw new NotFoundException('Registro no encontrado');
    }

    try {

      const beforeUpdate: CreSolicitudWeb = {
        ...creSolicitudWeb,
        // No asignes valores a los métodos `upper*`
        upperApellidos: undefined, // No necesitas asignar valores a estos métodos
        upperNombres: undefined,
        upperSegundoNombre: undefined,
        uppperApellidoPaterno: undefined,
      };
      this.creSolicitudWebRepository.merge(creSolicitudWeb, updateCreSolicitudWebDto);
      const updated = await this.creSolicitudWebRepository.save(creSolicitudWeb);
      await this.notifierService.emitirCambioSolicitudWeb({
        solicitud: updated,
        cambios: updateCreSolicitudWebDto,
        usuarioEjecutor,
        original: beforeUpdate,
      });

      return updated;
    } catch (error) {
      this.handleDBException(error);
    }
  }




  async updateTelefonica(
    idCre_SolicitudWeb: number,
    idEstadoVerificacionDocumental: number,
    updateCreSolicitudWebDto: UpdateCreSolicitudWebDto,
    usuarioEjecutor?: any,
  ) {
    const creSolicitudWeb = await this.creSolicitudWebRepository.findOne({ where: { idCre_SolicitudWeb } });
    if (!creSolicitudWeb) {
      throw new NotFoundException('Registro no encontrado');
    }

    try {

      const beforeUpdate: CreSolicitudWeb = {
        ...creSolicitudWeb,
        // No asignes valores a los métodos `upper*`
        upperApellidos: undefined, // No necesitas asignar valores a estos métodos
        upperNombres: undefined,
        upperSegundoNombre: undefined,
        uppperApellidoPaterno: undefined,
      };
      creSolicitudWeb.idEstadoVerificacionDocumental = idEstadoVerificacionDocumental;
      this.creSolicitudWebRepository.merge(creSolicitudWeb, updateCreSolicitudWebDto);
      const updated = await this.creSolicitudWebRepository.save(creSolicitudWeb);

      await this.notifierService.emitirCambioSolicitudWeb({
        solicitud: updated,
        cambios: updateCreSolicitudWebDto,
        usuarioEjecutor,
        original: beforeUpdate,

      });

      return updated;
    } catch (error) {
      this.handleDBException(error);
    }
  }



  // cre_solicitud-web.service.ts
  async updateSolicitud(
    idCre_SolicitudWeb: number,
    updateCreSolicitudWebDto: UpdateCreSolicitudWebDto,
    usuarioEjecutor?: any,
  ) {
    console.log('➡️ Ejecutando updateSolicitud');

    const idUsuarioEjecutor = usuarioEjecutor?.idUsuario;
    const idGrupoEjecutor = usuarioEjecutor?.idGrupo;

    const creSolicitudWeb = await this.creSolicitudWebRepository.findOne({
      where: { idCre_SolicitudWeb },
    });

    if (!creSolicitudWeb) {
      console.log('❌ Registro no encontrado');
      throw new NotFoundException('Registro no encontrado');
    }

    try {
      // Actualizar la entidad
      // Asegúrate de que no estás asignando valores a los métodos
      const beforeUpdate: CreSolicitudWeb = {
        ...creSolicitudWeb,
        // No asignes valores a los métodos `upper*`
        upperApellidos: undefined, // No necesitas asignar valores a estos métodos
        upperNombres: undefined,
        upperSegundoNombre: undefined,
        uppperApellidoPaterno: undefined,
      };


      this.creSolicitudWebRepository.merge(creSolicitudWeb, updateCreSolicitudWebDto);
      const updated = await this.creSolicitudWebRepository.save(creSolicitudWeb);

      // ✅ Emitir evento y notificaciones desde un único punto
      await this.notifierService.emitirCambioSolicitudWeb({
        solicitud: updated,
        cambios: updateCreSolicitudWebDto,
        usuarioEjecutor,
        original: beforeUpdate,
      });

      return updated;

    } catch (error) {
      console.error('❗ Error al actualizar la solicitud:', error);
      this.handleDBException(error);
    }
  }

  async updateSolicitudCre_solicitud(
    idCre_SolicitudWeb: string,
    updateCreSolicitudWebDto: UpdateCreSolicitudWebDto,
    usuarioEjecutor?: any,
  ) {
    console.log('➡️ Ejecutando updateSolicitudCre_solicitud');
    const creSolicitudWeb = await this.creSolicitudWebRepository.findOne({
      where: { sCre_SolicitudWeb: idCre_SolicitudWeb },
    });

    if (!creSolicitudWeb) {
      console.log('❌ Registro no encontrado');
      throw new NotFoundException('Registro no encontrado');
    }

    try {
      // Actualizar la entidad
      // Asegúrate de que no estás asignando valores a los métodos
      const beforeUpdate: CreSolicitudWeb = {
        ...creSolicitudWeb,
        // No asignes valores a los métodos `upper*`
        upperApellidos: undefined, // No necesitas asignar valores a estos métodos
        upperNombres: undefined,
        upperSegundoNombre: undefined,
        uppperApellidoPaterno: undefined,
      };


      this.creSolicitudWebRepository.merge(creSolicitudWeb, updateCreSolicitudWebDto);
      const updated = await this.creSolicitudWebRepository.save(creSolicitudWeb);

      // ✅ Emitir evento y notificaciones desde un único punto
      await this.notifierService.emitirCambioSolicitudWeb({
        solicitud: updated,
        cambios: updateCreSolicitudWebDto,
        usuarioEjecutor,
        original: beforeUpdate,
      });

      return updated;

    } catch (error) {
      console.error('❗ Error al actualizar la solicitud:', error);
      this.handleDBException(error);
    }
  }


  async verificarCedulaBodega(cedula: string): Promise<{ existe: boolean, solicitud: object }> {
    // Optimización: Usar queryBuilder para select específico
    const solicitudExistente = await this.creSolicitudWebRepository
      .createQueryBuilder('csw')
      .select([
        'csw.idCre_SolicitudWeb',
        'csw.NumeroSolicitud',
        'csw.Cedula',
        'csw.PrimerNombre',
        'csw.ApellidoPaterno'
      ])
      .where('csw.Cedula = :cedula', { cedula })
      .andWhere('csw.Estado IN (:...estados)', { estados: [1, 2] })
      .getOne();

    return {
      existe: !!solicitudExistente,
      solicitud: solicitudExistente || null,
    };
  }



  async updateCodDactilar(
    idCre_SolicitudWeb: number,
    updateCreSolicitudWebDto: UpdateCreSolicitudWebDto,
    usuarioEjecutor?: any,
  ) {
    const creSolicitudWeb = await this.creSolicitudWebRepository.findOne({ where: { idCre_SolicitudWeb } });
    if (!creSolicitudWeb) {
      throw new NotFoundException('Registro no encontrado');
    }

    try {

      const beforeUpdate: CreSolicitudWeb = {
        ...creSolicitudWeb,
        // No asignes valores a los métodos `upper*`
        upperApellidos: undefined, // No necesitas asignar valores a estos métodos
        upperNombres: undefined,
        upperSegundoNombre: undefined,
        uppperApellidoPaterno: undefined,
      };

      this.creSolicitudWebRepository.merge(creSolicitudWeb, updateCreSolicitudWebDto);
      const updated = await this.creSolicitudWebRepository.save(creSolicitudWeb);

      await this.notifierService.emitirCambioSolicitudWeb({
        solicitud: updated,
        cambios: updateCreSolicitudWebDto,
        usuarioEjecutor,
        original: beforeUpdate,
      });

      return updated;
    } catch (error) {
      this.handleDBException(error);
    }
  }




  remove(id: number) {
    return `This action removes a #${id} creSolicitudWeb`;
  }

  private handleDBException(error: any) {
    if (error.code === '23505') {
      throw new BadRequestException(error.detail);
    }
    this.logger.error(error);
    throw new InternalServerErrorException('Unexpected error');

  }
  async findByCre_solicitud(
    idCre_SolicitudWeb: string,
    Estado?: number,
  ): Promise<CreSolicitudWeb> {
    const where: any = {
      sCre_SolicitudWeb: idCre_SolicitudWeb,
    };

    if (Estado !== undefined) {
      where.Estado = Estado;
    }

    const creSolicitudWeb = await this.creSolicitudWebRepository.findOne({
      where,
    });

    if (!creSolicitudWeb) {
      throw new NotFoundException('Registro no encontrado');
    }

    return creSolicitudWeb;
  }


  async updateEstado(idCre_SolicitudWeb: number): Promise<CreSolicitudWeb> {
    const creSolicitudWeb = await this.creSolicitudWebRepository.findOne({
      where: { idCre_SolicitudWeb },
    });

    if (!creSolicitudWeb) {
      throw new NotFoundException('Registro no encontrado');
    }

    try {
      creSolicitudWeb.Estado = 2;
      const updated = await this.creSolicitudWebRepository.save(creSolicitudWeb);

      console.log(`\x1b[31mSOLICITUD APROBADA SIN REG CIVIL, solicitud #${idCre_SolicitudWeb}\x1b[0m`);

      return updated;
    } catch (error) {
      this.handleDBException(error);
    }
  }
}
