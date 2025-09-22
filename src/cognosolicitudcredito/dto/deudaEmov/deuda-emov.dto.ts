// src/deuda-emov/dto/deuda-emov.dto.ts

import { InfraccionDto } from './infraccion.dto';

export class DeudaEmovDto {
  cedula: string;
  tipoBusqueda: string;
  valorAdeudado: number;
  fechaActualizacion: Date;
  infraccion: InfraccionDto[];
}
