import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
    private transporter: nodemailer.Transporter;

    constructor(private readonly configService: ConfigService) {
        this.transporter = nodemailer.createTransport({
            host: this.configService.get<string>('MAIL_HOST'),
            port: this.configService.get<number>('MAIL_PORT'),
            secure: this.configService.get<string>('MAIL_ENCRYPTION') === 'ssl' || this.configService.get<number>('MAIL_PORT') === 465,
            auth: {
                user: this.configService.get<string>('MAIL_USERNAME'),
                pass: this.configService.get<string>('MAIL_PASSWORD'),
            },
        });
    }

  async sendOtpEmail(to: string, nombreCompleto: string, otp: string, celular: string) {
  console.log(`📨 Enviando OTP a ${to} con código ${otp} y celular ${celular}`);
  try {
    await this.transporter.sendMail({
      from: `"${this.configService.get<string>('MAIL_FROM_NAME')}" <${this.configService.get<string>('MAIL_FROM_ADDRESS')}>`,
      to,
      subject: 'Código de verificación (OTP)',
      text: `Hola ${nombreCompleto}, tu código OTP es: ${otp}\nNúmero registrado: ${celular}\n\nPOINT te informa que al dar el código ${otp}, usted acepta Política de Privacidad y autoriza la consulta crediticia.\nhttps://point.com.ec/politicas-de-privacidad`,
      html: `
<div style="font-family: Arial, sans-serif; color: #000; max-width: 600px; margin: auto; padding: 20px;">
  <div style="background-color: #2e3d7f; padding: 10px; text-align: center; color: white;">
    <h2>Código de verificación</h2>
  </div>
  <p>Hola <strong>${nombreCompleto}</strong>,</p>
  <p>Gracias por tu solicitud. Tu código de verificación (OTP) es:</p>
  <div style="text-align: center; margin: 20px 0;">
    <span style="font-size: 28px; font-weight: bold; color: #2e3d7f;">${otp}</span>
  </div>
  <p>Este código fue enviado a tu correo electrónico y al número de teléfono <strong>${celular}</strong>.</p>
  <p style="margin-top: 20px;">POINT te informa que al dar el código <strong>${otp}</strong>, usted acepta la <a href="https://point.com.ec/politicas-de-privacidad" target="_blank" style="color: #2e3d7f;">Política de Privacidad</a> y autoriza la consulta crediticia.</p>
  <p style="margin-top: 30px;">Saludos,<br/>Equipo de Almacenes Point</p>
</div>
      `,
    });
  } catch (err) {
    console.error('Error al enviar OTP:', err);
    throw new Error('No se pudo enviar el correo de OTP');
  }
}

}
