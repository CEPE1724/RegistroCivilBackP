import { IsInt, IsNumber, IsOptional, IsString} from 'class-validator';

export class CreateDocumentosSolicitudDto {

  
  @IsNumber()
  idCre_SolicitudWeb?: number;

  @IsNumber()
  idTipoDocumentoWEB?: number;

  @IsString()
  RutaDocumento?: string;

  @IsString()
  @IsOptional()
  Observacion? : string;


  @IsString()
  Usuario: string;

  @IsNumber()
  IdUsuario: number;

}

