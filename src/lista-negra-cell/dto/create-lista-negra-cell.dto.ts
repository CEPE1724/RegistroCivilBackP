import { IsNotEmpty, IsString, IsBoolean } from 'class-validator';
import { Length, Matches } from 'class-validator';


export class CreateListaNegraCellDto {
    @IsString()
    @IsNotEmpty()
    @Length(10, 10)
    @Matches(/^[0-9]+$/)
    NumeroCell: string;
  
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
  