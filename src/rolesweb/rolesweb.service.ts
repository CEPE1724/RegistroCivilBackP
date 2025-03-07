import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Logger } from '@nestjs/common';
import { CreateRoleswebDto } from './dto/create-rolesweb.dto';
import { UpdateRoleswebDto } from './dto/update-rolesweb.dto';
import { Rolesweb } from './entities/rolesweb.entity';
@Injectable()
export class RoleswebService {
  private readonly logger = new Logger('CreTipodocumentoService');
  constructor(
    @InjectRepository(Rolesweb)
    private roleswebRepository: Repository<Rolesweb>,
  ) {}
  async create(createRoleswebDto: CreateRoleswebDto) {
    return  this.roleswebRepository.save(createRoleswebDto).catch((error) => {
      this.handleDBExceptions(error);
    });
  }

  findAll() {
    return  this.roleswebRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} rolesweb`;
  }

  update(id: number, updateRoleswebDto: UpdateRoleswebDto) {
    return `This action updates a #${id} rolesweb`;
  }

  remove(id: number) {
    return `This action removes a #${id} rolesweb`;
  }
   private handleDBExceptions(error: any) {
      if (error.code === '23505') {
        throw new BadRequestException(error.detail);
      }
  
      this.logger.error(error);
      throw new InternalServerErrorException('Error al guardar los datos');
    }
}
