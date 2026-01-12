import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import axios from 'axios';
import FormData from 'form-data';
import { Tokensia365Service } from '../tokensia365/tokensia365.service';
import { AnalisisdeidentidadService } from 'src/analisisdeidentidad/analisisdeidentidad.service';
import { DFLAnalisisBiometrico } from '../corporacion-dfl/interfaces/corporacion-dfl-response.interfaces';
import { StoreReportsPhoneVerificationService } from '../store-reports-phone-verification/store-reports-phone-verification.service';
import { FiduciaPayload } from './interfaces/fiduciapayload-interfaces';
import { DflAnalisisBiometricoService } from 'src/dfl_analisis-biometrico/dfl_analisis-biometrico.service';
import { DflIndicadoresAnversoService } from 'src/dfl_indicadores-anverso/dfl_indicadores-anverso.service';
import { DflIndicadoresReversoService } from 'src/dfl_indicadores-reverso/dfl_indicadores-reverso.service';
import { DflMetadataProcesadaService } from 'src/dfl_metadata-procesada/dfl_metadata-procesada.service';
import { DflReferenciaService } from 'src/dfl_referencia/dfl_referencia.service';
import { DflResultadoService } from 'src/dfl_resultado/dfl_resultado.service';
import { DflStoregoogleService } from '../dfl_storegoogle/dfl_storegoogle.service';
import { WebSolicitudgrandeService } from 'src/web_solicitudgrande/web_solicitudgrande.service';
import { join } from 'path';
import { existsSync, mkdirSync, writeFileSync } from 'fs';
@Injectable()
export class CorporacionDflService {
    private readonly logger = new Logger(CorporacionDflService.name);

    // Variables de entorno (configura en .env)
    private readonly URL_BIOMETRICO = process.env.URL_BIOMETRICO;
    private readonly PIN_BIOMETRICO = process.env.PIN_BIOMETRICO;
    private readonly AUTH_BIOMETRICO = process.env.AUTH_BIOMETRICO;


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

    private async allAnalisisdeidentidad(identificacion: string, cre_solicitud: number): Promise<any> {
        try {

            const analisis = await this.analisisdeidentidadService.findAll(identificacion, cre_solicitud);
            return analisis;
        }
        catch (error) {
            this.logger.error('❌ Error al obtener los análisis de identidad', error);
            throw new InternalServerErrorException('Error al obtener los análisis de identidad desde la base de datos.');
        }
    }

    private async crearAnalisisdeidentidad(form: { identificacion: string; callback: string; motivo: string, cre_solicitud: number, usuario: string }, codigo_interno: string, codigo: string, url: string, short_url: string, valido_hasta: Date): Promise<any> {
        try {
            const nuevoAnalisis = await this.analisisdeidentidadService.create({
                identificacion: form.identificacion,
                codigo: codigo,
                url: url,
                short_url: short_url,
                valido_hasta: valido_hasta,
                Usuario: form.usuario,
                idCre_SolicitudWeb: form.cre_solicitud,
                codigo_interno: codigo_interno,
                idEstadoAnalisisDeIdentidad: 1,
            });
            return nuevoAnalisis;
        } catch (error) {
            this.logger.error('❌ Error al crear análisis de identidad en la base de datos', error);
            throw new InternalServerErrorException('Error al crear análisis de identidad en la base de datos.');
        }
    }

    private async actualizarCreSolicitud(idAnalisisDeIdentidad: string, cre_solicitud: number): Promise<any> {
        try {
            const actualizado = await this.analisisdeidentidadService.updateCresolicitud(idAnalisisDeIdentidad, cre_solicitud);
            return actualizado;
        } catch (error) {
            this.logger.error('❌ Error al actualizar cre_solicitud en análisis de identidad', error);
            throw new InternalServerErrorException('Error al actualizar cre_solicitud en análisis de identidad.');
        }
    }

