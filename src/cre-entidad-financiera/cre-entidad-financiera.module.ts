import { Module } from '@nestjs/common';
import { CreEntidadFinancieraService } from './cre-entidad-financiera.service';
import { CreEntidadFinancieraController } from './cre-entidad-financiera.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreEntidadFinanciera } from './entities/cre-entidad-financiera.entity';
import { AuthModule } from 'src/auth/auth.module';
@Module({
  imports: [TypeOrmModule.forFeature([CreEntidadFinanciera]), AuthModule],
  controllers: [CreEntidadFinancieraController],
  providers: [CreEntidadFinancieraService],
})
export class CreEntidadFinancieraModule {}
