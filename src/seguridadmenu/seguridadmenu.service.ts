import { Injectable } from '@nestjs/common';


@Injectable()
export class SeguridadmenuService {
 
  findAll() {
    return `This action returns all seguridadmenu`;
  }

  findOne(id: number) {
    return `This action returns a #${id} seguridadmenu`;
  }

 
  remove(id: number) {
    return `This action removes a #${id} seguridadmenu`;
  }
}
