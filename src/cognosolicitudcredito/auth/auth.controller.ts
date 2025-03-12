import { Body, Controller, Post, Param } from '@nestjs/common';
import { AuthService } from './auth.service';


@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,

    ) { }

    @Post('cogno/token/:cedula/:numberId')
    async login(@Param('cedula') cedula: string,
        @Param('numberId') numberId: number) {
        console.log('Cedula recibida:', cedula);

        const token = await this.authService.getToken(cedula);


        const apiData = await this.authService.getApiData(token, cedula);

        /* apí trabajo*/
        const apiDataTrabajo = await this.authService.getApiDataTrabajo(token, cedula);
        let bApiDataTrabajo = false;
        /* si apiDataTrabajo tiene datos  true caso contrario false */
        if (apiDataTrabajo.trabajos) {
            if (apiDataTrabajo.trabajos.length > 0) {
                bApiDataTrabajo = true;
            } else {
                bApiDataTrabajo = false;
            }
        }

        const saveData = await this.authService.create(apiData, bApiDataTrabajo, numberId);


        const saveDataNatural = await this.authService.createNatural(apiData, saveData.idCognoSolicitudCredito, 0);

        if (apiData.personaNaturalConyuge.personaConyuge.identificacion && apiData.personaNaturalConyuge.personaConyuge.nombre) {
            if (apiData.personaNaturalConyuge.personaConyuge.identificacion !== null && apiData.personaNaturalConyuge.personaConyuge.identificacion !== '' &&
                apiData.personaNaturalConyuge.personaConyuge.nombre !== null && apiData.personaNaturalConyuge.personaConyuge.nombre !== '') {
                console.log('saveData.idCognoSolicitudCredito', saveData.idCognoSolicitudCredito);
                await this.authService.createNaturalConyugue(apiData, saveData.idCognoSolicitudCredito, 1);
            }
        }

        // crear lugar de nacimiento validar qu eno sea null ytenga datos
        if (apiData.personaNatural.lugarNacimiento !== null && apiData.personaNatural.lugarNacimiento !== '') {
            console.log('saveData.idCognoSolicitudCredito', saveData.idCognoSolicitudCredito);
            await this.authService.createLugarNacimiento(apiData, saveData.idCognoSolicitudCredito, 0);
        }

        // domicilio ocnyuge
        if (apiData.estadoCivil.estadoCivil.descripcion === 'CASADO') {
            await this.authService.createLugarNacimiento(apiData, saveData.idCognoSolicitudCredito, 1);
            await this.authService.createLugarNacimiento(apiData, saveData.idCognoSolicitudCredito, 2);
        }


        await this.authService.createNacionalidades(apiData, saveData.idCognoSolicitudCredito);


        await this.authService.createProfesiones(apiData, saveData.idCognoSolicitudCredito);

        if (bApiDataTrabajo && apiDataTrabajo.trabajos.personaPatrono && apiDataTrabajo.trabajos.personaPatrono.identificacion) {

            await this.authService.createTrabajo(apiDataTrabajo, saveData.idCognoSolicitudCredito);
        }

        return { apiData, saveData, saveDataNatural };
    }
}
