import { PartialType } from '@nestjs/mapped-types';
import { CreateEqfxPerfilRiesgoDirecDto } from './create-eqfx-perfil-riesgo-direc.dto';

export class UpdateEqfxPerfilRiesgoDirecDto extends PartialType(CreateEqfxPerfilRiesgoDirecDto) {}
