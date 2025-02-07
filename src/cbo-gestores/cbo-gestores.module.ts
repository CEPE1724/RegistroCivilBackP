import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CboGestores } from './cbo-gestores.entity';
import { CboGestoresService } from './cbo-gestores.service';
import { CboGestoresController } from './cbo-gestores.controller';
import { CboGestorCobranzas } from '../Cbo_Gestor_Cobranzas/cbo-gestor-cobranzas.entity';
import { CboGestoresEstrategia } from '../Cbo_Gestores_Estrategia/Cbo_Gestores_Estrategia.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CboGestores, CboGestorCobranzas, CboGestoresEstrategia]), // Asegúrate de que los repositorios estén disponibles
  ],
  providers: [CboGestoresService],
  controllers: [CboGestoresController],
})
export class CboGestoresModule {}
