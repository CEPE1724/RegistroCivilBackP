import { Module } from '@nestjs/common';
import { CreParentescoService } from './cre_parentesco.service';
import { CreParentescoController } from './cre_parentesco.controller';
import { CreParentesco } from './entities/cre_parentesco.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [CreParentescoController],
  providers: [CreParentescoService],
  imports: [
    TypeOrmModule.forFeature([CreParentesco]),
  ]
})
export class CreParentescoModule {}
