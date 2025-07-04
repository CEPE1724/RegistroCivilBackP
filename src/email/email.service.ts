import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);

  constructor(private readonly configService: ConfigService) {
    // Verificar que tenemos al menos una configuración de email
    this.verifyConfiguration();
  }

  private verifyConfiguration() {
    const username = this.configService.get<string>('MAIL_USERNAME_1');
    const host = this.configService.get<string>('MAIL_HOST');
    
    if (!username || !host) {
      this.logger.error('❌ Configuración de email incompleta');
    } else {
      this.logger.log('📨 Configuración de email verificada con éxito');
    }
  }

  private getRandomEmailNumber(): number {
    return Math.floor(Math.random() * 5) + 1; // Genera número entre 1 y 5
  }

  private createTransporter(emailNumber: number): nodemailer.Transporter {
    const username = this.configService.get<string>(`MAIL_USERNAME_${emailNumber}`);
    
    return nodemailer.createTransport({
      host: this.configService.get<string>('MAIL_HOST'),
      port: this.configService.get<number>('MAIL_PORT'),
      secure: this.configService.get<string>('MAIL_ENCRYPTION') === 'ssl' || this.configService.get<number>('MAIL_PORT') === 465,
      auth: {
        user: username,
        pass: this.configService.get<string>('MAIL_PASSWORD'),
      },
      tls: {
        rejectUnauthorized: false, // Esto mejora compatibilidad con Hotmail/Outlook
      },
      connectionTimeout: 30000,
      socketTimeout: 30000,
    });
  }

  async sendOtpEmail(to: string, nombreCompleto: string, otp: string, celular: string) {
    const emailNumber = this.getRandomEmailNumber();
    const transporter = this.createTransporter(emailNumber);
    const fromEmail = this.configService.get<string>(`MAIL_USERNAME_${emailNumber}`);
    
    this.logger.log(`📧 Enviando OTP desde: comprobantes${emailNumber}@facturaspoint.net`);
    
    try {
      await transporter.sendMail({
        from: `"${this.configService.get<string>('MAIL_FROM_NAME')}" <${fromEmail}>`,
        to,
        subject: 'Código de verificación (OTP)',
        text: `Hola ${nombreCompleto}, tu código OTP es: ${otp}. Teléfono registrado: ${celular}`,
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
      this.logger.error('❌ Error al enviar OTP:', err.message);
      throw new Error('No se pudo enviar el correo de OTP');
    }
  }

  async enviarRecuperacionClave(to: string, nombreUsuario: string, claveActual: string) {
    const emailNumber = this.getRandomEmailNumber();
    const transporter = this.createTransporter(emailNumber);
    const fromEmail = this.configService.get<string>(`MAIL_USERNAME_${emailNumber}`);
    
    this.logger.log(`📧 Enviando recuperación desde: comprobantes${emailNumber}@facturaspoint.net`);
    
    try {
      await transporter.sendMail({
        from: `"${this.configService.get('MAIL_FROM_NAME')}" <${fromEmail}>`,
        to,
        subject: 'Recuperación de contraseña',
        text: `Hola ${nombreUsuario}, tu contraseña actual es: ${claveActual}. Se recomienda cambiarla luego de iniciar sesión.`,
        html: `
<div style="font-family: Arial, sans-serif; padding: 20px;">
  <h2>Recuperación de Contraseña</h2>
  <p>Hola <strong>${nombreUsuario}</strong>,</p>
  <p>Tu contraseña actual es:</p>
  <div style="font-size: 24px; font-weight: bold; color: #2e3d7f;">${claveActual}</div>
  <p>Te recomendamos cambiarla después de iniciar sesión.</p>
</div>
        `,
      });
    } catch (err) {
      this.logger.error('❌ Error al enviar correo de recuperación:', err.message);
      throw new Error('No se pudo enviar el correo de recuperación');
    }
  }
}
