import { Injectable } from '@nestjs/common';
import { CreateCreGcTelefonoDto } from './dto/create-cre-gc-telefono.dto';
import { UpdateCreGcTelefonoDto } from './dto/update-cre-gc-telefono.dto';

@Injectable()
export class CreGcTelefonoService {
  create(createCreGcTelefonoDto: CreateCreGcTelefonoDto) {
    return 'This action adds a new creGcTelefono';
  }

  findAll() {
    return `This action returns all creGcTelefono`;
  }

  findOne(id: number) {
    return `This action returns a #${id} creGcTelefono`;
  }

  update(id: number, updateCreGcTelefonoDto: UpdateCreGcTelefonoDto) {
    return `This action updates a #${id} creGcTelefono`;
  }

  remove(id: number) {
    return `This action removes a #${id} creGcTelefono`;
  }
}
