/*CREATE TABLE [dbo].[Cbo_TiposCliente](
	[idCbo_TiposCliente] [int] IDENTITY(1,1) NOT NULL,
	[idCbo_Scores_Cobranzas] [int] NULL,
	[idTipoCliente] [int] NULL,
	[idCbo_Riesgo] [int] NULL,
	[Puntaje] [int] NULL,
	[sCbo_Scores_Cobranzas] [uniqueidentifier] NULL,
 CONSTRAINT [PK__Cbo_Tipo__682CCBE5DC9B3B2E] PRIMARY KEY CLUSTERED */

 import { IsNotEmpty, IsString, IsNumber, IsDate, IsOptional, IsInt, MinLength } from 'class-validator';
import { Type } from 'class-transformer';
import { UUID } from 'sequelize';

export class CreateCboTipoClienteDto {
    @IsOptional()
    @IsInt()
    idCbo_TiposCliente?: number;

    @IsOptional()
    @IsInt()
    idCbo_Scores_Cobranzas?: number;

    @IsOptional()
    @IsInt()
    idTipoCliente?: number;

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

