import { Injectable } from '@nestjs/common';
import { CreateListacuentasdepositoDto } from './dto/create-listacuentasdeposito.dto';
import { UpdateListacuentasdepositoDto } from './dto/update-listacuentasdeposito.dto';

@Injectable()
export class ListacuentasdepositosService {
  create(createListacuentasdepositoDto: CreateListacuentasdepositoDto) {
    return 'This action adds a new listacuentasdeposito';
  }

  findAll() {
    return `This action returns all listacuentasdepositos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} listacuentasdeposito`;
  }

  update(id: number, updateListacuentasdepositoDto: UpdateListacuentasdepositoDto) {
    return `This action updates a #${id} listacuentasdeposito`;
  }

  remove(id: number) {
    return `This action removes a #${id} listacuentasdeposito`;
  }
}
