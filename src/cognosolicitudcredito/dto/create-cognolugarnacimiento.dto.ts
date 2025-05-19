import {
    IsNotEmpty,
    IsNumber,
    IsString,
    IsDate,
    IsOptional,
    IsPositive,
    MinLength,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateCognolugarnacimientoDto {



    @IsOptional()
    idCognoSolicitudCredito?: string;

    @IsNumber()
    @IsPositive()
    @IsOptional()
    idLugar?: number;

    @IsString()
    @MinLength(1)
    @IsOptional()
    codigoPostal?: string;

    @IsDate()
    @Type(() => Date)
    @IsOptional()
    fechaActualizacion?: Date;

    @IsNumber()
    @IsPositive()
    @IsOptional()
    idPais?: number;

    @IsString()
    @MinLength(1)
    @IsOptional()
    Pais?: string;

    @IsString()
    @MinLength(1)
    @IsOptional()
    codigoAreaPais?: string;

    @IsString()
    @MinLength(1)
    @IsOptional()
    codigoIso2?: string;

    @IsString()
    @MinLength(1)
    @IsOptional()
    codigoIso3?: string;

    @IsNumber()
    @IsPositive()
    @IsOptional()
    codigoIso?: number;

    @IsNumber()
    @IsPositive()
    @IsOptional()
    idProvincia?: number;

    @IsString()
    @MinLength(1)
    @IsOptional()
    Provincia?: string;

    @IsString()
    @MinLength(1)
    @IsOptional()
    codigoAreaProvincia?: string;

    @IsNumber()
    @IsPositive()
    @IsOptional()
    idCanton?: number;

    @IsString()
    @MinLength(1)
    @IsOptional()
    Canton?: string;

    @IsNumber()
    @IsPositive()
    @IsOptional()
    idParroquia?: number;

    @IsString()
    @MinLength(1)
    @IsOptional()
    Parroquia?: string;

    @IsNumber()
    @IsOptional()
    Tipo?: number;
}
