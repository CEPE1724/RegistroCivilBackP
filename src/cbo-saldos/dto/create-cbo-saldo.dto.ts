
/*CREATE TABLE [dbo].[Cbo_Saldos](
	[idCbo_Saldo] [int] IDENTITY(1,1) NOT NULL,
	[idCbo_Scores_Cobranzas] [int] NULL,
	[Desde] [decimal](18, 2) NULL,
	[Hasta] [decimal](18, 2) NULL,
	[idCbo_Riesgo] [int] NULL,
	[Puntaje] [int] NULL,
	[sCbo_Scores_Cobranzas] [uniqueidentifier] NULL,
 CONSTRAINT [PK__Cbo_Sald__A78C867E95F0DF25] PRIMARY KEY CLUSTERED */
  import { IsNotEmpty, IsString, IsNumber, IsDate, IsOptional, IsInt, MinLength } from 'class-validator';
import { Type } from 'class-transformer';
import { UUID } from 'sequelize';

export class CreateCboSaldoDto {
    @IsOptional()
    @IsInt()
    idCbo_Saldo?: number;

    @IsOptional()
    @IsInt()
    idCbo_Scores_Cobranzas?: number;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    Desde?: number;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    Hasta?: number;

    @IsOptional()
    @IsInt()
    idCbo_Riesgo?: number;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    Puntaje?: number;

    @IsOptional()
    @IsString()
    sCbo_Scores_Cobranzas?: string;
}

