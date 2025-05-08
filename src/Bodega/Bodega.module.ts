import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bodega } from './bodega.entity';
import { BodegaService } from './bodega.service';
import { BodegaController } from './bodega.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Bodega]), AuthModule],
  providers: [BodegaService],
    exports: [BodegaService],
    controllers: [BodegaController],
})
export class BodegaModule {}


