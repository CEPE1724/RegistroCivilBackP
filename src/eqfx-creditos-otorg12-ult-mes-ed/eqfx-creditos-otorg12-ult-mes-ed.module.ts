import { Module } from '@nestjs/common';
import { EqfxCreditosOtorg12UltMesEdService } from './eqfx-creditos-otorg12-ult-mes-ed.service';
import { EqfxCreditosOtorg12UltMesEdController } from './eqfx-creditos-otorg12-ult-mes-ed.controller';
import { EqfxCreditosOtorg12UltMesEd } from './entities/eqfx-creditos-otorg12-ult-mes-ed.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [EqfxCreditosOtorg12UltMesEdController],
  providers: [EqfxCreditosOtorg12UltMesEdService],
  imports: [TypeOrmModule.forFeature([EqfxCreditosOtorg12UltMesEd]) , AuthModule],
  exports: [EqfxCreditosOtorg12UltMesEdService],
})
export class EqfxCreditosOtorg12UltMesEdModule {}
