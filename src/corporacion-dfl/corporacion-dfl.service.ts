import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import axios from 'axios';
import FormData from 'form-data';
import { Tokensia365Service } from '../tokensia365/tokensia365.service';
import { AnalisisdeidentidadService } from 'src/analisisdeidentidad/analisisdeidentidad.service';
import { DFLAnalisisBiometrico } from '../corporacion-dfl/interfaces/corporacion-dfl-response.interfaces';
import { FIRFirmaResponse } from '../corporacion-dfl/interfaces/FIROperacionFirma-dfl.interface';
import { StoreReportsPhoneVerificationService } from '../store-reports-phone-verification/store-reports-phone-verification.service';
import { FiduciaPayload } from './interfaces/fiduciapayload-interfaces';
import { DflAnalisisBiometricoService } from 'src/dfl_analisis-biometrico/dfl_analisis-biometrico.service';
import { DflIndicadoresAnversoService } from 'src/dfl_indicadores-anverso/dfl_indicadores-anverso.service';
import { DflIndicadoresReversoService } from 'src/dfl_indicadores-reverso/dfl_indicadores-reverso.service';
import { DflMetadataProcesadaService } from 'src/dfl_metadata-procesada/dfl_metadata-procesada.service';
import { CreSolicitudWebService } from 'src/cre_solicitud-web/cre_solicitud-web.service';
import { DflReferenciaService } from 'src/dfl_referencia/dfl_referencia.service';
import { DflResultadoService } from 'src/dfl_resultado/dfl_resultado.service';
import { DflStoregoogleService } from '../dfl_storegoogle/dfl_storegoogle.service';
import { WebSolicitudgrandeService } from 'src/web_solicitudgrande/web_solicitudgrande.service';
import { TiemposolicitudeswebService } from 'src/tiemposolicitudesweb/tiemposolicitudesweb.service';
import { FirOperacionFirmaService } from 'src/fir-operacion-firma/fir-operacion-firma.service';
import { FirOperacionesfirmaService } from 'src/fir-operacionesfirma/fir-operacionesfirma.service';
import { FirDocumentosService } from 'src/fir-documentos/fir-documentos.service';
import { join } from 'path';
import { existsSync, mkdirSync, writeFileSync } from 'fs';
@Injectable()
export class CorporacionDflService {
    private readonly logger = new Logger(CorporacionDflService.name);

    // Variables de entorno (configura en .env)
    private readonly URL_BIOMETRICO = process.env.URL_BIOMETRICO;
    private readonly PIN_BIOMETRICO = process.env.PIN_BIOMETRICO;
    private readonly AUTH_BIOMETRICO = process.env.AUTH_BIOMETRICO;
    private readonly AUTH_FIRMA_DFL = process.env.DFL_INSERT_OPERATION_URL;
    private readonly DFL_SEARCH_OPERATION_URL = process.env.DFL_SEARCH_OPERATION_URL;


    constructor(
        private readonly tokensia365Service: Tokensia365Service,
        private readonly analisisdeidentidadService: AnalisisdeidentidadService,
        private readonly dflAnalisisBiometricoService: DflAnalisisBiometricoService,
        private readonly dflIndicadoresAnversoService: DflIndicadoresAnversoService,
        private readonly dflIndicadoresReversoService: DflIndicadoresReversoService,
        private readonly dflMetadataProcesadaService: DflMetadataProcesadaService,
        private readonly dflReferenciaService: DflReferenciaService,
        private readonly dflResultadoService: DflResultadoService,
        private readonly dflStoregoogleService: DflStoregoogleService,
        private readonly storeReportsPhoneVerificationService: StoreReportsPhoneVerificationService,
        private readonly webSolicitudgrandeService: WebSolicitudgrandeService,
        private readonly creSolicitudWebService: CreSolicitudWebService,
        private readonly tiemposolicitudeswebService: TiemposolicitudeswebService,
        private readonly FirOperacionFirmaService: FirOperacionFirmaService,
        private readonly firOperacionesfirmaService: FirOperacionesfirmaService,
        private readonly firDocumentosService: FirDocumentosService,
    ) { }

    /**
     * Obtiene un token desde la API IA365 y lo guarda en la base de datos
     */
    private async obtenerYGuardarToken(): Promise<any> {
        try {
            // 1️⃣ Preparar los datos del formulario
            const formData = new FormData();
            formData.append('pin', this.PIN_BIOMETRICO);

            // 2️⃣ Configurar la solicitud
            const config = {
                method: 'post' as const,
                maxBodyLength: Infinity,
                url: `${this.URL_BIOMETRICO}api/v1/token`,
                headers: {
                    Authorization: this.AUTH_BIOMETRICO,
                    ...formData.getHeaders(),
                },
                data: formData,
            };

            // 3️⃣ Enviar la solicitud a IA365
            const response = await axios.request(config);
            // 4️⃣ Validar respuesta
            const { data } = response;
            if (!data?.data?.tkn_token) {
                this.logger.error('❌ No se recibió un token válido de IA365');
                throw new InternalServerErrorException('Respuesta inválida desde IA365');
            }
            const { status, data: tokenInfo } = response.data;

            const tokenData = {
                status: status,
                tkn_token: tokenInfo.tkn_token,
                tkn_fecha_vencimiento: new Date(tokenInfo.tkn_fecha_vencimiento),
                usr_id: parseInt(tokenInfo.usr_id, 10)
            };
            // 5️⃣ Guardar token en la BD usando Tokensia365Service
            const tokenGuardado = await this.tokensia365Service.create(tokenData);

            return tokenGuardado;
        } catch (error) {
            this.logger.error('❌ Error al obtener o guardar el token', error);
            throw new InternalServerErrorException('Error al consumir el servicio IA365 o guardar el token.');
        }
    }

