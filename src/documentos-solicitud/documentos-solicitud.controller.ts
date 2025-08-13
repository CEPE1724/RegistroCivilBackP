import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DocumentosSolicitudService } from './documentos-solicitud.service';
import { CreateDocumentosSolicitudDto } from './dto/create-documentos-solicitud.dto';
import { UpdateDocumentoStatusDto } from './dto/update-documentos-solicitud.dto'; // Correcto aquí
import { Query } from '@nestjs/common';
import { Auth } from '../auth/decorators';
import { ValidRoles } from '../auth/interfaces';


@Controller('documentos-solicitud')
export class DocumentosSolicitudController {
  constructor(private readonly documentosSolicitudService: DocumentosSolicitudService) {}

  @Post()
  @Auth()
  create(@Body() createDocumentosSolicitudDto: CreateDocumentosSolicitudDto) {
    return this.documentosSolicitudService.create(createDocumentosSolicitudDto);
  }


  @Get('verificar-documentos-aprobados/:idSolicitud')
  @Auth()
async verificarDocumentosAprobados(@Param('idSolicitud') idSolicitud: string) {
  const result = await this.documentosSolicitudService.areRequiredDocsApproved(Number(idSolicitud));
  return { allThreeDocsApproved: result };
}

  
@Get('observaciones')
@Auth()
async getObservaciones(
  @Query('idSolicitud') idSolicitud: string,
  @Query('idTipoDocumento') idTipoDocumento: string
) {
  return await this.documentosSolicitudService.getObservaciones(
    Number(idSolicitud),
    Number(idTipoDocumento)
  );
}

@Patch('update-cancelados/:idSolicitud')
@Auth()
async updateCancelados(@Param('idSolicitud') id: string, @Body() updateDocumentoStatusDto: UpdateDocumentoStatusDto) {
  await this.documentosSolicitudService.updateCancelados(Number(id));
  return { message: 'Documentos cancelados correctamente.' };
}


@Get('check')
@Auth()
async checkIfFileExists(
  @Query('idCreSolicitudWeb') idCreSolicitudWeb: string,
  @Query('tipoDocumento') tipoDocumento: string
) {

  // Convertir los valores a números
  const idCreSolicitudWebNum = Number(idCreSolicitudWeb);
  const tipoDocumentoNum = Number(tipoDocumento);

  if (isNaN(idCreSolicitudWebNum) || isNaN(tipoDocumentoNum)) {

    return { exists: false }; // Devuelve falso si alguno de los parámetros no es válido
  }

  const result = await this.documentosSolicitudService.checkIfFileExists(idCreSolicitudWebNum, tipoDocumentoNum);


  return { exists: result }; // Devuelve el resultado en formato JSON
}





  @Get('documentos/:idSolicitud/:idEstadoVerificacionDocumental')
  @Auth()
  async findBySolicitud(
    @Param('idSolicitud') idSolicitud: string,
    @Param('idEstadoVerificacionDocumental') idEstadoVerificacionDocumental: string
  ) {
    return await this.documentosSolicitudService.findBySolicitud(Number(idSolicitud), Number(idEstadoVerificacionDocumental));
  }

  

  @Get(':idSolicitud/:estado')
  @Auth()
  async findBySolicitudEstado(@Param('idSolicitud') idSolicitud: number, @Param('estado') estado: number) {
    return await this.documentosSolicitudService.findBySolicitudEstado(idSolicitud, estado);
  }

 


  @Patch(':id')
  @Auth()
  async update(@Param('id') id: string, @Body() updateDocumentoStatusDto: UpdateDocumentoStatusDto) {
    return await this.documentosSolicitudService.update(Number(id), updateDocumentoStatusDto);
  }


  


  @Patch('updateEstado/:idSolicitud')
  @Auth()
  async updateEstado(@Param('idSolicitud') idSolicitud: string) {
    await this.documentosSolicitudService.updateEstado(Number(idSolicitud));
    return { message: 'Documentos actualizados correctamente.' };
  }




}


