import { Module } from '@nestjs/common';
import { CboSaldosService } from './cbo-saldos.service';
import { CboSaldosController } from './cbo-saldos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CboSaldo } from './entities/cbo-saldo.entity';
import { AuthModule } from 'src/auth/auth.module';
@Module({
  imports: [TypeOrmModule.forFeature([CboSaldo]), AuthModule],
  controllers: [CboSaldosController],
  providers: [CboSaldosService],
})
export class CboSaldosModule {}
