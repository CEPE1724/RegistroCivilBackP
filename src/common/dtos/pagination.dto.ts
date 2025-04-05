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
  @IsPositive()
  @Type(() => Number)
  limit?: number = 10;

  @IsOptional()
  @Min(0)
  @Type(() => Number)
  offset?: number = 0;
}
