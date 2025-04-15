import { Module } from '@nestjs/common';
import { CognotrabajocargoService } from './cognotrabajocargo.service';
import { CognotrabajocargoController } from './cognotrabajocargo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cognotrabajocargo } from './entities/cognotrabajocargo.entity';
@Module({
  controllers: [CognotrabajocargoController],
  providers: [CognotrabajocargoService],
  imports: [
    TypeOrmModule.forFeature([Cognotrabajocargo]),
  ],
})
export class CognotrabajocargoModule {}
