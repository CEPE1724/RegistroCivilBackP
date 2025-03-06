import { PartialType } from '@nestjs/mapped-types';
import { CreateCognosolicitudcreditoDto } from './create-cognosolicitudcredito.dto';

export class UpdateCognosolicitudcreditoDto extends PartialType(CreateCognosolicitudcreditoDto) {}
