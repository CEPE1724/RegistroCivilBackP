import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Storage } from '@google-cloud/storage';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class FileUploadService {
  private storage: Storage;
  private bucketName: string = 'sparta_bucket'; // Nombre de tu bucket

  constructor(private configService: ConfigService) {
    const keyFilePath = this.configService.get<string>('GOOGLE_CLOUD_KEYFILE');
    if (!keyFilePath) {
      throw new Error('Google Cloud Keyfile path is not set in .env');
    }

    // Asegúrate de que la ruta se resuelva correctamente
    const resolvedPath = path.resolve(__dirname, keyFilePath);
    console.log('Resolved Key file path:', resolvedPath); // Verifica la ruta resuelta

    this.storage = new Storage({
      keyFilename: resolvedPath,
    });
  }

  async uploadFile(file: Express.Multer.File, almacen: string, cedula: string, numerosolicitud: string): Promise<string> {
    if (!file) {
      throw new Error('No file provided');
    }

    const bucket = this.storage.bucket(this.bucketName);
    const Year = new Date().getFullYear();
    const Month = new Date().toLocaleString('default', { month: 'long' }).toUpperCase();
    const Day = new Date().toLocaleString('default', { day: '2-digit' });
    const nombre_del_archivo = new Date().getTime();
    console.log('Fecha:', Year, Month, Day);
    // Definir el directorio y la ruta dentro del bucket de GCS

    const filePath = `CREDIPOINT/${almacen}/${Year}/${Month}/${cedula}/${numerosolicitud}/${nombre_del_archivo}`;
    const fileName = `${nombre_del_archivo}`;
    const tempFilePath = path.join(__dirname, fileName);

    // Guardar temporalmente el archivo en el servidor local
    fs.writeFileSync(tempFilePath, file.buffer);
    console.log(`${fileName} guardado en el servidor local.`);

    const gcsFile = bucket.file(filePath);
    const options = {
      destination: gcsFile,
      metadata: {
        contentType: file.mimetype, // Usar el tipo de archivo dinámicamente
      },
    };

    try {
      // Subir el archivo al bucket
      await bucket.upload(tempFilePath, options);
      console.log(`${fileName} subido a ${this.bucketName}.`);

      // Eliminar archivo temporal después de cargarlo
      fs.unlinkSync(tempFilePath);
    
      // Generar y devolver la URL pública del archivo subido
      const publicUrl = `https://storage.googleapis.com/${this.bucketName}/${filePath}`;
      return publicUrl;
    } catch (error) {
      console.error('Error uploading file to GCS:', error);
      throw new Error('Error uploading file: ' + error.message);
    }
  }
}
