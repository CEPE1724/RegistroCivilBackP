import { Module } from '@nestjs/common';
import { ListacuentasdepositosService } from './listacuentasdepositos.service';
import { ListacuentasdepositosController } from './listacuentasdepositos.controller';

@Module({
  controllers: [ListacuentasdepositosController],
  providers: [ListacuentasdepositosService],
})
export class ListacuentasdepositosModule {}
