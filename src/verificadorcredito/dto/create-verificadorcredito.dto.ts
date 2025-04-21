import {
    IsNotEmpty, IsString, IsNumber, IsBoolean, IsDate, IsOptional, isNumber, Min,
    MinLength,
    IsPositive
} from 'class-validator';

export class CreateVerificadorcreditoDto {
	@IsOptional()
	@IsNumber()
	idVerificadorCredito: number;

	@IsNotEmpty()
	@IsString()
	@MinLength(2)
	Nombre: string;	

	@IsNotEmpty()
	@IsNumber()
	idUsuario: number;

	@IsOptional()
	@IsDate()
	Fecha: Date;

	@IsOptional()
	@IsNumber()
	Estado: number;
}
