import { Module } from '@nestjs/common';
import { GeoreferenciaEntregaDomicilioService } from './georeferencia-entrega-domicilio.service';
import { GeoreferenciaEntregaDomicilioController } from './georeferencia-entrega-domicilio.controller';
import { GeoreferenciaEntregaDomicilio } from './entities/georeferencia-entrega-domicilio.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
	controllers: [GeoreferenciaEntregaDomicilioController],
	providers: [GeoreferenciaEntregaDomicilioService],
	imports: [TypeOrmModule.forFeature([GeoreferenciaEntregaDomicilio])],
	exports: [GeoreferenciaEntregaDomicilioService],
})
export class GeoreferenciaEntregaDomicilioModule { }