    private async allTokens(): Promise<any> {
        try {
            const tokens = await this.tokensia365Service.findAll();
            let tokenValido = '';
            if (!tokens.TokenValido) {
                this.logger.log('🔄 Token inválido o inexistente. Obteniendo uno nuevo...');
                const nuevoToken = await this.obtenerYGuardarToken();
                tokenValido = nuevoToken.tkn_token;
            } else {
                tokenValido = tokens.Token;
            }
            return tokenValido;
        }
        catch (error) {
            this.logger.error('❌ Error al obtener los tokens', error);
            throw new InternalServerErrorException('Error al obtener los tokens desde la base de datos.');
        }
    }

    private async actualizarRegistrosCaducados(identificacion: string): Promise<any> {
        try {
            this.logger.log('🔄 Actualizando registros caducados de análisis de identidad...', identificacion);
            const actualizado = await this.analisisdeidentidadService.updateRegistrosCaducados(identificacion);
            return actualizado;
        } catch (error) {
            this.logger.error('❌ Error al actualizar registros caducados de análisis de identidad', error);
            throw new InternalServerErrorException('Error al actualizar registros caducados de análisis de identidad.');
        }
    }

    private async allAnalisisdeidentidad(identificacion: string, idEstadoAnalisisDeIdentidad: number): Promise<any> {
        try {

            const analisis = await this.analisisdeidentidadService.findAll(identificacion, idEstadoAnalisisDeIdentidad);
            return analisis;
        }
        catch (error) {
            this.logger.error('❌ Error al obtener los análisis de identidad', error);
            throw new InternalServerErrorException('Error al obtener los análisis de identidad desde la base de datos.');
        }
    }
    // await this.insertarTiempoSolicitudWeb(form, 2,1, 2, nuevoAnalisis.data.url);
    private async insertarTiempoSolicitudWeb(
        form: { identificacion: string; callback: string; motivo: string; usuario: string; cre_solicitud?: string },
        idEstadoVerificacionDocumental: number, Tipo: number, URLBiometrico: string) {
        try {
            const solicitudWeb = await this.findSolicitudWebCreSolicitud(form.cre_solicitud, 1);
            const nuevoTiempo = await this.tiemposolicitudeswebService.create({
                idCre_SolicitudWeb: solicitudWeb ? solicitudWeb.idCre_SolicitudWeb : 0,
                idEstadoVerificacionDocumental: idEstadoVerificacionDocumental,
                Tipo: Tipo,
                Telefono: URLBiometrico,
                sCre_SolicitudWeb: form.cre_solicitud,
                Usuario: form.usuario,
            });
            return nuevoTiempo;
        } catch (error) {
            this.logger.error('❌ Error al insertar tiempo en tiemposolicitudesweb', error);
            throw new InternalServerErrorException('Error al insertar tiempo en tiemposolicitudesweb.');
        }
    }

    private async findSolicitudWebCreSolicitud(cre_solicitud: string, Estado?: number): Promise<any> {
        try {
            const solicitud = await this.creSolicitudWebService.findByCre_solicitud(cre_solicitud, Estado);
            return solicitud;
        } catch (error) {
            this.logger.error('❌ Error al buscar cre_solicitud en cre_solicitud_web', error);
            throw new InternalServerErrorException('Error al buscar cre_solicitud en cre_solicitud_web.');
        }
    }




    private async updateSolicitudWebCreSolicitud(cre_solicitud: string, idFirmaElectronica: number, usuario: string): Promise<any> {
        try {
            const actualizado = await this.creSolicitudWebService.updateSolicitudCre_solicitud(
                cre_solicitud,
                { idFirmaElectronica: idFirmaElectronica },
                usuario
            );
            return actualizado;
        } catch (error) {
            this.logger.error('❌ Error al actualizar cre_solicitud en cre_solicitud_web', error);
            throw new InternalServerErrorException('Error al actualizar cre_solicitud en cre_solicitud_web.');
        }
    }

    private async crearAnalisisdeidentidad(form: { identificacion: string; callback: string; motivo: string, usuario: string }, codigo_interno: string, codigo: string, url: string, short_url: string, valido_hasta: Date): Promise<any> {
        try {
            const nuevoAnalisis = await this.analisisdeidentidadService.create({
                identificacion: form.identificacion,
                codigo: codigo,
                url: url,
                short_url: short_url,
                valido_hasta: valido_hasta,
                Usuario: form.usuario,
                codigo_interno: codigo_interno,
                idEstadoAnalisisDeIdentidad: 1,
            });
            return nuevoAnalisis;
        } catch (error) {
            this.logger.error('❌ Error al crear análisis de identidad en la base de datos', error);
            throw new InternalServerErrorException('Error al crear análisis de identidad en la base de datos.');
        }
    }

