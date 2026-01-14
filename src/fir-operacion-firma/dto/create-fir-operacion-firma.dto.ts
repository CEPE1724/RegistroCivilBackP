
/*CREATE TABLE FIR_OperacionFirma (
    idFIR_OperacionFirma UNIQUEIDENTIFIER DEFAULT NEWID() PRIMARY KEY,

    hash_operation VARCHAR(100) NOT NULL,
    code_client VARCHAR(50),
    code_bio VARCHAR(100),
    link NVARCHAR(500),

    time_signature_validity DATETIME,
    state VARCHAR(50),
    task VARCHAR(100),

    state_fiducia VARCHAR(50) NULL,
    message_fiducia NVARCHAR(500) NULL,

    status INT NOT NULL,
    message NVARCHAR(250),

    FechaSistema DATETIME DEFAULT GETDATE()
);
*/

import { IsNotEmpty, IsString, IsNumber, IsDate, IsOptional, IsInt, MinLength } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateFirOperacionFirmaDto {
    @IsNotEmpty()
    @IsString()
    hash_operation: string;

    @IsOptional()
    @IsString()
    code_client?: string;

    @IsOptional()
    @IsString()
    code_bio?: string;
    @IsOptional()
    @IsString()
    link?: string;

    @IsOptional()
    @Type(() => Date)
    @IsDate()
    time_signature_validity?: Date;

    @IsOptional()
    @IsString()
    state?: string;

    @IsOptional()
    @IsString()
    task?: string;

    @IsOptional()
    @IsString()
    state_fiducia?: string | null;

    @IsOptional()
    @IsString()
    message_fiducia?: string | null;

    @IsNotEmpty()
    @IsInt()
    status: number;

    @IsOptional()
    @IsString()
    message?: string;
}

