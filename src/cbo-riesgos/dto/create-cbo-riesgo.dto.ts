import { IsNotEmpty, IsString, IsNumber, IsDate, IsOptional, IsInt, MinLength } from 'class-validator';
import { Type } from 'class-transformer';
import { UUID } from 'sequelize';
/*CREATE TABLE [dbo].[Cbo_Riesgos](
	[idCbo_Riesgo] [int] IDENTITY(1,1) NOT NULL,
	[idCbo_Scores_Cobranzas] [int] NULL,
	[Riesgo] [varchar](60) NULL,
	[Peso] [decimal](18, 2) NULL,
	[Desde] [decimal](18, 2) NULL,
	[Hasta] [decimal](18, 2) NULL,
	[FechaSistema] [datetime] NULL,
	[Usuario] [varchar](30) NULL,
	[sCbo_Scores_Cobranzas] [uniqueidentifier] NULL,*/
export class CreateCboRiesgoDto {
    @IsOptional()
    @IsInt()
    idCbo_Riesgo?: number;

    @IsOptional()
    @IsInt()
    idCbo_Scores_Cobranzas?: number;

    @IsNotEmpty()
    @IsString()
    @MinLength(1)
    Riesgo: string;

    @IsNotEmpty()
    @Type(() => Number)
    @IsNumber()
    Peso: number;

    @IsNotEmpty()
    @Type(() => Number)
    @IsNumber()
    Desde: number;

    @IsNotEmpty()
    @Type(() => Number)
    @IsNumber()
    Hasta: number;

    @IsOptional()
    @IsString()
    sCbo_Scores_Cobranzas?: string;
}
