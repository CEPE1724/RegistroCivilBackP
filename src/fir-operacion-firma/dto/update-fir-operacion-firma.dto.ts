import { PartialType } from '@nestjs/mapped-types';
import { CreateFirOperacionFirmaDto } from './create-fir-operacion-firma.dto';

export class UpdateFirOperacionFirmaDto extends PartialType(CreateFirOperacionFirmaDto) {}
