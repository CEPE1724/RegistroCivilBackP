import { IsNumber, IsOptional } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { CreateWebSolicitudgrandeDto } from './create-web_solicitudgrande.dto';

export class UpdateWebSolicitudgrandeDto extends PartialType(CreateWebSolicitudgrandeDto) {}

export class UpdateCuotaYCupoDto {
    @IsOptional()
    @IsNumber({}, { message: 'CuotaAsignada debe ser un número' })
    CuotaAsignada?: number;

    @IsOptional()
    @IsNumber({}, { message: 'Cupo debe ser un número' })
    Cupo?: number;
 }