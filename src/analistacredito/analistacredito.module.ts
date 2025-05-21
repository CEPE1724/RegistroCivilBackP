import { Module } from '@nestjs/common';
import { AnalistacreditoService } from './analistacredito.service';
import { AnalistacreditoController } from './analistacredito.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Analistacredito } from './entities/analistacredito.entity';
import { AuthModule } from 'src/auth/auth.module';
@Module({
  controllers: [AnalistacreditoController],
  providers: [AnalistacreditoService],
  imports: [TypeOrmModule.forFeature([Analistacredito]) , AuthModule],
})
export class AnalistacreditoModule {}