    private async actualizarCreSolicitud(idAnalisisDeIdentidad: string, cre_solicitud: string): Promise<any> {
        try {
            const actualizado = await this.analisisdeidentidadService.updateCresolicitud(idAnalisisDeIdentidad, cre_solicitud);
            return actualizado;
        } catch (error) {
            this.logger.error('❌ Error al actualizar cre_solicitud en análisis de identidad', error);
            throw new InternalServerErrorException('Error al actualizar cre_solicitud en análisis de identidad.');
        }
    }

    private async solicitarBiometrico(
        form: { identificacion: string; callback: string; motivo: string },
        token: string,
        codigo_interno?: string,
    ): Promise<any> {
        try {
            const formData = new FormData();
            formData.append('identificacion', form.identificacion);
            formData.append('callback', form.callback);
            formData.append('codigo_interno', codigo_interno || '');
            formData.append('motivo', form.motivo);

            const config = {
                method: 'post' as const,
                maxBodyLength: Infinity,
                url: `${this.URL_BIOMETRICO}api/v3/solicitud/biometrico`,
                headers: {
                    Authorization: `Bearer ${token}`,
                    ...formData.getHeaders(),
                },
                data: formData,
            };
            this.logger.log(`🚀 Enviando solicitud biométrica a IA365 con datos: ${JSON.stringify(form)}`);
            const response = await axios.request(config);
            this.logger.log(`✅ Respuesta de IA365: ${JSON.stringify(response.data)}`);

            return response.data;
        } catch (error) {
            this.logger.error('❌ Error al enviar solicitud biométrica', error);
            throw new InternalServerErrorException('Error al comunicarse con IA365 biométrico.');
        }
    }

    /**
     * Método auxiliar opcional para probar la creación manual (si lo necesitas)
     */

    private async generateUniqueCode(cedula: string): Promise<string> {

        const baseName = 'CREDIP';

        const safeCedula = cedula?.toString().trim() || 'SINCED';

        const timestamp = Date.now();

        return `${baseName}_${safeCedula}_${timestamp}`;
    }

    async create(form: {
        identificacion: string;
        callback: string;
        motivo: string;
        usuario: string;
        cre_solicitud?: string;
    }) {
        this.logger.log('🔄 Creando análisis de identidad...', form);
        const codigo_interno = await this.generateUniqueCode(form.identificacion);
        await this.actualizarRegistrosCaducados(form.identificacion);
        const allAnalisisdeidentidad = await this.allAnalisisdeidentidad(form.identificacion, 1);
        console.log('🔍 Análisis de identidad existente:', allAnalisisdeidentidad);
        const tokenValido = await this.allTokens();

        this.logger.log('🔄 Verificando validez del token existente...', tokenValido);
        if (allAnalisisdeidentidad.count === 0) {
            /* actualizar cre_solicitud en analisisdeidentidad si existe uno previo */
            const nuevoAnalisis = await this.solicitarBiometrico(form, tokenValido);
            this.logger.log('✅ Solicitud biométrica enviada. Respuesta:', nuevoAnalisis);
            await this.crearAnalisisdeidentidad(form, codigo_interno, nuevoAnalisis.data.codigo, nuevoAnalisis.data.url, nuevoAnalisis.data.short_url, new Date(nuevoAnalisis.data.valido_hasta));
            const allAnalisisdeidentidad = await this.allAnalisisdeidentidad(form.identificacion, 1);
            await this.updateSolicitudWebCreSolicitud(form.cre_solicitud, 2, form.usuario);
            //await this.actualizarCreSolicitud(allAnalisisdeidentidad.url, form.cre_solicitud);
            await this.insertarTiempoSolicitudWeb(form, 2, 11, allAnalisisdeidentidad.short_url);
            console.log('✅ Nuevo análisis de identidad creado:', allAnalisisdeidentidad);
            return allAnalisisdeidentidad;
        }

        // await this.insertarTiempoSolicitudWeb(form, 2, 11, allAnalisisdeidentidad.short_url);
        this.logger.log('✅ Ya existe un análisis de identidad válido para esta identificación. No se crea uno nuevo.');
        return allAnalisisdeidentidad;

    }

    private obtenerErrorDFL(data: DFLAnalisisBiometrico): string {
        return (
            data?.messages?.error ??
            data?.error?.toString() ??
            ''
        );
    }

