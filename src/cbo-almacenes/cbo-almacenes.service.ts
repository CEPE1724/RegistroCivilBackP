import { Injectable } from '@nestjs/common';
import { CreateCboAlmaceneDto } from './dto/create-cbo-almacene.dto';
import { UpdateCboAlmaceneDto } from './dto/update-cbo-almacene.dto';

@Injectable()
export class CboAlmacenesService {
  create(createCboAlmaceneDto: CreateCboAlmaceneDto) {
    return 'This action adds a new cboAlmacene';
  }

  findAll() {
    return `This action returns all cboAlmacenes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cboAlmacene`;
  }

  update(id: number, updateCboAlmaceneDto: UpdateCboAlmaceneDto) {
    return `This action updates a #${id} cboAlmacene`;
  }

  remove(id: number) {
    return `This action removes a #${id} cboAlmacene`;
  }
}
