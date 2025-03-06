import { Module } from '@nestjs/common';
import { CreProvinciaService } from './cre_provincia.service';
import { CreProvinciaController } from './cre_provincia.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreProvincia } from './entities/cre_provincia.entity';
@Module({
  controllers: [CreProvinciaController],
  providers: [CreProvinciaService],
  imports: [
    TypeOrmModule.forFeature([CreProvincia]),
  ]
})
export class CreProvinciaModule {}
