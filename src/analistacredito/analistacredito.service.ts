import { Injectable, Logger } from '@nestjs/common';
import { CreateAnalistacreditoDto } from './dto/create-analistacredito.dto';
import { UpdateAnalistacreditoDto } from './dto/update-analistacredito.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Analistacredito } from './entities/analistacredito.entity';
import { where } from 'sequelize';
@Injectable()
export class AnalistacreditoService {
    private readonly logger = new Logger('AnalistacreditoService');
  
    constructor(
      @InjectRepository(Analistacredito)
      private readonly analistacreditoRepository: Repository<Analistacredito>
    ) { }

    
  async create(createAnalistacreditoDto: CreateAnalistacreditoDto) {
    const existingAnalista = await this.analistacreditoRepository.findOne({
      where: { Nombre: createAnalistacreditoDto.Nombre },
    });

    if (existingAnalista) {
      return { message: 'An analyst with this name already exists.' };
    }

    return this.analistacreditoRepository.save(createAnalistacreditoDto);
  }

  findAll() {
    return this.analistacreditoRepository.find(
      { 
        where: { Estado: 1 },
      });
  }

  findAllUser(igrupo: number, analista: string) {

    if( igrupo == 1)
    {
      return this.analistacreditoRepository.find(
        { 
          where: { Estado: 1 },
        });
    }else
    {
      return this.analistacreditoRepository.find(
        { 
          where: { Estado: 1,  Nombre: analista },
        });
    }

  }

  findOne(id: number) {
    return `This action returns a #${id} analistacredito`;
  }

  update(id: number, updateAnalistacreditoDto: UpdateAnalistacreditoDto) {
    return `This action updates a #${id} analistacredito`;
  }

  remove(id: number) {
    return `This action removes a #${id} analistacredito`;
  }
}
