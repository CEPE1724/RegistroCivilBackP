import { Module } from '@nestjs/common';
import { CboScoresCobranzaService } from './cbo-scores-cobranza.service';
import { CboScoresCobranzaController } from './cbo-scores-cobranza.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CboScoresCobranza } from './entities/cbo-scores-cobranza.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CboScoresCobranza])],
  controllers: [CboScoresCobranzaController],
  providers: [CboScoresCobranzaService],
})
export class CboScoresCobranzaModule {}
