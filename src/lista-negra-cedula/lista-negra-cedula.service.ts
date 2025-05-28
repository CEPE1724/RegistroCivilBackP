import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ListaNegraCedula } from './entities/lista-negra-cedula.entity';
import { CreateListaNegraCedulaDto } from './dto/create-lista-negra-cedula.dto';


@Injectable()
export class ListaNegraCedulaService {
  constructor(
    @InjectRepository(ListaNegraCedula)
    private readonly listaNegraRepo: Repository<ListaNegraCedula>,
  ) {}

  async create(dto: CreateListaNegraCedulaDto): Promise<ListaNegraCedula> {
    if (!dto.Cedula) {
      throw new BadRequestException('La cédula no puede estar vacía');
    }

    if (!/^[0-9]+$/.test(dto.Cedula)) {
      throw new BadRequestException('La cédula solo debe contener dígitos numéricos');
    }

    if (dto.Cedula.length !== 10) {
      throw new BadRequestException('La cédula debe tener exactamente 10 dígitos');
    }

    if (!dto.Observacion) {
      throw new BadRequestException('La observación no puede estar vacía');
    }

    if (dto.Activo === undefined || dto.Activo === null) {
      throw new BadRequestException('El estado Activo es requerido');
    }

    const yaExiste = await this.listaNegraRepo.findOne({
      where: { Cedula: dto.Cedula },
    });

    if (yaExiste) {
      throw new BadRequestException(`La cédula ${dto.Cedula} ya se encuentra en la lista negra`);
    }

    const nuevaEntrada = this.listaNegraRepo.create({
      Cedula: dto.Cedula,
      Observacion: dto.Observacion,
      Activo: dto.Activo,
      Usuario: dto.Usuario,
      FechaSistema: new Date(),
      Estacion: '', // Puedes llenarlo si tienes estación
    });

    return await this.listaNegraRepo.save(nuevaEntrada);
  }

  async findAll(): Promise<ListaNegraCedula[]> {
    return await this.listaNegraRepo.find();
  }

  async findOne(id: number): Promise<ListaNegraCedula> {
    const registro = await this.listaNegraRepo.findOne({ where: { idListaNegraCedula: id } });
    if (!registro) {
      throw new NotFoundException(`Registro con ID ${id} no encontrado`);
    }
    return registro;
  }

  async updateActivo(id: number, nuevoEstado: boolean): Promise<ListaNegraCedula> {
    const registro = await this.findOne(id);
    registro.Activo = nuevoEstado;
    return await this.listaNegraRepo.save(registro);
  }

  async findByCedula(cedula: string): Promise<number> {
    return await this.listaNegraRepo.count({ where: { Cedula: cedula, Activo: true } });
  }

  async remove(id: number): Promise<void> {
    const registro = await this.findOne(id);
    await this.listaNegraRepo.remove(registro);
  }
}