    private async createDFLAnalisisBiometrico(data: DFLAnalisisBiometrico): Promise<any> {
        try {
            this.logger.log('🔄 Creando análisis biométrico...', data);
            const nuevoAnalisisBiometrico = await this.dflAnalisisBiometricoService.create({
                status: data.status,
                tipo: data.tipo,
                codigo: data.codigo,
                rostroSimilitud: data.data.rostroSimilitud,
                rostroSimilitudFrontal: data.data.rostroSimilitudFrontal,
                rostroSimilitudSelfie: data.data.rostroSimilitudSelfie,
                img_frontal: data.data.img_frontal,
                img_reverso: data.data.img_reverso,
                img_selfie: data.data.img_selfie,
                bio_intento_frontal: data.data.bio_intento_frontal,
                bio_intento_reverso: data.data.bio_intento_reverso,
                bio_intento_selfie: data.data.bio_intento_selfie,
                bio_intento_dactilar: data.data.bio_intento_dactilar,
                img_rostro_uno: data.data.img_rostro_uno,
                img_rostro_dos: data.data.img_rostro_dos,
                bio_fuente: data.data.bio_fuente,
                ip_registrada: data.data.ip_registrada,
                error: this.obtenerErrorDFL(data),
            });
            return nuevoAnalisisBiometrico;
        } catch (error) {
            this.logger.error('❌ Error al crear análisis biométrico en la base de datos', error);
            throw new InternalServerErrorException('Error al crear análisis biométrico en la base de datos.');
        }
    }

    public async saveErrorLog(tipo: string, data: any, error: any): Promise<void> {
        try {
            const now = new Date();
            const timestamp = now.toISOString().replace(/[:.]/g, '-').replace('T', '_').replace('Z', '');
            const numerorandom = Math.floor(Math.random() * 10000);
            const folderPath = join(__dirname, '../../logs/biometrico');
            const filePath = join(folderPath, `error_${tipo}_${timestamp}_${numerorandom}.log`);

            if (!existsSync(folderPath)) mkdirSync(folderPath, { recursive: true });

            const content = {
                tipo,
                error: error?.message || error,
                stack: error?.stack,
                data,
            };

            writeFileSync(filePath, JSON.stringify(content, null, 2), 'utf8');
            this.logger.log(`📁 Log de error guardado en archivo: ${filePath}`);
        } catch (fsErr) {
            this.logger.error(`❌ No se pudo guardar el log de error: ${fsErr.message}`);
        }
    }


    public async uploadSafe(base64: string, cedula: string, solicitud: string, tipo: string, callbackData: any): Promise<string> {
        try {
            return await this.dflStoregoogleService.uploadBase64Image(base64, cedula, solicitud, tipo);
        } catch (err) {
            this.logger.error(`⚠️ Error subiendo imagen ${tipo}: ${err.message}`);
            await this.saveErrorLog(`upload_${tipo}`, callbackData, err);
            return 'ERROR_SUBIDA';
        }
    }


