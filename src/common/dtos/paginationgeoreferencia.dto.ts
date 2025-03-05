import { Type, Transform } from 'class-transformer';
import { IsOptional, IsInt, IsString, IsDate, IsPositive } from 'class-validator';

export class PaginationGeoreferenciaDto {
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  @Transform(({ value }) => new Date(value)) // Asegura que las fechas se conviertan correctamente
  FechaInicio: Date = new Date();  // Valor por defecto: fecha actual

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  @Transform(({ value }) => new Date(value)) // Asegura que las fechas se conviertan correctamente
  FechaFin: Date = new Date();  // Valor por defecto: fecha actual

  @IsOptional()
  @IsInt()
  @Transform(({ value }) => parseInt(value)) // Convierte el valor a un número entero
  Estado: number = 0;  // Valor por defecto: 3 (todos)

  @IsOptional()
  @IsInt()
  @Transform(({ value }) => parseInt(value)) // Convierte el valor a un número entero
  Tipo: number = 0;  // Valor por defecto: 1 (DOMICILIO)

  @IsOptional()
  @IsString()
  Cedula: string = '';  // Valor por defecto: cadena vacía

  @IsOptional()
  @IsInt()
  @Transform(({ value }) => parseInt(value)) // Convierte el valor a un número entero
  limit: number = 10;  // Valor por defecto para el límite de resultados

  @IsOptional()
  @IsInt()
  @Transform(({ value }) => parseInt(value)) // Convierte el valor a un número entero
  offset: number = 0;  // Valor por defecto para el desplazamiento

  @IsOptional()
  @IsString()
  orderDirection: 'asc' | 'desc' = 'asc'; // Valor por defecto: 'asc'

  // Agregar campo para el campo de orden (por ejemplo, 'fecha', 'estado', 'tipo', etc.)
  @IsOptional()
  @IsString()
  orderBy: string = ''; // Valor por defecto: cadena vacía
}
