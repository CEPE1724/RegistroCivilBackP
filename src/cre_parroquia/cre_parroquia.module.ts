import { Module } from '@nestjs/common';
import { CreParroquiaService } from './cre_parroquia.service';
import { CreParroquiaController } from './cre_parroquia.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreParroquia } from './entities/cre_parroquia.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [CreParroquiaController],
  providers: [CreParroquiaService],
  imports: [
    TypeOrmModule.forFeature([CreParroquia]), AuthModule
  ]
})
export class CreParroquiaModule {}
