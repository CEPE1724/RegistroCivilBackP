/*CREATE TABLE FIR_Documentos (
    idFIR_Documento UNIQUEIDENTIFIER DEFAULT NEWID() PRIMARY KEY,

    idFIR_OperacionFirma UNIQUEIDENTIFIER NOT NULL,

    code VARCHAR(50),
    name VARCHAR(100),
    path NVARCHAR(500),
    state_sign VARCHAR(50),

    FechaSistema DATETIME DEFAULT GETDATE(),

    CONSTRAINT FK_Documentos_Operacion
        FOREIGN KEY (idFIR_OperacionFirma)
        REFERENCES FIR_OperacionFirma(idFIR_OperacionFirma)
);*/
import { IsNotEmpty, IsString, IsNumber, IsDate, IsOptional, IsInt, MinLength } from 'class-validator';
import { Type } from 'class-transformer';
export class CreateFirDocumentoDto {
    @IsNotEmpty()
    @IsString()
    idFIR_OperacionFirma: string;

    @IsNotEmpty()
    @IsString()
    code: string;

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    path: string;

    @IsNotEmpty()
    @IsString()
    state_sign: string;
}
