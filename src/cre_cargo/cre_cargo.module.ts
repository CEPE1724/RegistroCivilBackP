import { Module } from '@nestjs/common';
import { CreCargoService } from './cre_cargo.service';
import { CreCargoController } from './cre_cargo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreCargo } from './entities/cre_cargo.entity';

@Module({
  controllers: [CreCargoController],
  providers: [CreCargoService],
  imports: [
	TypeOrmModule.forFeature([CreCargo]),
  ]
})

export class CreCargoModule {}
