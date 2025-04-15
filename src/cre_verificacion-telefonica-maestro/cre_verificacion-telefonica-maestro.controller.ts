import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreVerificacionTelefonicaMaestroService } from './cre_verificacion-telefonica-maestro.service';
import { CreateCreVerificacionTelefonicaMaestroDto } from './dto/create-cre_verificacion-telefonica-maestro.dto';
import { UpdateCreVerificacionTelefonicaMaestroDto } from './dto/update-cre_verificacion-telefonica-maestro.dto';

@Controller('cre-verificacion-telefonica-maestro')
export class CreVerificacionTelefonicaMaestroController {
  constructor(private readonly creVerificacionTelefonicaMaestroService: CreVerificacionTelefonicaMaestroService) {}

   @Get(':idCre_SolicitudWeb')
   async findByID(@Param('idCre_SolicitudWeb') idCre_VerificacionTelefonica: string) {
      return await this.creVerificacionTelefonicaMaestroService.findByID(Number(idCre_VerificacionTelefonica));
    }
}
