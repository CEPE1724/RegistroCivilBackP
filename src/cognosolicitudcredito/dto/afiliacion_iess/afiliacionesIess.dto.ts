import { EmpresaDto } from "./empresa.dto";


export class AfiliacionIessDto {
    cedula: string;
    nombre: string;
    corte: string;
    estado: string;
    empresas: EmpresaDto[];
}