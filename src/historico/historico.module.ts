import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HistoricoService } from './historico.service';
import { Historico } from './historico.entity';
import { HistoricoController } from './historico.controller'; // Asegúrate de importar tu controlador
import { AuthModule } from 'src/auth/auth.module';
import { HttpModule } from '@nestjs/axios';  // Importa el HttpModule

@Module({
  imports: [TypeOrmModule.forFeature([Historico]), AuthModule, HttpModule],
  providers: [HistoricoService],
  controllers: [HistoricoController],
  exports: [HistoricoService],
})
export class HistoricoModule {}
