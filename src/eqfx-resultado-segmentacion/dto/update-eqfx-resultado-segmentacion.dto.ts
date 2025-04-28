import { PartialType } from '@nestjs/mapped-types';
import { CreateEqfxResultadoSegmentacionDto } from './create-eqfx-resultado-segmentacion.dto';

export class UpdateEqfxResultadoSegmentacionDto extends PartialType(CreateEqfxResultadoSegmentacionDto) {}
