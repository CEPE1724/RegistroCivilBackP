import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Storage } from '@google-cloud/storage';
import * as path from 'path';

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

  async uploadFile(file: Express.Multer.File): Promise<string> {
    if (!file) {
      throw new Error('No file provided');
    }

    const bucket = this.storage.bucket(this.bucketName);
    const blob = bucket.file(file.originalname);
    const blobStream = blob.createWriteStream();

    return new Promise((resolve, reject) => {
      blobStream.on('finish', () => {
        resolve(`https://storage.googleapis.com/${this.bucketName}/${file.originalname}`);
      });

      blobStream.on('error', (err) => {
        console.error('Error uploading to Google Cloud:', err);
        reject(`Error uploading file: ${err.message}`);
      });

      blobStream.end(file.buffer); // Finaliza el stream del archivo
    });
  }
}
