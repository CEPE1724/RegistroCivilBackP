import { Controller, Post, Body, Param } from '@nestjs/common';
import { OtpcodigoService } from './otpcodigo.service';
import { Auth } from 'src/auth/decorators';
import { BSONSymbol } from 'typeorm';

@Controller('otp')
export class OtpController {
  constructor(private readonly otpService: OtpcodigoService) {}

@Post('generate')
@Auth() 
async generateOtp(
  @Body('phoneNumber') phoneNumber: string,
  @Body('email') email: string,
  @Body('cedula') cedula: string,
  @Body('bodega') bodega: number,
  @Body('nombreCompleto') nombreCompleto: string,
) {
  try {
    const otpCode = await this.otpService.generateOtp(phoneNumber, email, nombreCompleto, cedula, bodega);
    return { success: true, otpCode }; // Opcionalmente no devuelvas el OTP en producción
  } catch (error) {
    return { success: false, message: error.message };
  }
}

  @Post('verify')
  @Auth()
  async verifyOtp(
    @Body('phoneNumber') phoneNumber: string,
    @Body('otpCode') otpCode: string,
    @Body('cedula') cedula: string,
    @Body('bodega') bodega: number,
  ) {
    const isValid = await this.otpService.verifyOtp(phoneNumber, otpCode, cedula, bodega);
    return { success: isValid };
  }
}
