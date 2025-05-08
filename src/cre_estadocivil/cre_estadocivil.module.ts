import { Module } from '@nestjs/common';
import { CreEstadocivilService } from './cre_estadocivil.service';
import { CreEstadocivilController } from './cre_estadocivil.controller';
import { CreEstadocivil } from './entities/cre_estadocivil.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
@Module({
  controllers: [CreEstadocivilController],
  providers: [CreEstadocivilService],
  imports: [
      TypeOrmModule.forFeature([CreEstadocivil]), AuthModule
    ]
})
export class CreEstadocivilModule {}
