import { Module } from '@nestjs/common';
import { EqfxPerfilRiesgoDirecService } from './eqfx-perfil-riesgo-direc.service';
import { EqfxPerfilRiesgoDirecController } from './eqfx-perfil-riesgo-direc.controller';
import { EqfxPerfilRiesgoDirec } from './entities/eqfx-perfil-riesgo-direc.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [EqfxPerfilRiesgoDirecController],
  providers: [EqfxPerfilRiesgoDirecService],
  imports: [TypeOrmModule.forFeature([EqfxPerfilRiesgoDirec])],
  exports: [EqfxPerfilRiesgoDirecService],
})
export class EqfxPerfilRiesgoDirecModule {}
