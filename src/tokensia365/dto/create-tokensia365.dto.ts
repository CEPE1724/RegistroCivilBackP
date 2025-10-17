/*CREATE  TABLE Tokensia365 (
    idTokensia365 INT IDENTITY(1,1) PRIMARY KEY,
    status INT NOT NULL,
    tkn_token VARCHAR(255) NOT NULL,
    tkn_fecha_vencimiento DATETIME NOT NULL,
    usr_id INT NOT NULL,
    FechaSistema DATETIME DEFAULT GETDATE()
);*/


import { IsBoolean, IsDate, IsNumber, IsOptional, IsString } from 'class-validator';
export class CreateTokensia365Dto {
    
    @IsNumber()
    status: number;

    @IsString()
    tkn_token: string

    @IsDate()
    tkn_fecha_vencimiento: Date;

    @IsNumber()
    usr_id: number;

    @IsDate()
    @IsOptional()
    FechaSistema?: Date;

}
