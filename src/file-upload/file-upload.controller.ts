import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileUploadService } from './file-upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';

@Controller('file-upload')
export class FileUploadController {
  constructor(private readonly fileUploadService: FileUploadService) {}

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads', // Guarda temporalmente los archivos en este directorio
        filename: (req, file, callback) => {
          callback(null, file.originalname); // Usamos el nombre original del archivo
        },
      }),
      fileFilter: (req, file, callback) => {
        // Permite cualquier tipo de archivo
        callback(null, true);
      },
    }),
  )
  async uploadFile(@UploadedFile() file: Express.Multer.File): Promise<string> {
    if (!file) {
      throw new Error('No file uploaded');
    }

    try {
      const uploadedFileUrl = await this.fileUploadService.uploadFile(file);
      return `File uploaded successfully: ${uploadedFileUrl}`;
    } catch (error) {
      console.error('Error uploading file:', error);  // Imprime más detalles en el log
      throw new Error('Error uploading file: ' + error.message);
    }
  }
}
