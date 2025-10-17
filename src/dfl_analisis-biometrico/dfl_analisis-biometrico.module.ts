import { Module } from '@nestjs/common';
import { DflAnalisisBiometricoService } from './dfl_analisis-biometrico.service';
import { DflAnalisisBiometricoController } from './dfl_analisis-biometrico.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DflAnalisisBiometrico } from './entities/dfl_analisis-biometrico.entity';
  
@Module({
  imports: [TypeOrmModule.forFeature([DflAnalisisBiometrico])],
  controllers: [DflAnalisisBiometricoController],
  providers: [DflAnalisisBiometricoService],
})
export class DflAnalisisBiometricoModule {}
