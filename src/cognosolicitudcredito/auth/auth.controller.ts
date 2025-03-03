import { Body, Controller, Post, Param } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('cogno/token/:cedula')
    async login(@Param('cedula') cedula: string) {
        console.log('Cedula recibida:', cedula);

        const token = await this.authService.getToken(cedula);


        const apiData = await this.authService.getApiData(token, cedula);

        const saveData = await this.authService.create(apiData);
        console.log('saveData', saveData);
        const saveDataNatural = await this.authService.createNatural(apiData, saveData.idCognoSolicitudCredito, 0);

        if (apiData.personaNaturalConyuge.personaConyuge.identificacion && apiData.personaNaturalConyuge.personaConyuge.nombre) {
            if (apiData.personaNaturalConyuge.personaConyuge.identificacion !== null && apiData.personaNaturalConyuge.personaConyuge.identificacion !== '' &&
                apiData.personaNaturalConyuge.personaConyuge.nombre !== null && apiData.personaNaturalConyuge.personaConyuge.nombre !== '') {
                    console.log('saveData.idCognoSolicitudCredito', saveData.idCognoSolicitudCredito);
                 await this.authService.createNaturalConyugue(apiData, saveData.idCognoSolicitudCredito, 1);
            }
        }

        await this.authService.createLugarNacimiento(apiData, saveData.idCognoSolicitudCredito, 0);
        
        // domicilio ocnyuge
        if(apiData.estadoCivil.estadoCivil.descripcion === 'CASADO'){
            console.log('conyugue');
            await this.authService.createLugarNacimiento(apiData, saveData.idCognoSolicitudCredito, 1);
            await this.authService.createLugarNacimiento(apiData, saveData.idCognoSolicitudCredito, 2);
        }


        await this.authService.createNacionalidades(apiData, saveData.idCognoSolicitudCredito);


        await this.authService.createProfesiones(apiData, saveData.idCognoSolicitudCredito);

        return { apiData, saveData, saveDataNatural };
    }
}
