import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DocumentosSolicitudService } from './documentos-solicitud.service';
import { CreateDocumentosSolicitudDto } from './dto/create-documentos-solicitud.dto';
import { UpdateDocumentoStatusDto } from './dto/update-documentos-solicitud.dto'; // Correcto aquí
import { Query } from '@nestjs/common';


@Controller('documentos-solicitud')
export class DocumentosSolicitudController {
  constructor(private readonly documentosSolicitudService: DocumentosSolicitudService) {}

  @Post()
  create(@Body() createDocumentosSolicitudDto: CreateDocumentosSolicitudDto) {
    return this.documentosSolicitudService.create(createDocumentosSolicitudDto);
  }

  
@Get('observaciones')
async getObservaciones(
  @Query('idSolicitud') idSolicitud: string,
  @Query('idTipoDocumento') idTipoDocumento: string
) {
  return await this.documentosSolicitudService.getObservaciones(
    Number(idSolicitud),
    Number(idTipoDocumento)
  );
}



@Get('check')
async checkIfFileExists(
  @Query('idCreSolicitudWeb') idCreSolicitudWeb: string,
  @Query('tipoDocumento') tipoDocumento: string
) {
  console.log('Parametros recibidos:', { idCreSolicitudWeb, tipoDocumento });

  // Convertir los valores a números
  const idCreSolicitudWebNum = Number(idCreSolicitudWeb);
  const tipoDocumentoNum = Number(tipoDocumento);

  if (isNaN(idCreSolicitudWebNum) || isNaN(tipoDocumentoNum)) {
    console.log('Uno de los parámetros no es un número válido');
    return { exists: false }; // Devuelve falso si alguno de los parámetros no es válido
  }

  const result = await this.documentosSolicitudService.checkIfFileExists(idCreSolicitudWebNum, tipoDocumentoNum);
  console.log('Resultado de la consulta:', result);

  return { exists: result }; // Devuelve el resultado en formato JSON
}


  
   

  @Get(':idSolicitud/:idEstadoVerificacionDocumental')
  async findBySolicitud(
    @Param('idSolicitud') idSolicitud: string,
    @Param('idEstadoVerificacionDocumental') idEstadoVerificacionDocumental: string
  ) {
    return await this.documentosSolicitudService.findBySolicitud(Number(idSolicitud), Number(idEstadoVerificacionDocumental));
  }

  @Get(':idSolicitud/:estado')
  async findBySolicitudEstado(@Param('idSolicitud') idSolicitud: number, @Param('estado') estado: number) {
    return await this.documentosSolicitudService.findBySolicitudEstado(idSolicitud, estado);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateDocumentoStatusDto: UpdateDocumentoStatusDto) {
    return await this.documentosSolicitudService.update(Number(id), updateDocumentoStatusDto);
  }


  @Patch('updateEstado/:idSolicitud')
  async updateEstado(@Param('idSolicitud') idSolicitud: string) {
    await this.documentosSolicitudService.updateEstado(Number(idSolicitud));
    return { message: 'Documentos actualizados correctamente.' };
  }




}


