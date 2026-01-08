
/*CREATE TABLE [dbo].[Cre_SolicitudWeb](
    [idCre_SolicitudWeb] [int] IDENTITY(1,1) NOT NULL,
    [Fecha] [datetime] NULL,
    [NumeroSolicitud] [varchar](50) NULL,
    [Bodega] [int] NULL,
    [idVendedor] [int] NULL,
    [idCompraEncuesta] [int] NULL,
    [Cedula] [varchar](20) NULL,
    [CodDactilar] [varchar](20) NULL,
    [Apellidos] [varchar](150) NULL,
    [Nombres] [varchar](150) NULL,
    [Celular] [varchar](20) NULL,
    [Email] [varchar](150) NULL,
    [idActEconomina] [int] NULL,
    [idCre_Tiempo] [int] NULL,
    [bAfiliado] [bit] NULL,
    [bTieneRuc] [bit] NULL,
    [Foto] [varchar](max) NULL,
    [bTerminosYCondiciones] [bit] NULL,
    [bPoliticas] [bit] NULL,
    [Estado] [int] NULL,
    [idProductos] [int] NULL,
    [FechaSistema] [datetime] NULL,
    [Estacion] [varchar](50) NULL,
    [Usuario] [varchar](50) NULL,*/

import {
    IsNotEmpty, IsString, IsNumber, IsBoolean, IsDate, IsOptional, isNumber, Min,
    MinLength,
    IsPositive,
    isString,
    IsUUID
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateCreSolicitudWebDto {

    @IsDate()
    @IsOptional()
    @Type(() => Date)
    Fecha: Date;

    @IsString()
    @MinLength(5)
    @IsOptional()
    NumeroSolicitud: string;

    @IsNumber()
    @IsPositive()
    Bodega: number;

    @IsNumber()
    @IsPositive()
    idVendedor: number;

     @IsNumber()
    @IsPositive()
    @IsOptional()
    idAnalista: number;

     @IsNumber()
    @IsPositive()
    @IsOptional()
    idOperador: number;


    @IsNumber()
    @IsPositive()
    idCompraEncuesta: number;

    @IsString()
    @MinLength(10)
    Cedula: string;

    @IsString()
    @MinLength(8)
    @IsOptional()
    CodDactilar: string;

    @IsString()
    @MinLength(3)
    ApellidoPaterno: string;

    @IsString()
    @IsOptional()
    ApellidoMaterno: string;

    @IsString()
    @MinLength(3)
    PrimerNombre: string;

    @IsString()
    @IsOptional()
    SegundoNombre?: string;

    @IsString()
    @MinLength(10)
    Celular: string;

    @IsString()
	@IsOptional()
    Email: string;

    @IsNumber()
    @IsPositive()
    idSituacionLaboral: number;

    @IsNumber()
    @IsPositive()
    idActEconomina: number;

    @IsNumber()
    @IsPositive()
    idCre_Tiempo: number;

    @IsBoolean()
    bAfiliado: boolean;

    @IsBoolean()
    bTieneRuc: boolean;

    @IsString()
    @MinLength(5)
    Foto: string;

    @IsBoolean()
    bTerminosYCondiciones: boolean;

    @IsBoolean()
    bPoliticas: boolean;

    @IsNumber()
    @IsOptional()
    Estado?: number;

    @IsNumber()
    @IsPositive()
    idProductos: number;

    @IsNumber()
    @IsPositive()
    idCre_TiempoVivienda: number;

    @IsNumber()
    @IsPositive()
    @IsOptional()
    idTipoCliente?: number;

    @IsString()
    //@MinLength(2)
    @IsOptional()
    otp_code: string;


    @IsNumber()
    @IsOptional()
    idEstadoVerificacionDocumental?: number;

    @IsNumber()
    @IsOptional()
    idEstadoVerificacionSolicitud?: number;

    @IsNumber()
    @IsOptional()
    idEstadoVerificacionTelefonica?: number;

    @IsNumber()
    @IsOptional()
    idEstadoVerificacionTerrena?: number;

    @IsNumber()
    @IsOptional()
    Resultado: number;

    @IsNumber()
    @IsOptional()
    Entrada: number;

    @IsNumber()
    @IsOptional()
    TerrenoDomicilio: number;

    @IsNumber()
    @IsOptional()
    TerrenoLaboral: number;

    @IsString()
    @IsOptional()
    Usuario: string;

    @IsNumber()
    @IsOptional()
    idEstadoVerificacionDomicilio:number;

    @IsString()
    @IsOptional()
    domicilioImages: string;

    @IsString()
    @IsOptional()
    trabajoImages: string;

    @IsString()
    @IsOptional()
    PDFTerrena: string;

    @IsNumber()
    @IsOptional()
    idMotivoContinuidad: number;

    @IsNumber()
    @IsOptional()
    idFirmaElectronica: number;

    @IsNumber()
    @IsOptional()
    idEstadoAnalisisDeIdentidad: number;

    /**
     * UUID único para idempotencia
     * Si el frontend no lo envía, el backend genera uno automáticamente
     */
    @IsUUID()
    @IsOptional()
    idempotencyKey?: string;

}
