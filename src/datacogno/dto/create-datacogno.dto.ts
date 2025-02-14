import { IsDate, IsString, MinLength } from "class-validator";

export class CreateDatacognoDto {

    @IsString()
    @MinLength(10)
    Cedula: string;
    
    @IsString()
    Codigo?: string;
    
    @IsString()
    Mensaje?: string;

}
/* ? signifa para que pueda ser opcional */