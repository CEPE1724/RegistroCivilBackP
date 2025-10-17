
import { IsString, IsNotEmpty, IsDate, IsOptional, IsNumber } from 'class-validator';

export class CreateDflIndicadoresAnversoDto {
    @IsString()
    @IsNotEmpty()
    idDFL_AnalisisBiometrico: string;

    @IsString()
    @IsOptional()
    identificacion: string;

    @IsString()
    @IsOptional()
    metadata: string;

    @IsString()
    @IsOptional()
    esFotoEspejo: string;
}
