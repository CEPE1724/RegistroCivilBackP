import { Module } from '@nestjs/common';
import { CreSexoService } from './cre_sexo.service';
import { CreSexoController } from './cre_sexo.controller';
import { CreSexo } from './entities/cre_sexo.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';


@Module({
  controllers: [CreSexoController],
  providers: [CreSexoService],
  imports: [
    TypeOrmModule.forFeature([CreSexo]), AuthModule
  ]
})
export class CreSexoModule {}
