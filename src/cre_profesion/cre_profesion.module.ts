import { Module } from '@nestjs/common';
import { CreProfesionService } from './cre_profesion.service';
import { CreProfesionController } from './cre_profesion.controller';
import { CreProfesion } from './entities/cre_profesion.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({

  controllers: [CreProfesionController],
  providers: [CreProfesionService],
  imports: [
    TypeOrmModule.forFeature([CreProfesion]),
  ]

})
export class CreProfesionModule { }
