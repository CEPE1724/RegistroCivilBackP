import { Module } from '@nestjs/common';
import { CboScoreResultadoService } from './cbo-score-resultado.service';
import { CboScoreResultadoController } from './cbo-score-resultado.controller';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CboScoreResultado } from './entities/cbo-score-resultado.entity';
@Module({
  imports: [TypeOrmModule.forFeature([CboScoreResultado]), AuthModule],
  controllers: [CboScoreResultadoController],
  providers: [CboScoreResultadoService],
})
export class CboScoreResultadoModule {}
