import * as fs from 'fs-extra';
import * as path from 'path';

async function copyCredentials() {
  try {
    const sourceFilePath = path.resolve(__dirname, 'config', 'google-credentials.json');
    const destFilePath = path.resolve(__dirname, 'dist', 'config', 'google-credentials.json');
    const sourceDir = path.resolve(__dirname, 'config');
    const destDir = path.resolve(__dirname, 'dist', 'config');

    // Asegúrate de que la carpeta de destino exista
    await fs.ensureDir(destDir); // Crea la carpeta 'dist/config' si no existe

    // Copiar el archivo de credenciales
    await fs.copy(sourceFilePath, destFilePath);

    console.log('Google credentials copied successfully!');
  } catch (err) {
    console.error('Error copying credentials:', err);
  }
}

// Ejecutar la función
copyCredentials();
