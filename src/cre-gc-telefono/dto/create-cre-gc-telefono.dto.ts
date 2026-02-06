/*/*CREATE TABLE [dbo].[Cre_GCTelefono](
	[idCre_GCTelefono] [int] IDENTITY(1,1) NOT NULL,
	[idCliente] [int] NULL,
	[Telefono] [varchar](20) NULL,
	[Descripcion] [varchar](100) NULL,
	[FechaSistema] [datetime] NULL,
	[Estacion] [varchar](50) NULL,
	[Usuario] [varchar](50) NULL,*/
import { IsNotEmpty, IsString, IsNumber, IsDate, IsOptional, IsInt, MinLength } from 'class-validator';
import { Type } from 'class-transformer';
import { UUID } from 'sequelize';

export class CreateCreGcTelefonoDto {

    @IsOptional()
    @IsNumber()
    idCliente?: number;

    @IsOptional()
    @IsString()
    @MinLength(1)
    Telefono?: string;

    @IsOptional()
    @IsString()
    @MinLength(1)
    Descripcion?: string;

    @IsOptional()
    @IsDate()
    @Type(() => Date)
    FechaSistema?: Date;

    @IsOptional()
    @IsString()
    @MinLength(1)
    Estacion?: string;

    @IsOptional()
    @IsString()
    @MinLength(1)
    Usuario?: string;
}
