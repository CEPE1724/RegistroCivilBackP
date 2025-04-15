import { IsInt, IsOptional, IsString, IsDate, IsNumber } from 'class-validator';

export class CreateHistorialObservacionesDto {
    @IsOptional()
    @IsInt()
    idCre_SolicitudWeb?: number;

    @IsOptional()
    @IsInt()
    idDocumentosSolicitudWeb?: number;

    @IsInt()
    idUsuario?: number;

    @IsOptional()
    @IsString()
    Observacion?: string;

    @IsOptional()
    @IsDate()
    Fecha?: Date;

    @IsOptional()
    @IsNumber()
    TipoUsuario?: number;

    @IsOptional()
    @IsDate()
    FechaSistema?: Date;

    @IsOptional()
    @IsString()
    Estacion?: string;

    @IsString()
    Usuario?: string;

    @IsNumber()
    idTipoDocumentoWEB?: number;
}
