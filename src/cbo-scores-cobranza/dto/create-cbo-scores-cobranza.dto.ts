import { IsNotEmpty, IsString, IsNumber, IsDate, IsOptional, IsInt, MinLength } from 'class-validator';
import { Type } from 'class-transformer';
import { UUID } from 'sequelize';
/*CREATE TABLE [dbo].[Cbo_Scores_Cobranzas](
	[idCbo_Scores_Cobranzas] [int] IDENTITY(1,1) NOT NULL,
	[Desde] [date] NULL,
	[Hasta] [date] NULL,
	[Descripcion] [varchar](100) NULL,
	[Estado] [int] NULL,
	[FechaSistema] [datetime] NULL,
	[Usuario] [varchar](30) NULL,
	[sCbo_Scores_Cobranzas] [uniqueidentifier] NULL,
)*/
export class CreateCboScoresCobranzaDto {
    @IsOptional()
    @IsDate()
    @Type(() => Date)
    Desde?: Date;

    @IsOptional()
    @IsDate()
    @Type(() => Date)
    Hasta?: Date;

    @IsOptional()
    @IsString()
    @MinLength(0)
    Descripcion?: string;

    @IsOptional()
    @IsInt()
    Estado?: number;

    @IsOptional()
    @IsDate()
    @Type(() => Date)
    FechaSistema?: Date;
    
    @IsOptional()
    @IsString()
    @MinLength(0)
    Usuario?: string;

    @IsOptional()
    @IsString()
    @MinLength(0)
    sCbo_Scores_Cobranzas?: string;
}
