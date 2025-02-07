import { IsString } from 'class-validator';

export class LoginDto {
  @IsString()
  Nombre: string;

  @IsString()
  password: string;
}
