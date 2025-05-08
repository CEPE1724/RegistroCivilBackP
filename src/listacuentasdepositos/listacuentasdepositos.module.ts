import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { ListacuentasdepositosService } from './listacuentasdepositos.service';
import { ListacuentasdepositosController } from './listacuentasdepositos.controller';

@Module({
  controllers: [ListacuentasdepositosController],
  providers: [ListacuentasdepositosService],
  imports: [AuthModule],
})
export class ListacuentasdepositosModule {}
