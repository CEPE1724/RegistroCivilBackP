import { Module } from '@nestjs/common';
import { UatEqfxScoreService } from './uat_eqfx_score.service';
import { UatEqfxScoreController } from './uat_eqfx_score.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UatEqfxScore } from './entities/uat_eqfx_score.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [UatEqfxScoreController],
  providers: [UatEqfxScoreService],
  imports: [TypeOrmModule.forFeature([UatEqfxScore]), AuthModule],
  exports: [UatEqfxScoreService]
})
export class UatEqfxScoreModule {}
