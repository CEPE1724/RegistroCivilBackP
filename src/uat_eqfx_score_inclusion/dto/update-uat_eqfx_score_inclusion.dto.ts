import { PartialType } from '@nestjs/mapped-types';
import { CreateUatEqfxScoreInclusionDto } from './create-uat_eqfx_score_inclusion.dto';

export class UpdateUatEqfxScoreInclusionDto extends PartialType(CreateUatEqfxScoreInclusionDto) {}
