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
  private async sendOtpMessage(phoneNumber: string, otpCode: string): Promise<{ cod_error: number, errorinfo: string }> {
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

      // Aquí devolvemos la respuesta esperada { cod_error, errorinfo }
      return {
        cod_error: response.data.cod_error, // Se asume que esta propiedad existe en la respuesta
        errorinfo: response.data.errorinfo || '', // Si errorinfo está vacío, se maneja como cadena vacía
      };
    } catch (error) {
      console.error("Error al enviar mensaje:", error);
      return { cod_error: 500, errorinfo: "Error al enviar el mensaje." }; // 500 como código de error genérico en caso de fallo
    }
  }

  // Generar un código OTP para el número de teléfono del usuario
  async generateOtp(phoneNumber: string, email: string, nombreCompleto: string): Promise<string> {
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

    const otp = this.otpRepository.create({
      phone_number: phoneNumber,
      otp_code: otpCode,
      created_at: new Date(),
      expires_at: expiresAt,
    });

    await this.otpRepository.save(otp);


    try {
      await this.emailService.sendOtpEmail(email, nombreCompleto, otpCode, phoneNumber);
    } catch (err) {
      console.error('Fallo al enviar OTP por correo:', err);
    }
    // Enviar mensaje SMS con el OTP
    await this.sendOtpMessage(phoneNumber, otpCode);

    // Verificamos el estado de la respuesta de la API


    return otpCode; // El OTP fue enviado correctamente

  }

  // Verificar si el OTP es válido para un número de teléfono
  async verifyOtp(phoneNumber: string, otpCode: string): Promise<boolean> {
    const otpRecord = await this.otpRepository.findOne({
      where: { phone_number: phoneNumber, otp_code: otpCode, is_used: false },
    });

    if (!otpRecord || otpRecord.expires_at < new Date()) {
      return false; // El OTP no es válido o ha expirado
    }

    // Marcar el OTP como verificado
    otpRecord.is_verified = true;
    otpRecord.is_used = true; // Se ha utilizado, no se puede volver a usar
    await this.otpRepository.save(otpRecord);

    return true;
  }
}
