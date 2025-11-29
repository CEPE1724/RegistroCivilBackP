import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import * as bodyParser from 'body-parser';
import { HttpCacheInterceptor } from './common/interceptors/http-cache.interceptor';

async function bootstrap() {

  // Sirve archivos estáticos desde la carpeta uploads
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const IP_SERVER = configService.get<string>('IP_SERVER');

   // ✅ Aumenta el límite de tamaño del cuerpo del request (para imágenes base64)
  app.use(bodyParser.json({ limit: '100mb' })); // Puedes subir a 200mb si lo necesitas
  app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));


  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
 app.setGlobalPrefix('api/v1'); // Prefijo global para todas las rutas
 app.useGlobalPipes(    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true,   }) );
 
 // ✅ Activar interceptor de caché global para todas las peticiones GET
 app.useGlobalInterceptors(new HttpCacheInterceptor(
   app.get('CACHE_MANAGER'),
   app.get(Reflector)
 ));
 
  await app.listen(process.env.PORT || 3025);
  console.log(`Application is running on: ${process.env.PORT }`);
}
bootstrap();
/* ANTES DE SUBIR A PRODUCCION HACER UN NPM RUN START Y DESPUES UN NPM RUN BUILD*/