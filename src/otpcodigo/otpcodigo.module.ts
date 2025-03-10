import { Module } from '@nestjs/common';
import { OtpcodigoService } from './otpcodigo.service';
import { OtpController } from './otpcodigo.controller';
import  { TypeOrmModule } from '@nestjs/typeorm';
import { Otpcodigo } from './entities/otpcodigo.entity';
@Module({
  controllers: [OtpController],
  providers: [OtpcodigoService],
  imports: [TypeOrmModule.forFeature([Otpcodigo])],
})
export class OtpcodigoModule {}
