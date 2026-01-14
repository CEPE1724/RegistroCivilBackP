
/*CREATE TABLE FIR_Firmantes (
    idFIR_Firmante UNIQUEIDENTIFIER DEFAULT NEWID() PRIMARY KEY,

    idFIR_OperacionFirma UNIQUEIDENTIFIER NOT NULL,
    dni VARCHAR(20),
    name VARCHAR(100),
    first_last_name VARCHAR(100),
    second_last_name VARCHAR(100),
    email VARCHAR(150),

    sign_state VARCHAR(50) NULL,
    signed_at DATETIME NULL,

    FechaSistema DATETIME DEFAULT GETDATE(),
);*/
import { IsNotEmpty, IsString, IsNumber, IsDate, IsOptional, IsInt, MinLength } from 'class-validator';
import { Type } from 'class-transformer';
export class CreateFirOperacionesfirmaDto {
    @IsNotEmpty()
    @IsString()
    idFIR_OperacionFirma: string;

    @IsOptional()
    @IsString()
    dni?: string;

    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsString()
    first_last_name?: string;

    @IsOptional()
    @IsString()
    second_last_name?: string;

    @IsOptional()
    @IsString()
    email?: string;

    @IsOptional()
    @IsString()
    sign_state?: string | null;

    @IsOptional()
    @Type(() => Date)
    @IsDate()
    signed_at?: Date | null;
}

