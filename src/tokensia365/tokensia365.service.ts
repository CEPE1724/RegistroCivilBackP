import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { CreateTokensia365Dto } from './dto/create-tokensia365.dto';
import { UpdateTokensia365Dto } from './dto/update-tokensia365.dto';
import { Tokensia365 } from './entities/tokensia365.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


@Injectable() 
export class Tokensia365Service {
  private readonly logger = new Logger('Tokensia365Service');

  constructor(
    @InjectRepository(Tokensia365)
    private readonly tokensia365Repository: Repository<Tokensia365>,
  ) { }

  async create(createTokensia365Dto: CreateTokensia365Dto): Promise<Tokensia365> {
    try {
      const token = this.tokensia365Repository.create(createTokensia365Dto);
      return await this.tokensia365Repository.save(token);

    } catch (error) {
      this.logger.error('❌ Error al crear/actualizar token', error.stack);
      throw new InternalServerErrorException('Error al guardar el token en la base de datos');
    }
  }

  async findAll(): Promise<{ TokenValido: boolean; Token: string  }> {
    // hora actualñ ecuador
    const ahora = new Date();
    this.logger.log(`⏰ Hora actual: ${ahora.toISOString()}`);
    const tokens = await this.tokensia365Repository.find();
    // obtener el campo tkn_fecha_vencimiento del ultimo token ordenado por fecha sistemas order by desc y devolver solo ese campo
    const ultimoToken = tokens.sort((a, b) => b.tkn_fecha_vencimiento.getTime() - a.tkn_fecha_vencimiento.getTime())[0];
    const fechaVencimiento = ultimoToken?.tkn_fecha_vencimiento;
    this.logger.log(`📅 Último token: ${ultimoToken ? JSON.stringify(ultimoToken) : 'No hay tokens guardados'}`);

    let TokenValido = false;
    // validar la fecha de vencimiento del token con la fecha actual
    if (fechaVencimiento) {
      this.logger.log(`📅 Fecha de vencimiento del token: ${fechaVencimiento.toISOString()}`)
      if (fechaVencimiento > ahora) {
        this.logger.log('✅ El token es válido');
        TokenValido = true;
      }
      else {
        this.logger.warn('⚠️ El token ha expirado');
        TokenValido = false;
      }
    } else {
      this.logger.warn('⚠️ No se encontró la fecha de vencimiento del token');
      TokenValido = false;
    }

    return { TokenValido, Token: ultimoToken?.tkn_token  };
  }


}