import { Module } from '@nestjs/common';
import { CreProvinciaService } from './cre_provincia.service';
import { CreProvinciaController } from './cre_provincia.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreProvincia } from './entities/cre_provincia.entity';
import { AuthModule } from 'src/auth/auth.module';
@Module({
  controllers: [CreProvinciaController],
  providers: [CreProvinciaService],
  imports: [
    TypeOrmModule.forFeature([CreProvincia]), AuthModule
  ]
})
export class CreProvinciaModule {}
