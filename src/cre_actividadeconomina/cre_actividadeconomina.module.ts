import { Module } from '@nestjs/common';
import { CreActividadeconominaService } from './cre_actividadeconomina.service';
import { CreActividadeconominaController } from './cre_actividadeconomina.controller';
import { CreActividadeconomina } from './entities/cre_actividadeconomina.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
@Module({
  controllers: [CreActividadeconominaController],
  providers: [CreActividadeconominaService],
   imports: [
      TypeOrmModule.forFeature([CreActividadeconomina]),AuthModule
      
   ]
})
export class CreActividadeconominaModule {}
