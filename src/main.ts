import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import * as bodyParser from 'body-parser';
import './metrics/system-metrics';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const PORT = process.env.PORT || 3025;

  // -------------------------------
  // ✅ CORS
  // -------------------------------
  app.enableCors({
    origin: '*', // Puedes reemplazar '*' por tus dominios permitidos en producción
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  // Manejo explícito de OPTIONS (para solicitudes complejas / preflight)
  app.use((req, res, next) => {
    if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS');
      res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      return res.sendStatus(200);
    }
    next();
  });

  // -------------------------------
  // ✅ Body parser (cuerpo grande)
  // -------------------------------
  app.use(bodyParser.json({ limit: '100mb' }));
  app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));

  // -------------------------------
  // ✅ Prefijo global de rutas
  // -------------------------------
  app.setGlobalPrefix('api/v1');

  // -------------------------------
  // ✅ Validación global
  // -------------------------------
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  await app.listen(PORT);
  console.log(`🚀 Application is running on port: ${PORT}`);
}

bootstrap();
