import { IsInt, IsOptional, IsString, IsDate } from 'class-validator';

export class CreateHistorialObservacionesDto {
    @IsOptional()
    @IsInt()
    idCre_SolicitudWeb?: number;

    @IsOptional()
    @IsInt()
    idDocumentosSolicitudWeb?: number;

    @IsOptional()
    @IsInt()
    idUsuario?: number;

    @IsOptional()
    @IsString()
    Observacion?: string;

    @IsOptional()
    @IsDate()
    Fecha?: Date;

    @IsOptional()
    @IsString()
    TipoUsuario?: string;

    @IsOptional()
    @IsDate()
    FechaSistema?: Date;

    @IsOptional()
    @IsString()
    Estacion?: string;

    @IsOptional()
    @IsString()
    Usuario?: string;
}
