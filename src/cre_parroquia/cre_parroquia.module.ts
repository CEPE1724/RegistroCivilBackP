import { Module } from '@nestjs/common';
import { CreParroquiaService } from './cre_parroquia.service';
import { CreParroquiaController } from './cre_parroquia.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreParroquia } from './entities/cre_parroquia.entity';

@Module({
  controllers: [CreParroquiaController],
  providers: [CreParroquiaService],
  imports: [
    TypeOrmModule.forFeature([CreParroquia]),
  ]
})
export class CreParroquiaModule {}
