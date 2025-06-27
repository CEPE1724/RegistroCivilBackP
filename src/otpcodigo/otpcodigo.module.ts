import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { OtpcodigoService } from './otpcodigo.service';
import { OtpController } from './otpcodigo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Otpcodigo } from './entities/otpcodigo.entity';
import { EmailModule } from 'src/email/email.module';
@Module({
  controllers: [OtpController],
  providers: [OtpcodigoService],
  imports: [TypeOrmModule.forFeature([Otpcodigo]), AuthModule ,EmailModule ],

})
export class OtpcodigoModule { }
