
import { IsNotEmpty, IsString, IsNumber, IsDate, IsOptional, IsInt, MinLength } from 'class-validator';


export class CreateCboRiesgoDto {

        @IsOptional()
        @IsInt()
        idCbo_Riesgo?: number;
    
        @IsOptional()
        @IsString()
        Riesgo?: string;
    }

