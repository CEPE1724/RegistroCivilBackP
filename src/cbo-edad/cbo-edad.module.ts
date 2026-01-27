import { Module } from '@nestjs/common';
import { CboEdadService } from './cbo-edad.service';
import { CboEdadController } from './cbo-edad.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CboEdad } from './entities/cbo-edad.entity';
import { AuthModule } from 'src/auth/auth.module';
@Module({
  imports: [TypeOrmModule.forFeature([CboEdad]), AuthModule],
  controllers: [CboEdadController],
  providers: [CboEdadService],
})
export class CboEdadModule {}