    public async handleCallback(callbackData: DFLAnalisisBiometrico) {
        const now = new Date();
        const timestamp = now.toISOString().replace(/[:.]/g, '-').replace('T', '_').replace('Z', '');
        const numerorandom = Math.floor(Math.random() * 10000);
        const folderPath = join(__dirname, '../../logs/biometrico');

        try {
            if (!existsSync(folderPath)) mkdirSync(folderPath, { recursive: true });

            const filePath = join(folderPath, `callback_${timestamp}_${numerorandom}.json`);
            writeFileSync(filePath, JSON.stringify(callbackData, null, 2), 'utf8');
            this.logger.log(`📁 Callback guardado en archivo: ${filePath}`);

            const cedula = callbackData.indicadores.anverso.identificacion || 'DESCONOCIDA';
            const solicitud = callbackData.codigo || 'SIN_CODIGO';
            this.logger.log(`🔄 data callback: ${JSON.stringify(callbackData, null, 2)}`);
            // 📤 Subida de imágenes usando el método reutilizable
            callbackData.data.img_frontal = callbackData.data.img_frontal ? await this.uploadSafe(callbackData.data.img_frontal, cedula, solicitud, 'frontal', callbackData) : 'N/A';
            callbackData.data.img_selfie = callbackData.data.img_selfie ? await this.uploadSafe(callbackData.data.img_selfie, cedula, solicitud, 'selfie', callbackData) : 'N/A';
            callbackData.data.img_reverso = callbackData.data.img_reverso ? await this.uploadSafe(callbackData.data.img_reverso, cedula, solicitud, 'reverso', callbackData) : 'N/A';
            callbackData.data.img_rostro_uno = callbackData.data.img_rostro_uno ? await this.uploadSafe(callbackData.data.img_rostro_uno, cedula, solicitud, 'rostro_uno', callbackData) : 'N/A';
            callbackData.data.img_rostro_dos = callbackData.data.img_rostro_dos ? await this.uploadSafe(callbackData.data.img_rostro_dos, cedula, solicitud, 'rostro_dos', callbackData) : 'N/A';

            // 🧾 Guardado en base de datos (tu código actual aquí)
            const nuevoAnalisisBiometrico = await this.createDFLAnalisisBiometrico(callbackData);
            const idDFL_AnalisisBiometrico = nuevoAnalisisBiometrico.idDFL_AnalisisBiometrico;

            // 👉 Indicadores Anverso
            await this.dflIndicadoresAnversoService.create({
                identificacion: callbackData.indicadores.anverso.identificacion,
                metadata: callbackData.indicadores.anverso.metadata,
                esFotoEspejo: callbackData.indicadores.anverso.esFotoEspejo,
                idDFL_AnalisisBiometrico,
            });

            // 👉 Indicadores Reverso
            await this.dflIndicadoresReversoService.create({
                confianza: callbackData.indicadores.reverso.confianza,
                metadata: callbackData.indicadores.reverso.metadata,
                codigoDactilar: callbackData.indicadores.reverso.codigoDactilar,
                confianza_indicadores: callbackData.indicadores.reverso.confianza_indicadores,
                codigoDactilarEncontrado: callbackData.indicadores.reverso.codigoDactilarEncontrado,
                idDFL_AnalisisBiometrico,
            });

            // 👉 Metadata Procesada

            const fechaCad = callbackData?.indicadores?.metadata?.procesada?.fecha_caducidad;
            await this.dflMetadataProcesadaService.create({
                identificacion: callbackData.indicadores.metadata.procesada.identificacion,
                codigo_dactilar: callbackData.indicadores.metadata.procesada.codigo_dactilar,
                nacionalidad: callbackData.indicadores.metadata.procesada.nacionalidad,
                estado_civil: callbackData.indicadores.metadata.procesada.estado_civil,
                sexo: callbackData.indicadores.metadata.procesada.sexo,
                fecha_nacimiento: callbackData.indicadores.metadata.procesada.fecha_nacimiento,
                fecha_emision: callbackData.indicadores.metadata.procesada.fecha_emision,
                fecha_caducidad: fechaCad ? fechaCad : new Date('2000-01-01'),
                nombre_completo: callbackData.indicadores.metadata.procesada.nombre_completo,
                lugar_nacimiento: callbackData.indicadores.metadata.procesada.lugar_nacimiento,
                idDFL_AnalisisBiometrico,
            });

            // 👉 Referencia

            await this.dflReferenciaService.create({
                identificacion: callbackData.indicadores.metadata.referencia.identificacion,
                codigo_dactilar: callbackData.indicadores.metadata.referencia.codigo_dactilar,
                fecha_nacimiento: callbackData.indicadores.metadata.referencia.fecha_nacimiento,
                fecha_mayor_edad: callbackData.indicadores.metadata.referencia.fecha_mayor_edad,
                edad_actual: callbackData.indicadores.metadata.referencia.edad_actual,
                fecha_actual: callbackData.indicadores.metadata.referencia.fecha_actual,
                idDFL_AnalisisBiometrico,
            });

            // 👉 Resultado
            await this.dflResultadoService.create({
                ok_selfie_fuente: callbackData.indicadores.metadata.resultado.ok_selfie_fuente,
                es_selfie_valida: callbackData.indicadores.metadata.resultado.es_selfie_valida,
                ok_frontal_fuente: callbackData.indicadores.metadata.resultado.ok_frontal_fuente,
                existe_fuente: callbackData.indicadores.metadata.resultado.existe_fuente,
                cliente_en_lista_blanca: callbackData.indicadores.metadata.resultado.cliente_en_lista_blanca,
                codigo_dactilar_detectado: callbackData.indicadores.metadata.resultado.codigo_dactilar_detectado,
                es_cedula_mayor_edad: callbackData.indicadores.metadata.resultado.es_cedula_mayor_edad,
                es_cedula_vigente: callbackData.indicadores.metadata.resultado.es_cedula_vigente,
                es_horario_valido: callbackData.indicadores.metadata.resultado.es_horario_valido,
                fecha_nacimiento_detectada: callbackData.indicadores.metadata.resultado.fecha_nacimiento_detectada,
                identificacion_detectada: callbackData.indicadores.metadata.resultado.identificacion_detectada,
                selfie_intentos_moderado: callbackData.indicadores.metadata.resultado.selfie_intentos_moderado,
                texto_resumen: callbackData.indicadores.metadata.resultado.texto_resumen,
                idDFL_AnalisisBiometrico,
            });

            // actualizar AnalisisDeIdentidad estado
            let estadoStatues = callbackData.status === 200 ? 3 : 4; // 3 = Completado, 4 = Error
            let mensajeError = callbackData.status === 200 ? 'Análisis completado correctamente' : `Error en análisis: ${callbackData.messages.error || 'Error desconocido'}`;
            await this.analisisdeidentidadService.updateEstadoPorCodigo(callbackData.codigo, estadoStatues, mensajeError);
            const analisisExistente = await this.findAnalisisBycodigo(callbackData.codigo);

            if (analisisExistente && analisisExistente.idAnalisisDeIdentidad) {
                // await this.actualizarCreSolicitud(analisisExistente.idAnalisisDeIdentidad, solicitud);

                const estados = [2, 4];

                for (const estado of estados) {
                    const creSolicitud = await this.findByCedulaWithFirmaDigital(
                        analisisExistente.identificacion,
                        estado,
                    );

                    console.log(`🔍 cre_solicitud estado ${estado}:`, creSolicitud);

                    await this.procesarSolicitud(
                        creSolicitud,
                        estadoStatues,
                        cedula,
                        mensajeError
                    );
                }

            }

            return { message: 'Callback procesado correctamente' };
        } catch (error) {
            await this.saveErrorLog('callback_general', callbackData, error);
            this.logger.error(`❌ Error procesando callback: ${error.message}`);
            return { message: 'Callback recibido, pero ocurrió un error interno (registrado en logs)' };
        }
    }

