import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Logger } from '@nestjs/common';
import { CreateRolePermissionsWebDto } from './dto/create-role-permissions-web.dto';
import { UpdateRolePermissionsWebDto } from './dto/update-role-permissions-web.dto';
import { RolePermissionsWeb } from './entities/role-permissions-web.entity';
@Injectable()
export class RolePermissionsWebService {
  private readonly logger = new Logger('CreTipodocumentoService');
  constructor(
    @InjectRepository(RolePermissionsWeb)
    private rolePermissionsWebRepository: Repository<RolePermissionsWeb>,
  ) {}
  async create(createRolePermissionsWebDto: CreateRolePermissionsWebDto) {
    return this.rolePermissionsWebRepository.save(createRolePermissionsWebDto).catch((error) => {
      this.handleDBExceptions(error);
    });
  }

  findAll() {
    return  this.rolePermissionsWebRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} rolePermissionsWeb`;
  }

  update(id: number, updateRolePermissionsWebDto: UpdateRolePermissionsWebDto) {
    return `This action updates a #${id} rolePermissionsWeb`;
  }

  remove(id: number) {
    return `This action removes a #${id} rolePermissionsWeb`;
  }
   private handleDBExceptions(error: any) {
      if (error.code === '23505') {
        throw new BadRequestException(error.detail);
      }
  
      this.logger.error(error);
      throw new InternalServerErrorException('Error al guardar los datos');
    }
}
