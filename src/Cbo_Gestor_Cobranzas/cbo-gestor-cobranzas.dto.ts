
import { IsOptional, IsInt, IsString } from 'class-validator';

export class FindAllFiltersDto {
  @IsOptional()

  idCbo_Gestores?: number;

  @IsOptional()
 
  Bodega?: number;

  @IsOptional()


  page?: number = 1;

  @IsOptional()


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

function Type(arg0: () => NumberConstructor): (target: FindAllFiltersDto, propertyKey: "Bodega") => void {
  throw new Error('Function not implemented.');
}
  