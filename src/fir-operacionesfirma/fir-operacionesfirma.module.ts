import { Module } from '@nestjs/common';
import { FirOperacionesfirmaService } from './fir-operacionesfirma.service';
import { FirOperacionesfirmaController } from './fir-operacionesfirma.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FirOperacionesfirma } from 'src/fir-operacionesfirma/entities/fir-operacionesfirma.entity';
import { FirOperacionFirma } from 'src/fir-operacion-firma/entities/fir-operacion-firma.entity';
@Module({
  imports: [TypeOrmModule.forFeature([FirOperacionesfirma, FirOperacionFirma])],
  controllers: [FirOperacionesfirmaController],
  providers: [FirOperacionesfirmaService],
  exports: [FirOperacionesfirmaService],
})
export class FirOperacionesfirmaModule {}
