import { Body, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileUploadService } from './file-upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage, memoryStorage } from 'multer';
import * as path from 'path';

@Controller('file-upload')
export class FileUploadController {
  constructor(private readonly fileUploadService: FileUploadService) {}

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: memoryStorage(), // Usamos memoryStorage para almacenar el archivo en memoria
      fileFilter: (req, file, callback) => {
        callback(null, true); // Permite cualquier tipo de archivo
      },
    }),
  )
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: { almacen: string; cedula: string;  numerosolicitud: string },
  ): Promise<{ url: string }> {
    // validacion de todos los parametrso
    if (!file) {
      throw new Error('No se recepto el archivo');
    }
    if (!body.almacen) {
      throw new Error('No almacen provided');
    }
    if (!body.cedula) {
      throw new Error('No cedula provided');
    }
    if (!body.numerosolicitud) {
      throw new Error('No numerosolicitud provided');
    }

    // Verificar qué contiene el archivo
    console.log('File received:', file); // Esto debe mostrar el archivo recibido y su buffer

    const { almacen, cedula,  numerosolicitud } = body;

    try {
      const uploadedFileUrl = await this.fileUploadService.uploadFile(
        file,
        almacen,
        cedula,
        numerosolicitud
      );
      
      // Retornar la URL del archivo en formato JSON
      return { url: uploadedFileUrl };
    } catch (error) {
      console.error('Error uploading file:', error);
      throw new Error('Error uploading file: ' + error.message);
    }
  }
}



