import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan, Repository, DataSource  } from 'typeorm';
import { Otpcodigo } from './entities/otpcodigo.entity';
import axios from 'axios';
import { EmailService } from 'src/email/email.service';
import * as XLSX from 'xlsx';

interface RegistroExcel {
  celular: string;
  dni?: string;
  [key: string]: any;
}

const variablesPorMensaje: Record<number, string[]> = {
	36308: ['nombre'],
	36500: ['nombre', 'diasMora'],
	36701: [],
	39315: ['mes'],
	47109: ['nombre', 'dia'],	
};

const SQL_CONSULTA = `
select top 5
	cg.idCbo_GestorDeCobranzas,
	cg.idCbo_Gestores,
	cg.idCompra,
	cs.cedula as dni,
	CONCAT(cs.ApellidoPaterno, ' ', cs.PrimerNombre) as nombre,
	wg.Celular,
	cg.Dias_Mora_Actual as diasMora
from Cbo_GestorDeCobranzas cg
inner join Cre_SolicitudWeb cs 
	on cg.sCre_SolicitudWeb = cs.sCre_SolicitudWeb
inner join Web_SolicitudGrande wg 
	on wg.idCre_SolicitudWeb = cs.idCre_SolicitudWeb
where Fecha_Gestion < '20260127'
	and idCbo_Gestores = 4
`;


@Injectable()
export class OtpcodigoService {

	private readonly API_MASSEND_USER = process.env.API_MASSEND_USER;
	private readonly API_MASSEND_PASS = process.env.API_MASSEND_PASS;
	private readonly API_MASSEND_URL_MASIVO = process.env.API_MASSEND_URL_MASIVO;
	private readonly API_MASSEND_URL_UNO = process.env.API_MASSEND_URL_UNO;
	
  constructor(
    @InjectRepository(Otpcodigo)
    private otpRepository: Repository<Otpcodigo>,
    private readonly emailService: EmailService, // ⬅️ inyectamos EmailService
	private readonly dataSource: DataSource,

  ) { }

  // Función para enviar el mensaje con el OTP
  private async sendOtpMessage(phoneNumber: string, otpCode: string): Promise<{ cod_error: number, errorinfo: string, refid?: string, mensaje?: string }> {
    const postData = {
      user: "Point@massend.com",
      pass: "CompuPoint$2023",
      mensajeid: "42629",
      campana: "nombre de campana",
      telefono: phoneNumber,
      tipo: "1",
      ruta: "0",
      datos: `${otpCode}`,
    };

    try {
      const response = await axios.post('https://api.massend.com/api/sms', postData, {
        headers: { 'Content-Type': 'application/json' }
      });
      const { RefError = {}, RefEnvio = {} } = response.data || {};
      // Aquí devolvemos la respuesta esperada { cod_error, errorinfo }
      return {
        cod_error: RefError.cod_error || 500, // Se asume que esta propiedad existe en la respuesta
        errorinfo: RefError.errorinfo || '', // Si errorinfo está vacío, se maneja como cadena vacía
        refid: RefEnvio.refid || '', // Si refid está vacío, se maneja como cadena vacía
        mensaje: RefEnvio.mensaje || '' // Si mensaje está vacío, se maneja como cadena vacía
      };
    } catch (error) {
      return {
        cod_error: 500, errorinfo: "Error al enviar el mensaje.",
        refid: '', mensaje: ''
      }; // 500 como código de error genérico en caso de fallo
    }
  }

  // Generar un código OTP para el número de teléfono del usuario
  async generateOtp(phoneNumber: string, email: string, nombreCompleto: string, cedula: string, bodega: number): Promise<string> {

    // verificar si existe un otp con el mismo numero y que no este usado ni expirado y con la bodega y cedula
    const existingOtpSameCedulaBodega = await this.otpRepository.findOne({
      where: {
        phone_number: phoneNumber,
        is_verified: false, // El OTP aún no ha sido verificado
        expires_at: MoreThan(new Date()), // El OTP no ha expirado
        Cedula: cedula,
        Bodega: bodega,
      },
    });
    // si existe, retornar  el otp code
    if (existingOtpSameCedulaBodega) {
      return existingOtpSameCedulaBodega.otp_code;
    }

    // Verificar si ya hay un OTP activo (no verificado o no expirado)
    const existingOtp = await this.otpRepository.findOne({
      where: {
        phone_number: phoneNumber,
        is_used: false, // El OTP aún no ha sido usado
        expires_at: MoreThan(new Date()), // El OTP no ha expirado
      },
    });

    if (existingOtp) {
      // Si ya existe un OTP activo, lo marcamos como usado
      existingOtp.is_used = true;
      await this.otpRepository.save(existingOtp);
    }

    const otpCode = Math.floor(10000 + Math.random() * 90000).toString(); // OTP de 5 dígitos
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 5); // Expira en 5 minutos



