import { Module } from '@nestjs/common';
import { CognotrabajocargoService } from './cognotrabajocargo.service';
import { CognotrabajocargoController } from './cognotrabajocargo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cognotrabajocargo } from './entities/cognotrabajocargo.entity';
import { AuthModule } from 'src/auth/auth.module';
@Module({
  controllers: [CognotrabajocargoController],
  providers: [CognotrabajocargoService],
  imports: [
    TypeOrmModule.forFeature([Cognotrabajocargo]),AuthModule
  ],
})
export class CognotrabajocargoModule {}
