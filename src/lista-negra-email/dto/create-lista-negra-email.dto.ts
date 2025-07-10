import { IsNotEmpty, IsString, IsBoolean, IsEmail } from 'class-validator';


export class CreateListaNegraEmailDto {
    @IsString()
    @IsNotEmpty()
    @IsEmail({}, { message: 'Debe ser un email válido' })
    Email: string;
  
    @IsString()
    @IsNotEmpty()
    Descripcion: string;
  
    @IsBoolean()
    @IsNotEmpty()
    Activo: boolean;


    @IsString()
    @IsNotEmpty()
    Usuario: string;
  }
  