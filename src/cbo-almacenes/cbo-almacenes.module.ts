import { Module } from '@nestjs/common';
import { CboAlmacenesService } from './cbo-almacenes.service';
import { CboAlmacenesController } from './cbo-almacenes.controller';

@Module({
  controllers: [CboAlmacenesController],
  providers: [CboAlmacenesService],
})
export class CboAlmacenesModule {}
