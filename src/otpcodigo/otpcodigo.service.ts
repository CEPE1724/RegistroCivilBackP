import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan, Repository } from 'typeorm';
import { Otpcodigo } from './entities/otpcodigo.entity';
import * as crypto from 'crypto';
import axios from 'axios';
import { EmailService } from 'src/email/email.service';

@Injectable()
export class OtpcodigoService {
  constructor(
    @InjectRepository(Otpcodigo)
    private otpRepository: Repository<Otpcodigo>,
    private readonly emailService: EmailService, // ⬅️ inyectamos EmailService

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
}
