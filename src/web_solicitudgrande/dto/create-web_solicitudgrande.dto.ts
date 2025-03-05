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
export class CreateWebSolicitudgrandeDto {
 
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    readonly Cedula: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    readonly ApellidoPaterno: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    readonly ApellidoMaterno: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    readonly PrimerNombre: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    readonly SegundoNombre: string;

    @IsNumber()
    @IsPositive()
    readonly idCre_SolicitudWeb: number;

}

 
    



