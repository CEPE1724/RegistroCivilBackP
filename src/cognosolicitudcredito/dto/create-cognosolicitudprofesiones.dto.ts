
import {
    IsNotEmpty,
    IsNumber,
    IsString,
    IsDate,
    IsOptional,
    IsPositive,
    MinLength,
} from 'class-validator';
export class CreateCognosolicitudprofesionesDto {


    @IsNumber()
    @IsPositive()
    @IsOptional()
    idCognoSolicitudCredito?: number;   

    @IsNumber()
    @IsPositive()
    @IsOptional()
    idProfesion: number;    


    @IsString()
    @MinLength(1)
    @IsOptional()
    descripcion: string;
}