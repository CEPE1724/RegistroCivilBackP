import { Module } from '@nestjs/common';
import { EqfxResultadoPoliticasService } from './eqfx-resultado-politicas.service';
import { EqfxResultadoPoliticasController } from './eqfx-resultado-politicas.controller';
import { EqfxResultadoPolitica } from './entities/eqfx-resultado-politica.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
@Module({
  controllers: [EqfxResultadoPoliticasController],
  providers: [EqfxResultadoPoliticasService],
  imports: [TypeOrmModule.forFeature([EqfxResultadoPolitica]), AuthModule],
  exports: [EqfxResultadoPoliticasService]
})
export class EqfxResultadoPoliticasModule {}
