import { Module } from '@nestjs/common';
import { FirOperacionFirmaService } from './fir-operacion-firma.service';
import { FirOperacionFirmaController } from './fir-operacion-firma.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateFirOperacionFirmaDto } from './dto/create-fir-operacion-firma.dto';
import { FirOperacionFirma } from './entities/fir-operacion-firma.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FirOperacionFirma])],
  controllers: [FirOperacionFirmaController],
  providers: [FirOperacionFirmaService],
  exports: [FirOperacionFirmaService],
})
export class FirOperacionFirmaModule { }
