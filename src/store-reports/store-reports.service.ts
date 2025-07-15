import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { not } from 'joi';
import { Nomina } from 'src/nomina/entities/nomina.entity';
import { PrinterService } from 'src/printer/printer.service';
import { getHelloWorldReport, orderByIdReports } from 'src/reports';
import { Repository } from 'typeorm';

@Injectable()
export class StoreReportsService {
    private readonly logger = new Logger('CreParroquiaService');
    constructor(
        @InjectRepository(Nomina)
        private readonly NominaRepository: Repository<Nomina>,
        private readonly printerService: PrinterService) { }

    async getOrderReport(orderId: number) {

        const order = await this.NominaRepository.findOneBy({ idNomina: orderId });
        if (!order) {
            this.logger.error(`Order with id ${orderId} not found`);
            throw new NotFoundException(`Order with id ${orderId} not found`);
        }


        const docDefinition = orderByIdReports({
            data: order
        }
        );

        const doc = this.printerService.createPdf(docDefinition);

        return doc;

    }
}
