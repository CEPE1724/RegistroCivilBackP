import { IsString } from "class-validator";

export class LoginUserDto {

    @IsString()
    Nombre: string;

    @IsString()
    Clave: string;
}
