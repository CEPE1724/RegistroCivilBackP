import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { ExecSpService } from './exec-sp.service';
import { ExecSpController } from './exec-sp.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExecSp } from './entities/exec-sp.entity'; // Asegúrate de que la ruta sea correcta
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [ExecSpController],
  providers: [ExecSpService],
  imports: [
    TypeOrmModule.forFeature([ExecSp]), // Asegúrate de que ExecSp sea la entidad correcta
    ConfigModule, // Importa ConfigModule si lo necesitas para la configuración
    AuthModule, // Importa el módulo de autenticación si es necesario
  ],
  exports: [ExecSpService], // Exporta el servicio si lo necesitas en otros módulos
})
export class ExecSpModule {}
