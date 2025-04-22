import { PartialType } from '@nestjs/mapped-types';
import { CreateVerificadorcreditoDto } from './create-verificadorcredito.dto';

export class UpdateVerificadorcreditoDto extends PartialType(CreateVerificadorcreditoDto) {}
