import { Type } from "class-transformer";
import { IsInt, IsOptional, IsPositive, IsString, Min } from "class-validator";


export class PaginationDto {

  @IsOptional()
  @IsString()
  @Type (() => String)
  Filtro?: string;

  @IsOptional()
  @IsPositive()
  @Type (() => Number)
  limit?: number;

  @IsOptional()
  @Min(0)
  @Type (() => Number)
  offset?: number ;
}
/* para crear  nest g mo common*/