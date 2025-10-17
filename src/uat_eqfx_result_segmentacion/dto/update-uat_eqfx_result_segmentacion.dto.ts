import { PartialType } from '@nestjs/mapped-types';
import { CreateUatEqfxResultSegmentacionDto } from './create-uat_eqfx_result_segmentacion.dto';

export class UpdateUatEqfxResultSegmentacionDto extends PartialType(CreateUatEqfxResultSegmentacionDto) {}
