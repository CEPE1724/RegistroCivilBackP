import { Module } from '@nestjs/common';
import { CreEstadocivilService } from './cre_estadocivil.service';
import { CreEstadocivilController } from './cre_estadocivil.controller';
import { CreEstadocivil } from './entities/cre_estadocivil.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  controllers: [CreEstadocivilController],
  providers: [CreEstadocivilService],
  imports: [
      TypeOrmModule.forFeature([CreEstadocivil]),
    ]
})
export class CreEstadocivilModule {}
