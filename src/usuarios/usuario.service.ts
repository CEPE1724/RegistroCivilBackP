import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Like, Not, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Usuario } from './usuario.entity';
import { not } from 'joi';
import { Console } from 'console';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) {}

  async findByNombre(Nombre: string): Promise<Usuario | string> {
    const nombresBloqueados = ['CDCAJA', 'FNCAJA', 'I3CAJA', 'OTCAJA', 'QVCAJA', 'R4CAJA', 'RECAJA'];
    if (nombresBloqueados.includes(Nombre)) {
      return 'El usuario está bloqueado';
    }
    const usuario = await this.usuarioRepository.findOne({
      where: {
        Nombre: Nombre,
      },
    });
    if (!usuario) {
      return 'Usuario no encontrado';
    }
    if (![1, 18, 16, 17, 22].includes(usuario.idGrupo)) {
      return 'El usuario no pertenece a un grupo permitido';
    }
    return usuario;
  }
  async findAll(): Promise<Usuario[]> {
    return await this.usuarioRepository.find({
      where: { idGrupo: In([1, 18, 16, 17 , 22, 11])},
    });
  }


  async findAllAnalistas(Filtro: any): Promise<Usuario[]> {
    console.log('Filtro', Filtro);
    return await this.usuarioRepository.find({
      where: {
        Nombre: Like(`%${Filtro}%`),  // Simula el LIKE de SQL
        idGrupo: Not(In([36])),        // Excluye los usuarios cuyo idGrupo es 36
      },
    });
  }

  async findByGrupoId(idGrupo: number): Promise<Partial<Usuario>[]> {
	return await this.usuarioRepository.find({
	  select: ['idUsuario', 'Nombre', 'idGrupo'],
	  where: { idGrupo: idGrupo },
	});
  }
  

  async validatePassword(plainTextPassword: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(plainTextPassword, hashedPassword);
  }

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(password, salt);
  }

/*   async createUsuario(Nombre: string, password: string): Promise<Usuario> {
    const hashedPassword = await this.hashPassword(password);
    const newUser = this.usuarioRepository.create({
      Nombre,
      Clave: hashedPassword,
    });
    return this.usuarioRepository.save(newUser);
  } */
}
