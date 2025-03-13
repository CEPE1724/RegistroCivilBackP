// dto/create-documentos-solicitud.dto.ts

import { IsInt, IsNumber, IsOptional, IsString} from 'class-validator';

export class CreateDocumentosSolicitudDto {

  
  @IsNumber()
  idCre_SolicitudWeb?: number;

  @IsNumber()
  idTipoDocumentoWEB?: number;

  @IsString()
  RutaDocumento?: string;

  @IsString()
  Observacion? : string;
}
