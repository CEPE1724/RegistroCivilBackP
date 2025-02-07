import { IsString } from 'class-validator';

export class RegisterDto {
  @IsString()
  Nombre: string;

  @IsString()
  password: string;
}
