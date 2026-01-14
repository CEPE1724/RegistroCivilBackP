import { PartialType } from '@nestjs/mapped-types';
import { CreateFirDocumentoDto } from './create-fir-documento.dto';

export class UpdateFirDocumentoDto extends PartialType(CreateFirDocumentoDto) {}
