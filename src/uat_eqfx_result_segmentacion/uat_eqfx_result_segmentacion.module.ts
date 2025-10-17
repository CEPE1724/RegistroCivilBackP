import { Module } from '@nestjs/common';
import { UatEqfxResultSegmentacionService } from './uat_eqfx_result_segmentacion.service';
import { UatEqfxResultSegmentacionController } from './uat_eqfx_result_segmentacion.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UatEqfxResultSegmentacion } from './entities/uat_eqfx_result_segmentacion.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
	controllers: [UatEqfxResultSegmentacionController],
	providers: [UatEqfxResultSegmentacionService],
	imports: [TypeOrmModule.forFeature([UatEqfxResultSegmentacion]), AuthModule],
	exports: [UatEqfxResultSegmentacionService]
})
export class UatEqfxResultSegmentacionModule { }
