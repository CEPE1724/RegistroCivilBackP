import { IsNotEmpty, IsString, IsNumber, IsDate, IsOptional, IsInt, MinLength } from 'class-validator';
import { Type } from 'class-transformer';
import { UUID } from 'sequelize';

/*CREATE TABLE [dbo].[Cbo_Almacenes](
	[idCbo_Almacenes] [int] IDENTITY(1,1) NOT NULL,
	[idCbo_Scores_Cobranzas] [int] NULL,
	[Bodega] [int] NULL,
	[idCbo_Riesgos] [int] NULL,
	[Puntaje] [int] NULL,
	[sCbo_Scores_Cobranzas] [uniqueidentifier] NULL,*/
export class CreateCboAlmaceneDto {
    @IsOptional()
    @IsNumber()
    idCbo_Scores_Cobranzas?: number;

    @IsOptional()
    @IsNumber()
    Bodega?: number;

    @IsOptional()
    @IsNumber()
    idCbo_Riesgos?: number;

    @IsOptional()
    @IsNumber()
    Puntaje?: number;

    @IsOptional()
    @IsString()
    sCbo_Scores_Cobranzas?: string;
}
