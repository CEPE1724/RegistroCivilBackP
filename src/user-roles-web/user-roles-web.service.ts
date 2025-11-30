import { BadRequestException, Injectable, InternalServerErrorException, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Logger } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { CreateUserRolesWebDto } from './dto/create-user-roles-web.dto';
import { UpdateUserRolesWebDto } from './dto/update-user-roles-web.dto';
import { UserRolesWeb } from './entities/user-roles-web.entity';

@Injectable()
export class UserRolesWebService {
  private readonly logger = new Logger('CreTipodocumentoService');
  constructor(
    @InjectRepository(UserRolesWeb)
    private userRolesWebRepository: Repository<UserRolesWeb>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async create(createUserRolesWebDto: CreateUserRolesWebDto) {
    const result = await this.userRolesWebRepository.save(createUserRolesWebDto).catch((error) => {
      this.handleDBExceptions(error);
    });
    
    await this.cacheManager.del('user-roles-web:all');
    return result;
  }

  async findAll() {
    const cacheKey = 'user-roles-web:all';
    const cached = await this.cacheManager.get<UserRolesWeb[]>(cacheKey);
    
    if (cached) 
    {
      this.logger.log(`✅ CACHE HIT - Datos obtenidos desde Redis para: ${cacheKey}`);
      return cached;
    }
    this.logger.log(`❌ CACHE MISS - Consultando base de datos para: ${cacheKey}`); 
    
    const data = await this.userRolesWebRepository.find();
    await this.cacheManager.set(cacheKey, data, 1800000); // 30 min
    
    return data;
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
