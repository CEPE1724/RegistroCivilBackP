import { IsString, IsNumber, IsPositive, IsLatitude, IsLongitude, IsOptional } from 'class-validator';

export class CreateGeoreferenciaEntregaDomicilioDto {

	@IsNumber()
	@IsPositive()
	Bodega: number;

	@IsString()
	cedula: string;

	@IsString()
	tipo: string;

	@IsNumber()
	@IsOptional()
	idCompra?: number;

	@IsNumber()
	@IsLatitude()
	Latitud: number;

	@IsNumber()
	@IsLongitude()
	Longitud: number;

	@IsString()
	codigoEntrega: string;
}