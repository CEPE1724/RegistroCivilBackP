import { Module } from '@nestjs/common';
import { CreReferenciasclienteswebService } from './cre-referenciasclientesweb.service';
import { CreReferenciasclienteswebController } from './cre-referenciasclientesweb.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreReferenciasclientesweb } from './entities/cre-referenciasclientesweb.entity';
@Module({
  controllers: [CreReferenciasclienteswebController],
  providers: [CreReferenciasclienteswebService],
  imports: [TypeOrmModule.forFeature([CreReferenciasclientesweb])],
})
export class CreReferenciasclienteswebModule {}
