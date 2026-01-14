import { PartialType } from '@nestjs/mapped-types';
import { CreateFirOperacionesfirmaDto } from './create-fir-operacionesfirma.dto';

export class UpdateFirOperacionesfirmaDto extends PartialType(CreateFirOperacionesfirmaDto) {}
