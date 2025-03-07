import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Logger } from '@nestjs/common';
import { CreateRouteswebDto } from './dto/create-routesweb.dto';
import { UpdateRouteswebDto } from './dto/update-routesweb.dto';
import { Routesweb } from './entities/routesweb.entity';
@Injectable()
export class RouteswebService {
  private readonly logger = new Logger('CreTipodocumentoService');
  constructor(
    @InjectRepository(Routesweb)
    private routeswebRepository: Repository<Routesweb>,
  ) {}
  async create(createRouteswebDto: CreateRouteswebDto) {
    return this.routeswebRepository.save(createRouteswebDto).catch((error) => {
      this.handleDBExceptions(error);
    });
  }

  findAll() {
    return  this.routeswebRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} routesweb`;
  }

  update(id: number, updateRouteswebDto: UpdateRouteswebDto) {
    return `This action updates a #${id} routesweb`;
  }

  remove(id: number) {
    return `This action removes a #${id} routesweb`;
  }

   private handleDBExceptions(error: any) {
      if (error.code === '23505') {
        throw new BadRequestException(error.detail);
      }
  
      this.logger.error(error);
      throw new InternalServerErrorException('Error al guardar los datos');
    }
}
