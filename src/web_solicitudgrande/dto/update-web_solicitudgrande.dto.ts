import { PartialType } from '@nestjs/mapped-types';
import { CreateWebSolicitudgrandeDto } from './create-web_solicitudgrande.dto';

export class UpdateWebSolicitudgrandeDto extends PartialType(CreateWebSolicitudgrandeDto) {}
