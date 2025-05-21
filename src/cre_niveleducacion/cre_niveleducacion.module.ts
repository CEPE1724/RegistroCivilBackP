import { Module } from '@nestjs/common';
import { CreNiveleducacionService } from './cre_niveleducacion.service';
import { CreNiveleducacionController } from './cre_niveleducacion.controller';
import { CreNiveleducacion } from './entities/cre_niveleducacion.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [CreNiveleducacionController],
  providers: [CreNiveleducacionService],
  imports: [
    TypeOrmModule.forFeature([CreNiveleducacion]), AuthModule
  ]
})
export class CreNiveleducacionModule {}