    private async procesarSolicitud(
        creSolicitud: any,
        estadoStatues: number,
        cedula: string,
        mensajeError: string,
    ) {
        if (!creSolicitud?.sCre_SolicitudWeb) return;

        const solicitudWeb = creSolicitud.sCre_SolicitudWeb;

        await this.updateSolicitudWebCreSolicitud(
            solicitudWeb,
            estadoStatues,
            'system_callback',
        );

        await this.insertarTiempoSolicitudWeb(
            {
                identificacion: cedula,
                callback: '',
                motivo: 'Callback DFL',
                usuario: 'system_callback',
                cre_solicitud: solicitudWeb,
            },
            estadoStatues,
            11,
            mensajeError
        );
    }

    async findByCedulaWithFirmaDigital(cedula: string, idFirmaElectronica: number): Promise<any> {
        try {
            const analisisConFirma = await this.creSolicitudWebService.findByCedulaWithFirmaDigital(cedula, idFirmaElectronica);
            return analisisConFirma;
        }
        catch (error) {
            this.logger.error('❌ Error al obtener los análisis de identidad con firma digital', error);
            throw new InternalServerErrorException('Error al obtener los análisis de identidad con firma digital desde la base de datos.');
        }
    }

    async findAnalisisBycodigo(codigo: string): Promise<any> {
        try {
            const analisis = await this.analisisdeidentidadService.findAnalisisBycodigo(codigo);
            return analisis;
        }
        catch (error) {
            this.logger.error('❌ Error al obtener el análisis de identidad por código', error);
            throw new InternalServerErrorException('Error al obtener el análisis de identidad por código desde la base de datos.');
        }
    }

