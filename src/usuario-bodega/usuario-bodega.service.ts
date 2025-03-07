import { Injectable } from '@nestjs/common';
import { CreateUsuarioBodegaDto } from './dto/create-usuario-bodega.dto';
import { UpdateUsuarioBodegaDto } from './dto/update-usuario-bodega.dto';

@Injectable()
export class UsuarioBodegaService {
  create(createUsuarioBodegaDto: CreateUsuarioBodegaDto) {
    return 'This action adds a new usuarioBodega';
  }

  findAll() {
    return `This action returns all usuarioBodega`;
  }

  findOne(id: number) {
    return `This action returns a #${id} usuarioBodega`;
  }

  update(id: number, updateUsuarioBodegaDto: UpdateUsuarioBodegaDto) {
    return `This action updates a #${id} usuarioBodega`;
  }

  remove(id: number) {
    return `This action removes a #${id} usuarioBodega`;
  }
}
