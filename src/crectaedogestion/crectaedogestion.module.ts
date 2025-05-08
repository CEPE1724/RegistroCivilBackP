import { Module } from '@nestjs/common';
import { CrectaedogestionService } from './crectaedogestion.service';
import { CrectaedogestionController } from './crectaedogestion.controller';
import { Crectaedogestion } from './entities/crectaedogestion.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [CrectaedogestionController],
  providers: [CrectaedogestionService],
  imports: [
    TypeOrmModule.forFeature([Crectaedogestion]), AuthModule
  ]
})
export class CrectaedogestionModule {}
