
import {
    IsNotEmpty, IsString, IsNumber, IsBoolean, IsDate, IsOptional, isNumber, Min,
    MinLength,
    IsPositive
} from 'class-validator';
import { Type } from 'class-transformer';
export class CreateCognopersonanaturalDto {

    @IsString()
    idCognoSolicitudCredito: string;

    @IsString()
    @MinLength(10)
    identificacion: string;

    @IsString()
    @MinLength(1)
    nombre: string;

    @IsString()
    nombreUno: string;

    @IsString()
    nombreDos: string;

    @IsNumber()
    @IsPositive()
    idTipoIdentificacion: number;

    @IsString()
    @MinLength(1)
    descripcion: string;

    @IsDate()
    @Type(() => Date)
    fechaNacimiento: Date;

    @IsDate()
    @Type(() => Date)
    fechaDefuncion: Date;

    @IsString()
    @MinLength(1)
    informacionAdicional: string;

    @IsNumber()
    @IsPositive()
    idGenero: number;

    @IsString()
    @MinLength(1)
    Genero: string;

    @IsString()
    lugarDefuncion: string;

    @IsString()
    @MinLength(1)
    apellidoUno: string;

    @IsString()
    @MinLength(1)
    apellidoDos: string;

    @IsNumber()
    @IsPositive()
    idEstadoCivil: number;

    @IsString()
    @MinLength(1)
    EstadoCivil: string;

    @IsDate()
    @Type(() => Date)
    fechaMatrimonio: Date;

    @IsNumber()
    @IsPositive()
    idNivelEducacion: number;

    @IsString()
    @MinLength(1)
    NivelEducacion: string;

    @IsNumber()
    @IsPositive()
    nivel: number;

    @IsNumber()
    @IsPositive()
    Tipo: number;

}
