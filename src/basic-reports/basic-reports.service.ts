import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Nomina } from 'src/nomina/entities/nomina.entity';
import { PrinterService } from 'src/printer/printer.service';
import { getCountryReport, getEmploymentLetterByIdReport, getEmploymentLetterReport, getHelloWorldReport } from 'src/reports';
import { Repository, LessThan } from 'typeorm';


@Injectable()
export class BasicReportsService {

    private readonly logger = new Logger('CreParroquiaService');
    constructor(
        @InjectRepository(Nomina)
        private readonly NominaRepository: Repository<Nomina>,
        private readonly printerService: PrinterService,
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

}
