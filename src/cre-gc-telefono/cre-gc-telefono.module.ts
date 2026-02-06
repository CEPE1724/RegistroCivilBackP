import { Module } from '@nestjs/common';
import { CreGcTelefonoService } from './cre-gc-telefono.service';
import { CreGcTelefonoController } from './cre-gc-telefono.controller';

@Module({
  controllers: [CreGcTelefonoController],
  providers: [CreGcTelefonoService],
})
export class CreGcTelefonoModule {}
