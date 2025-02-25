import { Injectable } from '@nestjs/common';
import { CreateCognosolicitudcreditoDto } from './dto/create-cognosolicitudcredito.dto';
import { UpdateCognosolicitudcreditoDto } from './dto/update-cognosolicitudcredito.dto';

@Injectable()
export class CognosolicitudcreditoService {
  create(createCognosolicitudcreditoDto: CreateCognosolicitudcreditoDto) {
    return 'This action adds a new cognosolicitudcredito';
  }

  findAll() {
    return `This action returns all cognosolicitudcredito`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cognosolicitudcredito`;
  }

  update(id: number, updateCognosolicitudcreditoDto: UpdateCognosolicitudcreditoDto) {
    return `This action updates a #${id} cognosolicitudcredito`;
  }

  remove(id: number) {
    return `This action removes a #${id} cognosolicitudcredito`;
  }

  auth(body: any) {
    return 'This action returns the auth cognosolicitudcredito';
  }
}
