import { PartialType } from '@nestjs/mapped-types';
import { CreateUatEqfxScoreDto } from './create-uat_eqfx_score.dto';

export class UpdateUatEqfxScoreDto extends PartialType(CreateUatEqfxScoreDto) {}
