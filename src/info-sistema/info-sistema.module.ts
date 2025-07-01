import { Module } from '@nestjs/common';
import { InfoSistemaService } from './info-sistema.service';
import { InfoSistemaController } from './info-sistema.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InfoSistema } from './entities/info-sistema.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([InfoSistema]), AuthModule ],
  controllers: [InfoSistemaController],
  providers: [InfoSistemaService],
  exports: [InfoSistemaService], 
})
export class InfoSistemaModule {}