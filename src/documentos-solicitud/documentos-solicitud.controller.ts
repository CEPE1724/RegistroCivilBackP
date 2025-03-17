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

  
  
   

  @Get(':idSolicitud')
  async findBySolicitud(@Param('idSolicitud') idSolicitud: string) {
    return await this.documentosSolicitudService.findBySolicitud(Number(idSolicitud));
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateDocumentoStatusDto: UpdateDocumentoStatusDto) {
    return await this.documentosSolicitudService.update(Number(id), updateDocumentoStatusDto);
  }


 


}


