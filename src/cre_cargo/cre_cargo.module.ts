import { Module } from '@nestjs/common';
import { CreCargoService } from './cre_cargo.service';
import { CreCargoController } from './cre_cargo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreCargo } from './entities/cre_cargo.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [CreCargoController],
  providers: [CreCargoService],
  imports: [
	TypeOrmModule.forFeature([CreCargo]), AuthModule
  ]
})

export class CreCargoModule {}
