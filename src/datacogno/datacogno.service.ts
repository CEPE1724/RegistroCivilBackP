import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateDatacognoDto } from './dto/create-datacogno.dto';
import { UpdateDatacognoDto } from './dto/update-datacogno.dto';
import { Repository } from 'typeorm';
import { Datacogno } from './entities/datacogno.entity';

@Injectable()
export class DatacognoService {

  private readonly logger = new Logger('DatacognoService');
  constructor(
    @InjectRepository(Datacogno)
    private readonly datacognoRepository: Repository<Datacogno>
  ) { }

  async create(createDatacognoDto: CreateDatacognoDto) {
    try {

      const datacogno = this.datacognoRepository.create(createDatacognoDto);
      await this.datacognoRepository.save(datacogno);
      return datacogno;
    } catch (error) {
      this.handleDBExceptions(error);
    }

  }

  findAll() {
    return   this.datacognoRepository.find({});
  }

  async findOne(idDataCogno: number) {
    return this.datacognoRepository.findOne({ where: { idDataCogno: idDataCogno } });
  }

  update(id: number, updateDatacognoDto: UpdateDatacognoDto) {
    return `This action updates a #${id} datacogno`;
  }

  remove(id: number) {
    return `This action removes a #${id} datacogno`;
  }

  private handleDBExceptions(error: any) {
    if (error.code === '23505') {
      throw new BadRequestException (error.detail);
    }

    this.logger.error(error);
    throw new InternalServerErrorException('Error al guardar los datos');
  }


}


