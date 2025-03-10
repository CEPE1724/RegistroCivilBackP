import { Module } from '@nestjs/common';
import { CrectaedogestionService } from './crectaedogestion.service';
import { CrectaedogestionController } from './crectaedogestion.controller';
import { Crectaedogestion } from './entities/crectaedogestion.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [CrectaedogestionController],
  providers: [CrectaedogestionService],
  imports: [
    TypeOrmModule.forFeature([Crectaedogestion]),
  ]
})
export class CrectaedogestionModule {}
