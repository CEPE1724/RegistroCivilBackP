

import { IsDate, IsInt, IsNumber, IsOptional, IsString} from 'class-validator';

export class CreateCreReferenciasclienteswebDto {


    @IsInt()
    idCre_SolicitudWeb: number;


    @IsInt()
    idParentesco: number;


    @IsString()
    ApellidoPaterno: string;

    @IsString()
    PrimerNombre: string;

    @IsOptional()
    @IsString()
    SegundoNombre: string;


    @IsInt()
    idProvincia: number;

    @IsInt()
    idCanton: number;


    @IsString()
    Celular: string;


    @IsString()
    Usuario: string;

    @IsOptional()
    @IsDate()
    FechaSistema: Date;

}
