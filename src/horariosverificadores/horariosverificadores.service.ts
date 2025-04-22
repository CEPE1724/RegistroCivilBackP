import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateHorariosverificadoresDto } from './dto/create-horariosverificadores.dto';
import { UpdateHorariosverificadoresDto } from './dto/update-horariosverificadores.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Horariosverificadores } from './entities/horariosverificadores.entity';

@Injectable()
export class HorariosverificadoresService {
  private readonly logger = new Logger('DetalleTipoClienteService');

  constructor(
    @InjectRepository(Horariosverificadores)
    private readonly horariosverificadorRepository: Repository<Horariosverificadores>
  ) {}

  create(createHorariosverificadorDto: CreateHorariosverificadoresDto) {
    // si esiste un registro con idVerificadorCredito, hora, dia y estado = 1, no se puede crear y se actualiza el registro
    // si no existe se crea el registro
	console.log(createHorariosverificadorDto);
    this.horariosverificadorRepository.findOne({
      where: {
        idVerificadorCredito: createHorariosverificadorDto.idVerificadorCredito,
        hora: createHorariosverificadorDto.hora,
        Dia: createHorariosverificadorDto.Dia,
        idFechaVerificador: createHorariosverificadorDto.idFechaVerificador
      }
    }).then((horario) => {
      if (horario) {
        this.horariosverificadorRepository.update(
          horario.idHorariosVerificador,
          {
            Estado: createHorariosverificadorDto.Estado,
            iEstado: createHorariosverificadorDto.iEstado
          }
        );
      } else {
        this.horariosverificadorRepository.save(createHorariosverificadorDto);
      }
    });
  }

  findAll() {
    return `This action returns all horariosverificadores`;
  }

  findOne(id: number) {
    return `This action returns a #${id} horariosverificador`;
  }

  async getFechaVerificador(
    idVerificadorCredito: number,
    idFechaVerificador: number
  ): Promise<any> {
    const query = `
      EXEC spWEBObtenerFechaVerificador 
        @idVerificadorCredito = ${idVerificadorCredito}, 
        @idFechaVerificador = ${idFechaVerificador}
    `;

    const result = await this.horariosverificadorRepository.query(query);

    if (!result || result.length === 0) {
      throw new NotFoundException(
        `No se encontró información para idVerificadorCredito ${idVerificadorCredito} y idFechaVerificador ${idFechaVerificador}`
      );
    }
    return result;
  }

  update(id: number, updateHorariosverificadorDto: UpdateHorariosverificadoresDto) {
    return `This action updates a #${id} horariosverificador`;
  }

  remove(id: number) {
    return `This action removes a #${id} horariosverificador`;
  }
}