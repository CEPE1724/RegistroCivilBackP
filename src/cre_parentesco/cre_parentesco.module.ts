import { Module } from '@nestjs/common';
import { CreParentescoService } from './cre_parentesco.service';
import { CreParentescoController } from './cre_parentesco.controller';
import { CreParentesco } from './entities/cre_parentesco.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [CreParentescoController],
  providers: [CreParentescoService],
  imports: [
    TypeOrmModule.forFeature([CreParentesco]), AuthModule
  ]
})
export class CreParentescoModule {}
