import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UatEqfxScoreSobreendeudamientoService } from './uat_eqfx_score_sobreendeudamiento.service';
import { Auth } from 'src/auth/decorators';


@Controller('uatEqfxScoreSobreendeudamiento')
export class UatEqfxScoreSobreendeudamientoController {
  constructor(private readonly uatEqfxScoreSobreendeudamientoService: UatEqfxScoreSobreendeudamientoService) {}



  @Get(':idEqfx')
  @Auth()
  findAll(@Param('idEqfx') idEqfx: string) {
    return this.uatEqfxScoreSobreendeudamientoService.findAll(+idEqfx);
  }

  @Get(':idEqfx')
  @Auth() 
  findOne(@Param('idEqfx') idEqfx: string) {
    return this.uatEqfxScoreSobreendeudamientoService.findOne(+idEqfx);
  }
}
