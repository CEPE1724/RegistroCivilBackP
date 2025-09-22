// src/deuda-emov/dto/infraccion.dto.ts

import { DetalleRubroDto } from './detalle-rubro.dto';

export class InfraccionDto {
  rubro: string;
  detalle: string;
  total: number;
  detalleRubro: DetalleRubroDto;
}
