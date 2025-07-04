import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { NominaService } from './nomina.service';
import { NominaController } from './nomina.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Nomina } from './entities/nomina.entity';
@Module({
  controllers: [NominaController],
  providers: [NominaService],
  imports: [TypeOrmModule.forFeature([Nomina]),
   AuthModule],
  exports: [NominaService],  // Exportar el servicio, no el módulo
    
})
export class NominaModule {}
