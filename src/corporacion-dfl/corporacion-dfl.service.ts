import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import axios from 'axios';
import FormData from 'form-data';
import { Tokensia365Service } from '../tokensia365/tokensia365.service';
import { AnalisisdeidentidadService } from 'src/analisisdeidentidad/analisisdeidentidad.service';
import { DFLAnalisisBiometrico } from '../corporacion-dfl/interfaces/corporacion-dfl-response.interfaces';


import { DflAnalisisBiometricoService } from 'src/dfl_analisis-biometrico/dfl_analisis-biometrico.service';
import { DflIndicadoresAnversoService } from 'src/dfl_indicadores-anverso/dfl_indicadores-anverso.service';
import { DflIndicadoresReversoService } from 'src/dfl_indicadores-reverso/dfl_indicadores-reverso.service';
import { DflMetadataProcesadaService } from 'src/dfl_metadata-procesada/dfl_metadata-procesada.service';
import { DflReferenciaService } from 'src/dfl_referencia/dfl_referencia.service';
import { DflResultadoService } from 'src/dfl_resultado/dfl_resultado.service';
import { DflStoregoogleService } from '../dfl_storegoogle/dfl_storegoogle.service';
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
            return tokens;
        }
        catch (error) {
            this.logger.error('❌ Error al obtener los tokens', error);
            throw new InternalServerErrorException('Error al obtener los tokens desde la base de datos.');
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

    private async crearAnalisisdeidentidad(form: { identificacion: string; callback: string; codigo_interno: string; motivo: string, cre_solicitud: number, usuario: string }, url: string, short_url: string, valido_hasta: Date): Promise<any> {
        try {
            const nuevoAnalisis = await this.analisisdeidentidadService.create({
                identificacion: form.identificacion,
                codigo: form.codigo_interno,
                url: url,
                short_url: short_url,
                valido_hasta: valido_hasta,
                Usuario: form.usuario,
                idCre_SolicitudWeb: form.cre_solicitud,
                idEstadoAnalisisDeIdentidad: 1,
            });
            return nuevoAnalisis;
        } catch (error) {
            this.logger.error('❌ Error al crear análisis de identidad en la base de datos', error);
            throw new InternalServerErrorException('Error al crear análisis de identidad en la base de datos.');
        }
    }

    private async solicitarBiometrico(
        form: { identificacion: string; callback: string; codigo_interno: string; motivo: string, cre_solicitud: number },
        token: string,
    ): Promise<any> {
        try {
            const formData = new FormData();
            formData.append('identificacion', form.identificacion);
            formData.append('callback', form.callback);
            formData.append('codigo_interno', form.codigo_interno);
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
    async create(form: {
        identificacion: string;
        callback: string;
        codigo_interno: string;
        motivo: string;
        cre_solicitud: number;
        usuario: string;
    }) {
        this.logger.log('🔄 Creando análisis de identidad...', form);
        const allAnalisisdeidentidad = await this.allAnalisisdeidentidad(form.identificacion, form.cre_solicitud);

        let tokenValido = '';
        const tokenGuardado = await this.allTokens();
        if (!tokenGuardado.TokenValido) {
            this.logger.log('🔄 Token inválido o inexistente. Obteniendo uno nuevo...');
            const nuevoToken = await this.obtenerYGuardarToken();
            tokenValido = nuevoToken.tkn_token;
        } else {
            tokenValido = tokenGuardado.Token;
        }
        this.logger.log('🔄 Verificando validez del token existente...', tokenValido);
        if (allAnalisisdeidentidad.count === 0) {

            const nuevoAnalisis = await this.solicitarBiometrico(form, tokenValido);
            await this.crearAnalisisdeidentidad(form, nuevoAnalisis.data.url, nuevoAnalisis.data.short_url, new Date(nuevoAnalisis.data.valido_hasta));
            const allAnalisisdeidentidad = await this.allAnalisisdeidentidad(form.identificacion, form.cre_solicitud);
            return allAnalisisdeidentidad;
        }
        this.logger.log('✅ Ya existe un análisis de identidad válido para esta identificación. No se crea uno nuevo.');
        return allAnalisisdeidentidad;

    }

    private async createDFLAnalisisBiometrico(data: DFLAnalisisBiometrico): Promise<any> {
        try {
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
            });
            return nuevoAnalisisBiometrico;
        } catch (error) {
            this.logger.error('❌ Error al crear análisis biométrico en la base de datos', error);
            throw new InternalServerErrorException('Error al crear análisis biométrico en la base de datos.');
        }
    }

    async handleCallback(callbackData: DFLAnalisisBiometrico) {

        // ✅ Generar nombre del archivo con timestamp
        const now = new Date();
        const timestamp = now
            .toISOString()
            .replace(/[:.]/g, '-')
            .replace('T', '_')
            .replace('Z', '');
        const folderPath = join(__dirname, '../logs/biometrico');
        const filePath = join(folderPath, `callback_${timestamp}.json`);

        // ✅ Crear carpeta si no existe
        if (!existsSync(folderPath)) {
            mkdirSync(folderPath, { recursive: true });
        }

        // ✅ Guardar contenido del callback en un archivo JSON
        writeFileSync(filePath, JSON.stringify(callbackData, null, 2), 'utf8');
        this.logger.log(`📁 Callback guardado en archivo: ${filePath}`);

        const cedula = callbackData.indicadores.anverso.identificacion;
        const solicitud = callbackData.codigo || 'SIN_CODIGO';

        const frontalUrl = await this.dflStoregoogleService.uploadBase64Image(
            callbackData.data.img_frontal,
            cedula,
            solicitud,
            'frontal',
        );

        const selfieUrl = await this.dflStoregoogleService.uploadBase64Image(
            callbackData.data.img_selfie,
            cedula,
            solicitud,
            'selfie',
        );

        const reversoUrl = await this.dflStoregoogleService.uploadBase64Image(
            callbackData.data.img_reverso,
            cedula,
            solicitud,
            'reverso',
        );

        const img_rostro_unoUrl = await this.dflStoregoogleService.uploadBase64Image(
            callbackData.data.img_rostro_uno,
            cedula,
            solicitud,
            'img_rostro_uno',
        );

        const img_rostro_dosUrl = await this.dflStoregoogleService.uploadBase64Image(
            callbackData.data.img_rostro_dos,
            cedula,
            solicitud,
            'img_rostro_dos',
        );

        callbackData.data.img_frontal = frontalUrl;
        callbackData.data.img_selfie = selfieUrl;
        callbackData.data.img_reverso = reversoUrl;
        callbackData.data.img_rostro_uno = img_rostro_unoUrl;
        callbackData.data.img_rostro_dos = img_rostro_dosUrl;

        const nuevoAnalisisBiometrico = await this.createDFLAnalisisBiometrico(callbackData);
        const idDFL_AnalisisBiometrico = nuevoAnalisisBiometrico.idDFL_AnalisisBiometrico;

        const nuevoIndicadorAnverso = await this.dflIndicadoresAnversoService.create({
            identificacion: callbackData.indicadores.anverso.identificacion,
            metadata: callbackData.indicadores.anverso.metadata,
            esFotoEspejo: callbackData.indicadores.anverso.esFotoEspejo,
            idDFL_AnalisisBiometrico: idDFL_AnalisisBiometrico,
        });

        await this.dflIndicadoresReversoService.create({
            confianza: callbackData.indicadores.reverso.confianza,
            metadata: callbackData.indicadores.reverso.metadata,
            codigoDactilar: callbackData.indicadores.reverso.codigoDactilar,
            confianza_indicadores: callbackData.indicadores.reverso.confianza_indicadores,
            codigoDactilarEncontrado: callbackData.indicadores.reverso.codigoDactilarEncontrado,
            idDFL_AnalisisBiometrico: idDFL_AnalisisBiometrico,
        });



        await this.dflMetadataProcesadaService.create({
            identificacion: callbackData.indicadores.metadata.procesada.identificacion,
            codigo_dactilar: callbackData.indicadores.metadata.procesada.codigo_dactilar,
            nacionalidad: callbackData.indicadores.metadata.procesada.nacionalidad,
            estado_civil: callbackData.indicadores.metadata.procesada.estado_civil,
            sexo: callbackData.indicadores.metadata.procesada.sexo,
            fecha_nacimiento: callbackData.indicadores.metadata.procesada.fecha_nacimiento,
            fecha_emision: callbackData.indicadores.metadata.procesada.fecha_emision,
            fecha_caducidad: callbackData.indicadores.metadata.procesada.fecha_caducidad,
            idDFL_AnalisisBiometrico: idDFL_AnalisisBiometrico,
            nombre_completo: callbackData.indicadores.metadata.procesada.nombre_completo,
            lugar_nacimiento: callbackData.indicadores.metadata.procesada.lugar_nacimiento,
        });

        await this.dflReferenciaService.create({
            identificacion: callbackData.indicadores.metadata.referencia.identificacion,
            codigo_dactilar: callbackData.indicadores.metadata.referencia.codigo_dactilar,
            fecha_nacimiento: callbackData.indicadores.metadata.referencia.fecha_nacimiento,
            fecha_mayor_edad: callbackData.indicadores.metadata.referencia.fecha_mayor_edad,
            edad_actual: callbackData.indicadores.metadata.referencia.edad_actual,
            fecha_actual: callbackData.indicadores.metadata.referencia.fecha_actual,
            idDFL_AnalisisBiometrico: idDFL_AnalisisBiometrico,
        });

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
            idDFL_AnalisisBiometrico: idDFL_AnalisisBiometrico,
        });


        this.logger.log(`✅ Nuevo indicador anverso guardado con ID: ${nuevoIndicadorAnverso.idDFL_IndicadoresAnverso}`);

        this.logger.log(`✅ Nuevo análisis biométrico guardado con ID: ${idDFL_AnalisisBiometrico}`);

        // Aquí puedes implementar la lógica para manejar el callback, como actualizar el estado en la base de datos
        // Por ejemplo, podrías buscar el análisis por su código y actualizar su estado según los datos recibidos
        return { message: 'Callback procesado correctamente' };
    }
}