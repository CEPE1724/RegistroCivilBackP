import { Module } from '@nestjs/common';
import { CreCantonService } from './cre-canton.service';
import { CreCantonController } from './cre-canton.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreCanton } from './entities/cre-canton.entity';
@Module({
  controllers: [CreCantonController],
  providers: [CreCantonService],
  imports: [
    TypeOrmModule.forFeature([CreCanton]),
  ]
})
export class CreCantonModule {}
