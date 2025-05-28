import { IsNotEmpty, IsString, IsBoolean } from 'class-validator';
import { Length, Matches } from 'class-validator';

export class CreateListaNegraCedulaDto {
  @IsString()
  @IsNotEmpty()
  @Length(10, 10)
  @Matches(/^[0-9]+$/)
  Cedula: string;

  @IsString()
  @IsNotEmpty()
  Observacion: string;

  @IsBoolean()
  @IsNotEmpty()
  Activo: boolean;

  @IsString()
  @IsNotEmpty()
  Usuario: string;
}
