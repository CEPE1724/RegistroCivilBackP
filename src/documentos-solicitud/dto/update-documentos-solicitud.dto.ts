import { IsInt } from 'class-validator';

export class UpdateDocumentoStatusDto {
  @IsInt()
  idEstadoDocumento: number;  // Permite actualizar solo este campo
}
