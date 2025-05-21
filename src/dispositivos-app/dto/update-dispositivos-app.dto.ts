import { PartialType } from '@nestjs/mapped-types';
import { CreateDispositivosAppDto } from './create-dispositivos-app.dto';

export class UpdateDispositivosAppDto extends PartialType(CreateDispositivosAppDto) {}
