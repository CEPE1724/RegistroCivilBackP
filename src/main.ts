import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {

  // Sirve archivos estáticos desde la carpeta uploads
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const IP_SERVER = configService.get<string>('IP_SERVER');

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  await app.listen(3008, IP_SERVER);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
