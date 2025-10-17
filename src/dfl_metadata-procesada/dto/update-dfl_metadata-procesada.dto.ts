import { PartialType } from '@nestjs/mapped-types';
import { CreateDflMetadataProcesadaDto } from './create-dfl_metadata-procesada.dto';

export class UpdateDflMetadataProcesadaDto extends PartialType(CreateDflMetadataProcesadaDto) {}
