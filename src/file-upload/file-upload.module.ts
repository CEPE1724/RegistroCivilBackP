import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { FileUploadService } from './file-upload.service';
import { FileUploadController } from './file-upload.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule, AuthModule],
  providers: [FileUploadService],
  controllers: [FileUploadController],
})
export class FileUploadModule {}
