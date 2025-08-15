import { Module } from '@nestjs/common';
import { MotivoContinuidadService } from './motivo-continuidad.service';
import { MotivoContinuidadController } from './motivo-continuidad.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MotivoContinuidadEntity } from './entities/motivo-continuidad.entity';
import { AuthModule } from 'src/auth/auth.module';
@Module({
  imports: [
    TypeOrmModule.forFeature([MotivoContinuidadEntity]),
    AuthModule
  ],
  controllers: [MotivoContinuidadController],
  providers: [MotivoContinuidadService],
})
export class MotivoContinuidadModule {}
