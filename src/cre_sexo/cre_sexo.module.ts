import { Module } from '@nestjs/common';
import { CreSexoService } from './cre_sexo.service';
import { CreSexoController } from './cre_sexo.controller';
import { CreSexo } from './entities/cre_sexo.entity';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  controllers: [CreSexoController],
  providers: [CreSexoService],
  imports: [
    TypeOrmModule.forFeature([CreSexo]),
  ]
})
export class CreSexoModule {}
