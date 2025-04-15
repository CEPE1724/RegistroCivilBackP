import { IsNumber, IsString, IsOptional, IsDate, IsNotEmpty, IsArray } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateCoordenadasprefacturaDto {

	@IsNumber()
	@IsNotEmpty()
	@Type(() => Number)
  	id: number;

	@IsString()
	@IsNotEmpty()
	cedula: string;

	@IsNumber()
	latitud: number;

	@IsNumber()
	longitud: number;

	@IsString()
	@IsNotEmpty()
	direccion: string;

	@IsString()
	@IsNotEmpty()
	ip: string;

	@IsOptional()
	@IsNumber()
	iEstado?: number;

	@IsOptional()
	@IsDate()
	@Type(() => Date)
	FechaSistema?: Date;

	@IsOptional()
  @IsArray()
  @IsString({ each: true })
  UrlImagen?: string[];

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  Tipo: number;

	@IsOptional()
	@IsString()
	Usuario ?: string;

	@IsOptional()
	@IsNumber()
	@Type(() => Number)
	web ?: number;
}
