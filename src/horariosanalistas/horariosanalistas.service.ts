import { Injectable, Logger } from '@nestjs/common';
import { CreateHorariosanalistaDto } from './dto/create-horariosanalista.dto';
import { UpdateHorariosanalistaDto } from './dto/update-horariosanalista.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Horariosanalista } from './entities/horariosanalista.entity';
@Injectable()
export class HorariosanalistasService {
  private readonly logger = new Logger('DetalleTipoClienteService');

  constructor(
    @InjectRepository(Horariosanalista)
    private readonly horariosanalistaRepository: Repository<Horariosanalista>
  ) { }

  create(createHorariosanalistaDto: CreateHorariosanalistaDto) {
    // si esiste un registro con idAnalistaCredito, hora, dia y estado = 1, no se puede crear y se actualiza el registro
    // si no existe se crea el registro
      this.horariosanalistaRepository.findOne({
        where: {
          idAnalistaCredito: createHorariosanalistaDto.idAnalistaCredito,
          Hora: createHorariosanalistaDto.Hora,
          Dia: createHorariosanalistaDto.Dia,
          idFechaAnalista: createHorariosanalistaDto.idFechaAnalista
        }
      }).then((horario) => {
        if (horario) {
             
          this.horariosanalistaRepository.update(horario.idHorariosAnaliSta, 
            { Estado: createHorariosanalistaDto.Estado, iEstado: createHorariosanalistaDto.iEstado });
        } else {
          this.horariosanalistaRepository.save(createHorariosanalistaDto);
        }
      });
  }
        

  findAll() {
    return `This action returns all horariosanalistas`;
  }

  findOne(id: number) {
    return `This action returns a #${id} horariosanalista`;
  }

  update(id: number, updateHorariosanalistaDto: UpdateHorariosanalistaDto) {
    return `This action updates a #${id} horariosanalista`;
  }

  remove(id: number) {
    return `This action removes a #${id} horariosanalista`;
  }
}
