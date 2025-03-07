import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Logger } from '@nestjs/common';
import { CreatePermissionsWebDto } from './dto/create-permissions-web.dto';
import { UpdatePermissionsWebDto } from './dto/update-permissions-web.dto';
import { PermissionsWeb } from './entities/permissions-web.entity';
@Injectable()
export class PermissionsWebService {
  private readonly logger = new Logger('CreTipodocumentoService');
  constructor(
    @InjectRepository(PermissionsWeb)
    private permissionsWebRepository: Repository<PermissionsWeb>,
  ) {}
  
  async create(createPermissionsWebDto: CreatePermissionsWebDto) {
    return this.permissionsWebRepository.save(createPermissionsWebDto).catch((error) => {
      this.handleDBExceptions(error
      );
    });

  }

  findAll() {
    return  this.permissionsWebRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} permissionsWeb`;
  }

  update(id: number, updatePermissionsWebDto: UpdatePermissionsWebDto) {
    return `This action updates a #${id} permissionsWeb`;
  }

  remove(id: number) {
    return `This action removes a #${id} permissionsWeb`;
  }
   private handleDBExceptions(error: any) {
      if (error.code === '23505') {
        throw new BadRequestException(error.detail);
      }
  
      this.logger.error(error);
      throw new InternalServerErrorException('Error al guardar los datos');
    }
}
