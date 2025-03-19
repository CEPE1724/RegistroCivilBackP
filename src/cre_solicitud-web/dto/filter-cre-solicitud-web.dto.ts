import { Type } from "class-transformer";
import { IsInt, IsNumber, IsOptional, IsPositive, IsString, Min } from "class-validator";

export class FilterCreSolicitudWebDto {

    // Filtro general (puede ser un texto, nombre de cliente, etc.)
    @IsOptional()
    @IsString()
    @Type(() => String)
    Filtro?: string;

    // Filtro de bodega, puedes pasarlo por parámetro
    @IsOptional()
    @IsInt()
    @Type(() => Number)  // Esto garantiza que se convierta a número si se pasa como cadena
    bodega?: number;  // Debe ser un número


    // Limitación de resultados por página
    @IsOptional()
    @IsPositive()
    @Type(() => Number)
    limit?: number;

    // Desplazamiento de los resultados para la paginación
    @IsOptional()
    @Min(0)
    @Type(() => Number)
    offset?: number;
}
