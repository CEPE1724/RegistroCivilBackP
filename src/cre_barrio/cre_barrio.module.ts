import { Module } from '@nestjs/common';
import { CreBarrioService } from './cre_barrio.service';
import { CreBarrioController } from './cre_barrio.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreBarrio } from './entities/cre_barrio.entity';
@Module({
  controllers: [CreBarrioController],
  providers: [CreBarrioService],
  imports: [
    TypeOrmModule.forFeature([CreBarrio]),
  ]
})
export class CreBarrioModule {}
