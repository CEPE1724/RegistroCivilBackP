import { PartialType } from '@nestjs/mapped-types';
import { CreateOtpcodigoDto } from './create-otpcodigo.dto';

export class UpdateOtpcodigoDto extends PartialType(CreateOtpcodigoDto) {}
