import { Module } from '@nestjs/common';
import { FirDocumentosService } from './fir-documentos.service';
import { FirDocumentosController } from './fir-documentos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FirDocumento } from './entities/fir-documento.entity';
@Module({
  imports: [TypeOrmModule.forFeature([FirDocumento])],
  controllers: [FirDocumentosController],
  providers: [FirDocumentosService],
  exports: [FirDocumentosService],
})
export class FirDocumentosModule {}
