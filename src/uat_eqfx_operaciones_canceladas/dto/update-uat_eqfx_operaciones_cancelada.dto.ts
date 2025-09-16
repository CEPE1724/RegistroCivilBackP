import { PartialType } from '@nestjs/mapped-types';
import { CreateUatEqfxOperacionesCanceladaDto } from './create-uat_eqfx_operaciones_cancelada.dto';

export class UpdateUatEqfxOperacionesCanceladaDto extends PartialType(CreateUatEqfxOperacionesCanceladaDto) {}
