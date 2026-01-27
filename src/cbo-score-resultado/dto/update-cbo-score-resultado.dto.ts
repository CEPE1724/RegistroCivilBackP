import { PartialType } from '@nestjs/mapped-types';
import { CreateCboScoreResultadoDto } from './create-cbo-score-resultado.dto';

export class UpdateCboScoreResultadoDto extends PartialType(CreateCboScoreResultadoDto) {}
