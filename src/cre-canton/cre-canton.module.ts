import { Module } from '@nestjs/common';
import { CreCantonService } from './cre-canton.service';
import { CreCantonController } from './cre-canton.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreCanton } from './entities/cre-canton.entity';
import { AuthModule } from 'src/auth/auth.module';
@Module({
  controllers: [CreCantonController],
  providers: [CreCantonService],
  imports: [
    TypeOrmModule.forFeature([CreCanton]), AuthModule
  ]
})
export class CreCantonModule {}
