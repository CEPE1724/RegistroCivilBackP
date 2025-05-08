import { Module } from '@nestjs/common';
import { EqfxAnalisisSaldoVencerService } from './eqfx-analisis-saldo-vencer.service';
import { EqfxAnalisisSaldoVencerController } from './eqfx-analisis-saldo-vencer.controller';
import { EqfxAnalisisSaldoVencer } from './entities/eqfx-analisis-saldo-vencer.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [EqfxAnalisisSaldoVencerController],
  providers: [EqfxAnalisisSaldoVencerService],
  imports: [TypeOrmModule.forFeature([EqfxAnalisisSaldoVencer]) , AuthModule],
  exports: [EqfxAnalisisSaldoVencerService],
})
export class EqfxAnalisisSaldoVencerModule {}