    // if email exists, send email
    if (email) {
      try {
        await this.emailService.sendOtpEmail(email, nombreCompleto, otpCode, phoneNumber);
      } catch (err) {
        console.error('Fallo al enviar OTP por correo:', err);
      }
    }
    // Enviar mensaje SMS con el OTP
    const smsResponse = await this.sendOtpMessage(phoneNumber, otpCode);

    const otp = this.otpRepository.create({
      phone_number: phoneNumber, // asegúrate que exista como tal
      otp_code: otpCode,
      created_at: new Date(),
      expires_at: expiresAt,
      cod_error: String(smsResponse.cod_error), // convertir si la entidad espera string
      errorinfo: smsResponse.errorinfo || '',
      refid: String(smsResponse.refid || ''),
      mensaje: smsResponse.mensaje || '',
      idTipoOTP: 1, // Asignar un valor predeterminado o ajustarlo según tu lógica
      Cedula: cedula,
      Bodega: bodega,
    });

    try {
      await this.otpRepository.save(otp);
    } catch (error) {
      console.error('Error al guardar OTP:', error);
      throw new Error('Error interno al guardar el OTP');
    }
    return otpCode; // El OTP fue enviado correctamente

  }

  // Verificar si el OTP es válido para un número de teléfono
  async verifyOtp(phoneNumber: string, otpCode: string, cedula: string, bodega: number): Promise<boolean> {
    const otpRecord = await this.otpRepository.findOne({
      where: { phone_number: phoneNumber, otp_code: otpCode, is_used: false },
    });

    if (!otpRecord || otpRecord.expires_at < new Date()) {
      return false; // El OTP no es válido o ha expirado
    }

    // Marcar el OTP como verificado
    otpRecord.is_verified = true;
    otpRecord.is_used = true; // Se ha utilizado, no se puede volver a usar
    otpRecord.Cedula = cedula;
    otpRecord.Bodega = bodega;
    await this.otpRepository.save(otpRecord);

    return true;
  }

	async procesarExcelYEnviar(file: Express.Multer.File, body: any) {

		if (!file?.buffer) { throw new Error('Archivo inválido o vacío'); }

		try {
			const workbook = XLSX.read(file.buffer, { type: 'buffer' });
			const sheetName = workbook.SheetNames[0];
			const sheet = workbook.Sheets[sheetName];

			const registros = XLSX.utils.sheet_to_json<RegistroExcel>(sheet);

			const mensajeId = Number(body.mensajeid);
			const variables = variablesPorMensaje[mensajeId];

			if (!variables) {
				throw new Error(`No hay configuración de variables para mensajeid ${mensajeId}`);
			}

			if (registros.length < 1000 || registros.length > 25000) {
				throw new Error('Cantidad de registros inválida');
			}

			// eliminar teléfonos duplicados
			const telefonos = new Set();
			for (const r of registros) {
				if (telefonos.has(r.celular)) {
					throw new Error(`Teléfono duplicado: ${r.celular}`);
				}
				telefonos.add(r.celular);
			}

			const envios_json = registros.map((r, index) => {
				const datos = variables.map((key) => {
					if (r[key] === undefined || r[key] === null || r[key] === '') {
						throw new Error(
							`Fila ${index + 2}: falta la columna "${key}" requerida por el mensaje`
						);
					}
					return r[key];
				}).join(',');

				return {
					telefono: r.celular,
					dni: r.dni ?? '',
					datos,
				};
			});

			return this.enviarMassend(envios_json, body);
		} catch (error) {
			console.error('❌ Error procesando Excel:', error.message);
			throw error;
		}
	}


	async enviarMassend(envios_json, body) {

		// PRUEBA UNO A UNO
		if (process.env.MASSEND_MODE === 'uno') {

			const primerRegistro = envios_json[0];

			const payload = {
				user: this.API_MASSEND_USER,
				pass: this.API_MASSEND_PASS,
				mensajeid: Number(body.mensajeid),
				telefono: primerRegistro.telefono,
				dni: primerRegistro.dni,
				tipo: Number(body.tipo),
				ruta: Number(body.ruta),
				datos: primerRegistro.datos,
				campana: body.campana,
			};

			const { data } = await axios.post(
				this.API_MASSEND_URL_UNO,
				payload,
				{ timeout: 15000 }
			);

			if (data.RefError.cod_error !== 100) {
				throw new Error(data.RefError.errorinfo);
			}

			return {
				modo: 'PRUEBA_UNO_A_UNO',
				respuesta: data,
			};
		}

		// MASIVO
		const payload = {
			user: this.API_MASSEND_USER,
			pass: this.API_MASSEND_PASS,
			mensajeid: Number(body.mensajeid),
			campana: body.campana,
			campanaid: 123,
			tipo: Number(body.tipo),
			ruta: Number(body.ruta),
			envios_json,
		};

		const { data } = await axios.post(
			this.API_MASSEND_URL_MASIVO,
			payload,
			{ timeout: 60000 }
		);

		if (data.RefError.cod_error !== 100) {
			throw new Error(data.RefError.errorinfo);
		}

		return data;
	}


	async procesarConsulta(body: any) {

		try {
			const mensajeId = Number(body.mensajeid);
			const variables = variablesPorMensaje[mensajeId];

			if (!variables) {
				throw new Error(`No hay configuración para mensajeid ${mensajeId}`);
			}

			const registros = await this.dataSource.query(SQL_CONSULTA);

			if (!registros.length) {
				throw new Error('La consulta no retornó registros');
			}

			const envios_json = registros.map((r, index) => {
				const datos = variables.map((key) => {
					if (r[key] === undefined || r[key] === null || r[key] === '') {
						throw new Error(
							`Registro ${index + 1}: falta el campo "${key}"`
						);
					}
					return r[key];
				}).join(',');

				return {
					telefono: '0959595083',
					dni: r.dni,
					datos,
				};
			});

			return this.enviarMassendCantidad(envios_json, body);
		} catch (error) {
			console.error('❌ Error enviando desde BD:', error.message);
			throw error;
		}
	}


	async enviarMassendCantidad(envios_json: any[], body: any) {

		// UNO A UNO
		if (envios_json.length < 1000) {

			const respuestas = [];

			for (const envio of envios_json) {

				const payload = {
					user: this.API_MASSEND_USER,
					pass: this.API_MASSEND_PASS,
					mensajeid: body.mensajeid,
					telefono: String(envio.telefono),
					dni: envio.dni,
					tipo: String(body.tipo),
					ruta: String(body.ruta),
					datos: String(envio.datos),
					campana: String(body.campana),
				};

				const { data } = await axios.post(
					this.API_MASSEND_URL_UNO,
					payload,
					{
						timeout: 15000,
						headers: {
							'Content-Type': 'application/json',
						},
					}
				);

				if (data.RefError.cod_error !== 100) {
					throw new Error(data.RefError.errorinfo);
				}

				respuestas.push(data);
			}

			return {
				modo: 'UNO_A_UNO',
				total: envios_json.length,
				respuestas,
			};
		}

		// MASIVO
		const payload = {
			user: this.API_MASSEND_USER,
			pass: this.API_MASSEND_PASS,
			mensajeid: Number(body.mensajeid),
			campana: body.campana,
			campanaid: 123,
			tipo: Number(body.tipo),
			ruta: Number(body.ruta),
			envios_json,
		};

		const { data } = await axios.post(
			this.API_MASSEND_URL_MASIVO,
			payload,
			{
				timeout: 60000,
				headers: {
					'Content-Type': 'application/json',
				},
			}
		);

		if (data.RefError.cod_error !== 100) {
			throw new Error(data.RefError.errorinfo);
		}

		return {
			modo: 'MASIVO',
			total: envios_json.length,
			respuesta: data,
		};
	}
  
}
