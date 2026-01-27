import { IsNotEmpty, IsString, IsNumber, IsDate, IsOptional, IsInt, MinLength } from 'class-validator';
import { Type } from 'class-transformer';
import { UUID } from 'sequelize';
/*CREATE TABLE [dbo].[Cbo_Segmentos](
	[idCbo_Segmento] [int] IDENTITY(1,1) NOT NULL,
	[idCbo_Scores_Cobranzas] [int] NULL,
	[Segmento] [varchar](60) NULL,
	[Participacion] [decimal](18, 2) NULL,
	[FechaSistema] [datetime] NULL,
	[Usuario] [varchar](30) NULL,
	[sCbo_Scores_Cobranzas] [uniqueidentifier] NULL,
PRIMARY KEY CLUSTERED */
export class CreateCboSegmentoDto {

    @IsOptional()
    @IsInt()
    idCbo_Segmento?: number;

    @IsOptional()
    @IsInt()
    idCbo_Scores_Cobranzas?: number;

    @IsNotEmpty()
    @IsString()
    @MinLength(1)
    Segmento: string;

    @IsNotEmpty()
    @Type(() => Number)
    @IsNumber()
    Participacion: number;

    @IsOptional()
    @IsString()
    sCbo_Scores_Cobranzas?: string;
}
