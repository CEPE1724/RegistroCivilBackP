
import { IsNotEmpty, IsString, IsBoolean, IsNumber } from 'class-validator';
import { Length, Matches } from 'class-validator';
export class CreateOtpcodigoDto {
    @IsString()
    @IsNotEmpty()
    @Length(15, 15)
    phone_number: string;

    @IsString()
    @IsNotEmpty()
    @Length(6, 6)
    otp_code: string;

    @IsBoolean()
    @IsNotEmpty()
    is_used: boolean;

    @IsBoolean()
    @IsNotEmpty()
    is_verified: boolean;

    @IsString()
    @Length(50, 50)
    cod_error: string;

    @IsString()
    @Length(500, 500)
    errorinfo: string;

    @IsString()
    @Length(50, 50)
    refid: string;

    @IsString()
    @Length(500, 500)
    mensaje: string;

    @IsNumber()
    @IsNotEmpty()
    idTipoOTP: number;

    @IsNumber()
    @IsNotEmpty()
    Bodega: number;

    @IsString()
    @Length(50, 50)
    Cedula: string;

}

