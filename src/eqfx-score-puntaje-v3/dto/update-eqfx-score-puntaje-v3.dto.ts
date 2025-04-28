import { PartialType } from '@nestjs/mapped-types';
import { CreateEqfxScorePuntajeV3Dto } from './create-eqfx-score-puntaje-v3.dto';

export class UpdateEqfxScorePuntajeV3Dto extends PartialType(CreateEqfxScorePuntajeV3Dto) {}
