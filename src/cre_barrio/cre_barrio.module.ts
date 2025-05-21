import { Module } from '@nestjs/common';
import { CreBarrioService } from './cre_barrio.service';
import { CreBarrioController } from './cre_barrio.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreBarrio } from './entities/cre_barrio.entity';
import { AuthModule } from 'src/auth/auth.module';
@Module({
  controllers: [CreBarrioController],
  providers: [CreBarrioService],
  imports: [
    TypeOrmModule.forFeature([CreBarrio]) , AuthModule
  ]
})
export class CreBarrioModule {}
