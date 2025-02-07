import { IsOptional, IsInt, IsString } from 'class-validator';

export class FindAllFiltersDto {
  @IsOptional()
  @IsInt()
  idCbo_Gestores?: number;

  @IsOptional()
  @IsInt()
  idCbo_Gestores_Estrategia?: number;

  @IsOptional()
  @IsInt()
  page?: number = 1;

  @IsOptional()
  @IsInt()
  limit?: number = 10;
}

// src/cbo-gestor/cbo-gestor-cobranzas.dto.ts

export class ResponseDto<T> {
    data: T[];
    totalCount: number;
    page: number;
    limit: number;
  
    constructor(data: T[], totalCount: number, page: number, limit: number) {
      this.data = data;
      this.totalCount = totalCount;
      this.page = page;
      this.limit = limit;
    }
  }
  