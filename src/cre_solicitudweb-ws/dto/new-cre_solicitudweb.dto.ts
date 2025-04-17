import { IsString, MinLength } from "class-validator";


export class NewCreSolicitudwebDto {
    @IsString()
    @MinLength(1)
   message: string;
}