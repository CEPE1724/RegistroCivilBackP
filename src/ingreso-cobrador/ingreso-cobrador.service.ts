import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { CreateIngresoCobradorDto } from './dto/create-ingreso-cobrador.dto';
import { UpdateIngresoCobradorDto } from './dto/update-ingreso-cobrador.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IngresoCobrador } from './entities/ingreso-cobrador.entity';

@Injectable()
export class IngresoCobradorService {

	private readonly logger = new Logger('IngresoCobradorService')

	constructor(
		@InjectRepository(IngresoCobrador)
		private readonly ingresoCobradorRepository: Repository<IngresoCobrador>,
	) {}

  findAll() {
    return  this.ingresoCobradorRepository.find();
  }

  private handleDBException(error: any) {
	   if (error.code === '23505') {
		 throw new BadRequestException(error.detail);
	   }
	   this.logger.error(error);
	   throw new InternalServerErrorException('Unexpected error');
   
	 }
}