    private async solicitarBiometrico(
        form: { identificacion: string; callback: string; motivo: string, cre_solicitud: number },
        token: string,
        codigo_interno?: string,
    ): Promise<any> {
        try {
            const formData = new FormData();
            formData.append('identificacion', form.identificacion);
            formData.append('callback', form.callback);
            formData.append('codigo_interno', codigo_interno || '');
            formData.append('motivo', form.motivo);
            formData.append('cre_solicitud', form.cre_solicitud.toString());

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
        cre_solicitud: number;
        usuario: string;
    }) {
        this.logger.log('🔄 Creando análisis de identidad...', form);
        const codigo_interno = await this.generateUniqueCode(form.identificacion);
        await this.actualizarRegistrosCaducados(form.identificacion);
        const allAnalisisdeidentidad = await this.allAnalisisdeidentidad(form.identificacion, form.cre_solicitud);
        const tokenValido = await this.allTokens();

        this.logger.log('🔄 Verificando validez del token existente...', tokenValido);
        if (allAnalisisdeidentidad.count === 0) {
            /* actualizar cre_solicitud en analisisdeidentidad si existe uno previo */

            const nuevoAnalisis = await this.solicitarBiometrico(form, tokenValido);
            this.logger.log('✅ Solicitud biométrica enviada. Respuesta:', nuevoAnalisis);
            await this.crearAnalisisdeidentidad(form, codigo_interno, nuevoAnalisis.data.codigo, nuevoAnalisis.data.url, nuevoAnalisis.data.short_url, new Date(nuevoAnalisis.data.valido_hasta));
            const allAnalisisdeidentidad = await this.allAnalisisdeidentidad(form.identificacion, form.cre_solicitud);
            console.log('✅ Nuevo análisis de identidad creado:', allAnalisisdeidentidad);
            return allAnalisisdeidentidad;
        }
        await this.actualizarCreSolicitud(form.identificacion, form.cre_solicitud);
        this.logger.log('✅ Ya existe un análisis de identidad válido para esta identificación. No se crea uno nuevo.');
        return allAnalisisdeidentidad;

    }

    private async createDFLAnalisisBiometrico(data: DFLAnalisisBiometrico): Promise<any> {
        try {
            this.logger.log('🔄 Creando análisis biométrico...', data.error);
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
                error: data.error || '',
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
            let estadoStatues = callbackData.status === 200 ? 3 : 4; // 2 = Completado, 3 = Error
            let mensajeError = callbackData.status === 200 ? 'Análisis completado correctamente' : `Error en análisis: ${callbackData.error}`;
            await this.analisisdeidentidadService.updateEstadoPorCodigo(callbackData.codigo, estadoStatues, mensajeError);
            return { message: 'Callback procesado correctamente' };
        } catch (error) {
            await this.saveErrorLog('callback_general', callbackData, error);
            this.logger.error(`❌ Error procesando callback: ${error.message}`);
            return { message: 'Callback recibido, pero ocurrió un error interno (registrado en logs)' };
        }
    }

    async crearFirmaDigital(idSolicitud: number, identidad: string): Promise<any> {
        try {
            // Lógica para crear la firma digital
            const tokenGuardado = await this.allTokens();
            const codigo_interno = await this.allAnalisisdeidentidad(identidad, 38952);
            const base64_pdf1 = await this.storeReportsPhoneVerificationService.getDflFirmaDigitalReport(35757);
            const webSolicitud = await this.webSolicitudgrandeService.findOneId(38952);
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
                        email: 'ecepeda@credisolucion.com.ec',
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
                        base64: base64_pdf1
                    },
                    {
                        code: "LIQUIDACION",
                        name: "Liquidacion",
                        base64: base64_pdf1
                    },
                    {
                        code: "ANALISIS_DOMICILIARIO",
                        name: "Analisis Dom",
                        base64: base64_pdf1
                    },
                    {
                        code: "ANEXO4",
                        name: "Anexo",
                        base64: base64_pdf1
                    }
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

            const url_signed = 'https://apipoint.corporaciondfl.com/api/operation/insert'; // Reemplaza con la URL correcta

            const respuesta = await this.insertarOperacionFiducia(insertarOperacionFiduciaPayload, tokenGuardado, url_signed);
            this.logger.log(`✅ Firma digital creada: ${JSON.stringify(respuesta)}`);
            return respuesta;
        } catch (error) {
            this.logger.error(`❌ Error creando firma digital para la solicitud ID: ${idSolicitud}`, error);
            throw new InternalServerErrorException('Error al crear la firma digital.');
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
            this.logger.error('❌ Error en insertarOperacionFiducia', error);
            throw new InternalServerErrorException('Error al insertar operación de fiducia.');
        }
    }
}