import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Storage } from '@google-cloud/storage';
import * as path from 'path';
import * as fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class DflStoregoogleService {
  private readonly logger = new Logger("GoogleStorageService");
  private storage: Storage;
  private readonly bucketName = 'sparta_bucket';

  constructor(private readonly configService: ConfigService) {
    const keyFilePath = this.configService.get<string>('GOOGLE_CLOUD_KEYFILE');
    if (!keyFilePath) {
      throw new Error('❌ GOOGLE_CLOUD_KEYFILE no está configurado en el archivo .env');
    }

    // Resolver la ruta desde la raíz del proyecto
    const resolvedPath = path.resolve(process.cwd(), keyFilePath);
    
    if (!fs.existsSync(resolvedPath)) {
      throw new Error(`❌ No se encontró el archivo de credenciales: ${resolvedPath}`);
    }

    this.storage = new Storage({
      keyFilename: resolvedPath,
    });

    this.logger.log(`✅ Google Cloud Storage inicializado correctamente`);
    this.logger.log(`📁 Credenciales cargadas desde: ${resolvedPath}`);
  }

  /**
   * Sube una imagen en base64 a Google Cloud Storage
   * @param base64Image Imagen en formato base64
   * @param cedula Identificación del cliente
   * @param numeroSolicitud Número de solicitud
   * @param tipo Tipo de imagen (ej: frontal, selfie, reverso)
   * @returns URL pública del archivo en GCS
   */
  async uploadBase64Image(
    base64Image: string,
    cedula: string,
    numeroSolicitud: string,
    tipo: string,
  ): Promise<string> {
    if (!base64Image) {
      throw new Error('No se recibió imagen base64 para subir');
    }

    const bucket = this.storage.bucket(this.bucketName);

    const Year = new Date().getFullYear();
    const Month = new Date().toLocaleString('default', { month: 'long' }).toUpperCase();
    const Day = new Date().toLocaleString('default', { day: '2-digit' });
    const uniqueName = `${uuidv4()}.png`;

    const filePath = `CREDIPOINT/BIOMETRICO/${Year}/${Month}/${cedula}/${numeroSolicitud}/${tipo}/${uniqueName}`;
    const tempPath = path.join(__dirname, `${uniqueName}`);

    try {
      // 🔹 Convertir base64 a Buffer y guardar temporalmente
      const buffer = Buffer.from(base64Image, 'base64');
      fs.writeFileSync(tempPath, buffer);

      // 🔹 Subir archivo al bucket
      await bucket.upload(tempPath, {
        destination: filePath,
        metadata: {
          contentType: 'image/png',
        },
      });

      // 🔹 Eliminar archivo temporal
      fs.unlinkSync(tempPath);

      // 🔹 Generar URL pública
      const publicUrl = `https://storage.googleapis.com/${this.bucketName}/${filePath}`;
      this.logger.log(`📤 Imagen subida a: ${publicUrl}`);

      return publicUrl;
    } catch (error) {
      this.logger.error(`❌ Error subiendo imagen a GCS: ${error.message}`);
      throw new Error(`Error al subir archivo a GCS: ${error.message}`);
    }
  }
}
