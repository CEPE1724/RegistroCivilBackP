/*CREATE TABLE [dbo].[Cbo_Score_Resultado](
	[idCbo_Score_Resultado] [int] IDENTITY(1,1) NOT NULL,
	[idCbo_Scores_Cobranzas] [int] NULL,
	[Desde] [int] NULL,
	[Hasta] [int] NULL,
	[Peso] [decimal](18, 2) NULL,
	[Resultado] [decimal](18, 2) NULL,
	[idCbo_Riesgo] [int] NULL,
	[sCbo_Scores_Cobranzas] [uniqueidentifier] NULL,*/
  import { IsNotEmpty, IsString, IsNumber, IsDate, IsOptional, IsInt, MinLength } from 'class-validator';
import { Type } from 'class-transformer';
import { UUID } from 'sequelize';
export class CreateCboScoreResultadoDto {
    @IsOptional()
    @IsInt()
    idCbo_Score_Resultado?: number;

    @IsOptional()
    @IsInt()
    idCbo_Scores_Cobranzas?: number;

    @IsOptional()
    @IsInt()
    Desde?: number;

    @IsOptional()
    @IsInt()
    Hasta?: number;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    Peso?: number;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    Resultado?: number;

    @IsOptional()
    @IsInt()
    idCbo_Riesgo?: number;

    @IsOptional()
    @IsString()
    sCbo_Scores_Cobranzas?: string;
}
