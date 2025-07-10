import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { ListaNegraEmailService } from './lista-negra-email.service';
import { ListaNegraEmailController } from './lista-negra-email.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ListaNegraEmail } from './entities/lista-negra-email.entity';

@Module({
  controllers: [ListaNegraEmailController],
  providers: [ListaNegraEmailService],
  imports: [TypeOrmModule.forFeature([ListaNegraEmail]), AuthModule],
  exports: [ListaNegraEmailService],
})
export class ListaNegraEmailModule {}
