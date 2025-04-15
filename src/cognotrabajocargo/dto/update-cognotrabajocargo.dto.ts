import { PartialType } from '@nestjs/mapped-types';
import { CreateCognotrabajocargoDto } from './create-cognotrabajocargo.dto';

export class UpdateCognotrabajocargoDto extends PartialType(CreateCognotrabajocargoDto) {}