    async crearFirmaDigital(sSolicitud: string, identidad: string): Promise<any> {
        try {
            /* buscar iscre_solicitud_web */
            const sCre_SolicitudWeb = await this.findSolicitudWebCreSolicitud(sSolicitud);
            if (!sCre_SolicitudWeb) {
                this.logger.error(`❌ No se encontró la solicitud web para cre_solicitud: ${sSolicitud}`);
                throw new InternalServerErrorException('No se encontró la solicitud web asociada.');
            }
            const idSolicitud = sCre_SolicitudWeb.idCre_SolicitudWeb;
            // Lógica para crear la firma digital
            const tokenGuardado = await this.allTokens();
            const codigo_interno = await this.allAnalisisdeidentidad(identidad, 3);
            this.logger.log(`🔄 Generando PDFs en base64 para la solicitud ID: ${idSolicitud}`);
            this.logger.log(`Código interno para la solicitud: ${JSON.stringify(codigo_interno)}`);
            const base64_pdf1 = await this.storeReportsPhoneVerificationService.getDflFirmaDigitalReport(idSolicitud);
            const base64_gastoCobranza = await this.storeReportsPhoneVerificationService.getGastosCobranzasBase64Report(idSolicitud);
            const base64_consentTratDatos = await this.storeReportsPhoneVerificationService.getConsentimientoTratDatosBase64(idSolicitud);
            const base64_pagareOrden = await this.storeReportsPhoneVerificationService.getPagareALaOrdenBase64(idSolicitud);
            const base64_entregaDocCred = await this.storeReportsPhoneVerificationService.getActaEntregaDocsBase64(idSolicitud);
            const base64_compromisoLugPag = await this.storeReportsPhoneVerificationService.getCompromisoLugPagoBase64(idSolicitud);
            const base64_declarComprom = await this.storeReportsPhoneVerificationService.getDeclaracionCompromisosBase64(idSolicitud);
            const base64_contratComprVent = await this.storeReportsPhoneVerificationService.getcompraVentaResDominioBase64(idSolicitud);
            const base64_tabAmortizacion = await this.storeReportsPhoneVerificationService.getTablaAmortizacionBase64(idSolicitud);
            const webSolicitud = await this.webSolicitudgrandeService.findOneId(idSolicitud);
            this.logger.log(`✅ PDF generado en base64 para la solicitud ID: ${idSolicitud}`);
            this.logger.log(`Base64 PDF 1: ${codigo_interno}`);
            this.logger.log(`Código interno obtenido: ${JSON.stringify(codigo_interno)}`);
            const insertarOperacionFiduciaPayload = {
                code_client: '123ABC',
                code_bio: codigo_interno.codigo,
                type_process: 'VARIOS',
                data_fiducia: {
                    CodigoNegocio: '3',
                    TipoOperacion: 'E',
                    NumeroOperacion: codigo_interno.codigo_interno,
                    FechaEmision: '2025-10-02 15:51:38.987000',
                    FechaVencimiento: '2026-10-02 00:00:00',
                    FechaFirma: '2025-10-02 15:51:38.987000',
                    Plazo: '12',
                    Tasa: '15.60',
                    Monto: '589.88',
                    Cuota: '53.41',
                    DistribucionGeografica: 'GUAYAS',
                    Acreedor: {
                        CodigoTipoIdentificacion: '2',
                        NumeroIdentificacion: '09999999999999',
                        RazonSocial: 'POINT.',
                    },
                    Deudor: {
                        CodigoTipoPersona: '1',
                        CodigoTipoIdentificacion: '1',
                        NumeroIdentificacion: identidad,
                        CodigoNacionalidad: '593',
                        Nacionalidad: 'ECUATORIANA',
                        RazonSocial: 'XXXXXX',
                        PrimerNombre: webSolicitud.PrimerNombre,
                        SegundoNombre: webSolicitud.SegundoNombre || '',
                        PrimerApellido: webSolicitud.ApellidoPaterno,
                        SegundoApellido: webSolicitud.ApellidoMaterno || '',
                        Correo: 'ecepeda@credisolucion.com.ec',
                        Celular: `+593${webSolicitud.Celular.slice(1)}`,
                        Telefono: '04/2111111',
                        Direccion: webSolicitud.ReferenciaUbicacion || 'N/A',
                        CallePrincipal: webSolicitud.CallePrincipal || 'SANTA LUCIA',
                        Numeracion: webSolicitud.NumeroCasa || 'SN',
                        CalleSecundaria: webSolicitud.CalleSecundaria || 'BARRANQUILLA',
                        ReferenciaDireccion: webSolicitud.ReferenciaUbicacion || 'None',
                        CodigoPaisDireccion: '593',
                        CodigoProvinciaDireccion: '217',
                        CodigoCiudadDireccion: '21701',
                        CodigoParroquiaDireccion: '2170103',
                    },
                },

                signatories: [
                    {
                        dni: identidad,
                        name: webSolicitud.PrimerNombre,
                        first_last_name: webSolicitud.ApellidoPaterno,
                        second_last_name: webSolicitud.ApellidoMaterno,
                        email: webSolicitud.Email || '',
                        phone: `+593${webSolicitud.Celular.slice(1)}`,
                        address: webSolicitud.CallePrincipal,
                        city: webSolicitud.CalleSecundaria,
                    },
                ],
                documents: [
                    {
                        code: "SEGUNDO_PAGARE",
                        name: "Segundo P",
                        base64: base64_pdf1
                    },
                    {
                        code: "CONVENIO_ADHESION",
                        name: "Convenio",
                        base64: base64_gastoCobranza
                    },
                    {
                        code: "LIQUIDACION",
                        name: "Liquidacion",
                        base64: base64_consentTratDatos
                    },
                    {
                        code: "ANALISIS_DOMICILIARIO",
                        name: "Analisis Dom",
                        base64: base64_pagareOrden
                    }
                    // {
                    //     code: "ANEXO4",
                    //     name: "Anexo",
                    //     base64: base64_entregaDocCred
                    // },					
                    // {
                    // 	code: "COMPROMISO_LUGAR_PAGO",
                    //     name: "",
                    //     base64: base64_compromisoLugPag
                    // },{
                    // 	code: "DECLARACION_COMPROMISO",
                    //     name: "",
                    //     base64: base64_declarComprom
                    // },{
                    // 	code: "COMPRA_VENTA",
                    //     name: "",
                    //     base64: base64_contratComprVent
                    // },{
                    // 	code: "TABLA_AMORTIZACION",
                    //     name: "",
                    //     base64: base64_tabAmortizacion
                    // }
                ]
            };

            /* creacion de archivo log con la respuesta enviada*/
            const now = new Date();
            const timestamp = now.toISOString().replace(/[:.]/g, '-').replace('T', '_').replace('Z', '');
            const numerorandom = Math.floor(Math.random() * 10000);
            const folderPath = join(__dirname, '../../logs/biometrico');
            const filePath = join(folderPath, `insertarOperacionFiducia_Payload_${timestamp}_${numerorandom}.json`);
            if (!existsSync(folderPath)) mkdirSync(folderPath, { recursive: true });
            writeFileSync(filePath, JSON.stringify(insertarOperacionFiduciaPayload, null, 2), 'utf8');
            this.logger.log(`📁 Payload de insertarOperacionFiducia guardado en archivo: ${filePath}`);
            this.logger.log(`🚀 Payload para insertarOperacionFiducia: ${JSON.stringify(insertarOperacionFiduciaPayload.code_bio)}`);

          
            const respuesta = await this.insertarOperacionFiducia(insertarOperacionFiduciaPayload, tokenGuardado, this.AUTH_FIRMA_DFL);
            console.log('Respuesta de insertarOperacionFiducia:', respuesta);
            if (respuesta.status === 200) {
                const resultadoFiducia = await this.findOperacionfiduciaByCodeBio(respuesta.hash, tokenGuardado, this.DFL_SEARCH_OPERATION_URL);
                this.logger.log(`✅ Operación de fiducia insertada correctamente: ${JSON.stringify(resultadoFiducia)}`);
                if (resultadoFiducia.status === 200) {
                    this.logger.log(`✅ Operación de fiducia verificada correctamente: ${JSON.stringify(resultadoFiducia)}`);
                    await this.guardarOperacionFirma(resultadoFiducia);
                }
                
                // await this.updateSolicitudWebCreSolicitud(sSolicitud, 3, 'system_firma_digital');
            }
            this.logger.log(`✅ Firma digital creada: ${JSON.stringify(respuesta)}`);
            return respuesta;
        } catch (error) {
            this.logger.error(`❌ Error creando firma digital para la solicitud ID: ${sSolicitud}`, error);
            throw new InternalServerErrorException('Error al crear la firma digital.');
        }
    }

