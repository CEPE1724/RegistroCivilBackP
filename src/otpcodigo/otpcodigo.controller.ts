import { Controller, Post, Body, Param } from '@nestjs/common';
import { OtpcodigoService } from './otpcodigo.service';
import { Auth } from 'src/auth/decorators';

@Controller('otp')
export class OtpController {
  constructor(private readonly otpService: OtpcodigoService) {}


  @Post('generate')
  @Auth()
  async generateOtp(@Body('phoneNumber') phoneNumber: string) {
  
    try {
      const otpCode = await this.otpService.generateOtp(phoneNumber);
      return { success: true, otpCode }; // OTP code to be sent via SMS in production
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  @Post('verify')
  @Auth()
  async verifyOtp(
    @Body('phoneNumber') phoneNumber: string,
    @Body('otpCode') otpCode: string,
  ) {
    const isValid = await this.otpService.verifyOtp(phoneNumber, otpCode);
    return { success: isValid };
  }
}
