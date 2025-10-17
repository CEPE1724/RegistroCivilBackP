import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Nomina } from 'src/nomina/entities/nomina.entity';
import { PrinterService } from 'src/printer/printer.service';
import { getCountryReport, getEmploymentLetterByIdReport, getEmploymentLetterReport, getHelloWorldReport, CreditoDirectoReport } from 'src/reports';
import { Repository, LessThan } from 'typeorm';
import { WebSolicitudgrande } from 'src/web_solicitudgrande/entities/web_solicitudgrande.entity';
import { CreReferenciasclientesweb } from 'src/cre-referenciasclientesweb/entities/cre-referenciasclientesweb.entity'
import { CreNacionalidad } from 'src/cre_nacionalidad/entities/cre_nacionalidad.entity'
import { Bodega } from 'src/Bodega/Bodega.entity'
import { CreProvincia } from 'src/cre_provincia/entities/cre_provincia.entity'
import { CreCanton } from 'src/cre-canton/entities/cre-canton.entity'
import { CreActividadeconomina } from 'src/cre_actividadeconomina/entities/cre_actividadeconomina.entity'
import { CreParroquia } from 'src/cre_parroquia/entities/cre_parroquia.entity'
import { CreBarrio } from 'src/cre_barrio/entities/cre_barrio.entity'
import { CreProfesion } from 'src/cre_profesion/entities/cre_profesion.entity'
import { Compra } from '../compra/entities/compra.entity'



@Injectable()
export class BasicReportsService {

    private readonly logger = new Logger('CreParroquiaService');
    constructor(
        @InjectRepository(Nomina)
        private readonly NominaRepository: Repository<Nomina>,
        private readonly printerService: PrinterService,

		@InjectRepository(WebSolicitudgrande)
		private readonly webSolicitudGrandeRepository: Repository<WebSolicitudgrande>,

		@InjectRepository(CreReferenciasclientesweb)
		private readonly CreReferenciasclienteswebRepository: Repository<CreReferenciasclientesweb>,

		@InjectRepository(CreNacionalidad)
		private readonly CreNacionalidadRepository: Repository<CreNacionalidad>,

		@InjectRepository(Bodega)
		private readonly BodegaRepository: Repository<Bodega>,

		@InjectRepository(CreProvincia)
		private readonly CreProvinciaRepository: Repository<CreProvincia>,

		@InjectRepository(CreCanton)
		private readonly CreCantonRepository: Repository<CreCanton>,

		@InjectRepository(CreActividadeconomina)
		private readonly CreActividadeconominaRepository: Repository<CreActividadeconomina>,

		@InjectRepository(CreParroquia)
		private readonly CreParroquiaRepository: Repository<CreParroquia>,

		@InjectRepository(CreBarrio)
		private readonly CreBarrioRepository: Repository<CreBarrio>,

		@InjectRepository(CreProfesion)
		private readonly CreProfesionRepository: Repository<CreProfesion>,

		@InjectRepository(Compra)
		private readonly CompraRepository: Repository<Compra>
		
    ) {

    }

    /* depslegar nomina*/
    hello() {

        const docDefinition = getHelloWorldReport({
            name: 'BERNABE'
        });

        const doc = this.printerService.createPdf(docDefinition);
        return doc;

    }

    employmentletter() {

        const docDefinition = getEmploymentLetterReport();

        const doc = this.printerService.createPdf(docDefinition);
        return doc;

    }

    async employmentletterById(idNomina: number) {
        const nomina = await this.NominaRepository.findOneBy({ idNomina });
        if (!nomina) {
            this.logger.error(`Nomina with id ${idNomina} not found`);
            throw new NotFoundException(`Nomina with id ${idNomina} not found`);
        }
        const docDefinition = getEmploymentLetterByIdReport({
            employerName: nomina.ApellidoMaterno,
            employerPosition: nomina.ApellidoPaterno,
            companyName: nomina.PrimerNombre,
            employeeName: nomina.SegundoNombre

        });

        const doc = this.printerService.createPdf(docDefinition);
        return doc;

    }

    async getCountries() {
        const nomina = await this.NominaRepository.find({
            where: {
                idNomina: LessThan(100)
            },
        });
        const docDefinition = getCountryReport({nomina: nomina});

        const doc = this.printerService.createPdf(docDefinition);
        return doc;
    }

	async getCredDirectoReport( idCre_SolicitudWeb: number) {
		const webSoliGra = await this.webSolicitudGrandeRepository.findOneBy({ idCre_SolicitudWeb });
		const refer = await this.CreReferenciasclienteswebRepository.findBy({ idCre_SolicitudWeb });
		const nacionalidades = await this.CreNacionalidadRepository.find();
		const local = await this.BodegaRepository.findOneBy({Bodega: webSoliGra.Bodega});
		const actEconomica = await this.CreActividadeconominaRepository.find()
		const provincias = await this.CreProvinciaRepository.find();
		const cantones = await this.CreCantonRepository.find();
		const parroquias = await this.CreParroquiaRepository.find();
		const barrios = await this.CreBarrioRepository.find();
		const profesiones = await this.CreProfesionRepository.find()
		const infoCompra = await this.CompraRepository.findOneBy({idCre_SolicitudWeb, idTipoFactura: 1 })


		if (!webSoliGra) {
            this.logger.error(`Solicitud Grande with id ${idCre_SolicitudWeb} not found`);
            throw new NotFoundException(`Solicitud Grande with id ${idCre_SolicitudWeb} not found`);
        }

		const docDefinition = CreditoDirectoReport(webSoliGra, refer, nacionalidades, local, actEconomica, provincias, cantones, parroquias, barrios, profesiones, infoCompra);
		const doc = this.printerService.createPdf(docDefinition);
		return doc;
	}
}
