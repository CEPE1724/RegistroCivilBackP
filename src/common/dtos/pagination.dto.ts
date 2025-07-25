import { Type, Transform } from 'class-transformer';
import { IsInt, IsOptional, IsPositive, IsDate, IsString, Min } from 'class-validator';

export class PaginationDto {
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  @Transform(({ value }) => new Date(value)) // Ensure that the date is converted correctly
  fechaInicio?: Date;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  @Transform(({ value }) => new Date(value)) // Ensure that the date is converted correctly
  fechaFin?: Date;

  @IsOptional()
  @IsInt()
  @Transform(({ value }) => parseInt(value)) // Converts value to an integer
  estado?: number;

@IsOptional()
@Type(() => Number)
 bodega?: number;


 @IsOptional()
 @Type(() => Number)
 vendedor?: number;

 @IsOptional()
 @Type(() => Number)
 analista?: number;

 @IsOptional()
 @Type(() => Number)
 EstadoSolicitud?: number;

 @IsOptional()
 @Type(() => Number)
 EstadoDocumental?: number;

 @IsOptional()
 @Type(() => Number)
 EstadoTelefonica?: number;

 @IsOptional()
  @Type(() => Number)
  EstadoDomicilio ?: number;

@IsOptional()
  @Type(() => Number)
  EstadoLaboral ?: number;


  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  limit?: number = 10;

  @IsOptional()
  @Min(0)
  @Type(() => Number)
  offset?: number = 0;

@IsOptional()
@IsString()
cedula?: string;

@IsOptional()
@IsString()
numeroSolicitud?: string;

@IsOptional()
@IsString()
nombres?: string; 


@IsOptional()
@Type(() => Number)
idTipoCliente?: number;

@IsOptional()
@Type(() => Number)
idCompraEncuesta?: number;
}
