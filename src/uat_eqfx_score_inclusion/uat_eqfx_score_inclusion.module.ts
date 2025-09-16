import { Module } from '@nestjs/common';
import { UatEqfxScoreInclusionService } from './uat_eqfx_score_inclusion.service';
import { UatEqfxScoreInclusionController } from './uat_eqfx_score_inclusion.controller';
import { AuthModule } from 'src/auth/auth.module';
import { UatEqfxScoreInclusion } from './entities/uat_eqfx_score_inclusion.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
	controllers: [UatEqfxScoreInclusionController],
	providers: [UatEqfxScoreInclusionService],
	imports: [TypeOrmModule.forFeature([UatEqfxScoreInclusion]), AuthModule],
	exports: [UatEqfxScoreInclusionService]
})
export class UatEqfxScoreInclusionModule { }