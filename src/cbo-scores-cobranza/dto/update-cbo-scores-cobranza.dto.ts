import { PartialType } from '@nestjs/mapped-types';
import { CreateCboScoresCobranzaDto } from './create-cbo-scores-cobranza.dto';

export class UpdateCboScoresCobranzaDto extends PartialType(CreateCboScoresCobranzaDto) {}
