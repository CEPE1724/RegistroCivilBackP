import { IsBoolean, IsDate, IsNumber, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateHorariosanalistaDto {
    @IsNumber()
    @IsOptional() // Hacer que esta propiedad sea opcional si no debe estar presente
    idAnalistaCredito?: number;

    @IsNumber()
    @IsOptional() // Hacer que esta propiedad sea opcional si no debe estar presente
    Hora?: number;

    @IsString()
    @IsOptional() // Hacer que esta propiedad sea opcional si no debe estar presente
    Dia?: string;

    @IsString()
    @IsOptional() // Hacer que esta propiedad sea opcional si no debe estar presente
    Estado?: string;

    @IsNumber()
    @IsOptional() // Hacer que esta propiedad sea opcional si no debe estar presente
    iEstado?: number;

    @IsDate()
    @IsOptional() 
    @Type(() => Date) // Convertir la fecha correctamente
    Fecha: Date;

    @IsNumber()
    @IsOptional() // Hacer que esta propiedad sea opcional si no debe estar presente
    idFechaAnalista?: number;
}
