import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Logger } from '@nestjs/common';
import { CreateUserRolesWebDto } from './dto/create-user-roles-web.dto';
import { UpdateUserRolesWebDto } from './dto/update-user-roles-web.dto';
import { UserRolesWeb } from './entities/user-roles-web.entity';
@Injectable()
export class UserRolesWebService {
  private readonly logger = new Logger('CreTipodocumentoService');
  constructor(
    @InjectRepository(UserRolesWeb)
    private userRolesWebRepository: Repository<UserRolesWeb>,
  ) {}
  async create(createUserRolesWebDto: CreateUserRolesWebDto) {
    return  this.userRolesWebRepository.save(createUserRolesWebDto).catch((error) => {
      this.handleDBExceptions(error);
    });
  }

  findAll() {
    return  this.userRolesWebRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} userRolesWeb`;
  }

  update(id: number, updateUserRolesWebDto: UpdateUserRolesWebDto) {
    return `This action updates a #${id} userRolesWeb`;
  }

  remove(id: number) {
    return `This action removes a #${id} userRolesWeb`;
  }

   private handleDBExceptions(error: any) {
      if (error.code === '23505') {
        throw new BadRequestException(error.detail);
      }
  
      this.logger.error(error);
      throw new InternalServerErrorException('Error al guardar los datos');
    }
}
