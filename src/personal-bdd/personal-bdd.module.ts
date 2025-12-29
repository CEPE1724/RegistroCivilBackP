import { Module } from '@nestjs/common';
import { PersonalBddService } from './personal-bdd.service';
import { PersonalBddController } from './personal-bdd.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonalBdd } from './entities/personal-bdd.entity';
import { AuthModule } from 'src/auth/auth.module';
@Module({
  imports: [TypeOrmModule.forFeature([PersonalBdd]), AuthModule],
  controllers: [PersonalBddController],
  providers: [PersonalBddService],
})
export class PersonalBddModule {}