    async guardarOperacionFirma(
        response: FIRFirmaResponse,
    ): Promise<any> {
        try {
            this.logger.log('🔄 Guardando operación de FIR Firma...', response);

            const operacion = response.data;

            const nuevaOperacion = await this.FirOperacionFirmaService.create({
                hash_operation: operacion.hash_operation,
                code_client: operacion.code_client,
                code_bio: operacion.code_bio,
                link: operacion.link,

                time_signature_validity: operacion.time_signature_validity
                    ? new Date(operacion.time_signature_validity)
                    : null,

                state: operacion.state,
                task: operacion.task,

                state_fiducia: operacion.state_fiducia,
                message_fiducia: operacion.message_fiducia,

                status: response.status,
                message: response.message,
            });
            this.logger.log('✅ Nueva operación de FIR Firma creada en la base de datos:', nuevaOperacion.idFIR_OperacionFirma);
            const idFIR_OperacionFirma = nuevaOperacion.idFIR_OperacionFirma;
            this.logger.log('✅ Operación de FIR Firma creada con ID:', 0);
            const firmantes = response.data?.signatories ?? [];
            this.logger.log('🔍 Firmantes recibidos:', firmantes);
            for (const firmante of firmantes) {
                await this.firOperacionesfirmaService.create({
                    idFIR_OperacionFirma: idFIR_OperacionFirma,
                    dni: firmante.dni,
                    name: firmante.name,
                    first_last_name: firmante.first_last_name,
                    second_last_name: firmante.second_last_name || null,
                    email: firmante.email || null,
                    sign_state: firmante.sign_state || null,
                    signed_at: firmante.signed_at
                        ? new Date(firmante.signed_at)
                        : null,
                });
            }

            const documentos = response.data?.documents ?? [];
            this.logger.log('🔍 Documentos recibidos:', documentos);
            for (const documento of documentos) {
                await this.firDocumentosService.create({
                    idFIR_OperacionFirma: idFIR_OperacionFirma,
                    code: documento.code,
                    name: documento.name,
                    path: documento.path,
                    state_sign: documento.state_sign,
                });
            }

            this.logger.log('✅ Operación de FIR Firma guardada correctamente.');
            return { message: 'Operación de FIR Firma guardada correctamente.' };

        } catch (error) {
            this.logger.error(
                '❌ Error al guardar la operación de FIR Firma en la base de datos',
                error,
            );
            throw new InternalServerErrorException(
                'Error al guardar la operación de FIR Firma en la base de datos.',
            );
        }
    }

    private async insertarOperacionFiducia(
        payload: FiduciaPayload,
        token: string,
        url_signed: string,
    ): Promise<any> {
        try {
            const config = {
                method: 'post' as const,
                maxBodyLength: Infinity,
                url: `${url_signed}`,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                data: JSON.stringify(payload),
            };
            this.logger.log(`🚀 Enviando solicitud insertarOperacionFiducia a DFL con payload: ${JSON.stringify(url_signed)}`);
            const response = await axios.request(config);
            this.logger.log(`✅ Respuesta de insertarOperacionFiducia: ${JSON.stringify(response.data)}`);
            return response.data;
        } catch (error) {
            //this.logger.error('❌ Error en insertarOperacionFiducia', error);
            return {
                status: 400,
                message: 'Error al insertar operación de fiducia.',
                hash: '8017212f-2023-4198-9bc4-85ba2ccddeb3',
            };
        }
    }

    /*post
        /*{
        "hash_operation" : "8017212f-2023-4198-9bc4-85ba2ccddeb3"
    }*/
    private async findOperacionfiduciaByCodeBio(
        hash_operation: string,
        token: string,
        url_signed: string,
    ): Promise<any> {
        try {
            const config = {
                method: 'post' as const,
                maxBodyLength: Infinity,
                url: `${url_signed}`,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                data: JSON.stringify({ hash_operation }),
            };
            this.logger.log(`🚀 Consultando operación de fiducia en DFL con hash_operation: ${hash_operation}`)
            const response = await axios.request(config);
            this.logger.log(`✅ Respuesta de findOperacionfiduciaByCodeBio: ${JSON.stringify(response.data)}`);
            return response.data;
        } catch (error) {
            this.logger.error('❌ Error en findOperacionfiduciaByCodeBio', error);
            throw new InternalServerErrorException('Error al consultar operación de fiducia en DFL.');
        }
    }
}
