import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Like, Not, Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Usuario } from './usuario.entity';
import { not } from 'joi';
import { Console } from 'console';
import { InfoSistemaService } from 'src/info-sistema/info-sistema.service';
import { EmailService } from 'src/email/email.service';
import { NominaService } from 'src/nomina/nomina.service';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
    private readonly infoSistemaService: InfoSistemaService, 
    private readonly emailService: EmailService,
    private readonly nominaService: NominaService,
  ) {}

  async findById(idUsuario: number): Promise<Usuario | string> {
	const usuario = await this.usuarioRepository.findOne({
	  where: { idUsuario: idUsuario },
	});
	if (!usuario) {
	  return 'Usuario no encontrado';
	}
	return usuario;
  }

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

    return await this.usuarioRepository.find({
      where: {
        Nombre: Like(`%${Filtro}%`),  // Simula el LIKE de SQL
        idGrupo: Not(In([36])),        // Excluye los usuarios cuyo idGrupo es 36
      },
    });
  }
  async findAllVerificadores(Filtro: any): Promise<Usuario[]> {

    return await this.usuarioRepository.find({
      where: {
        Nombre: Like(`%${Filtro}%`),
        idGrupo: Not(In([36])),
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



 async debeCambiarContrasena(nombreUsuario: string): Promise<boolean> {
    const existe = await this.infoSistemaService.existeIngreso(nombreUsuario);
    return !existe; // si no existe el ingreso, debe cambiar la contraseña
  }

  async registrarAcceso(nombreUsuario: string, direccionIP: string) {
    await this.infoSistemaService.registrarIngreso({
      Usuario: nombreUsuario,
      DireccionIP: direccionIP,
      Estacion: '',
      Versionamiento: '',
    });
  }

  // lógica para cambiar clave y registrar el acceso
async cambiarClave(nombreUsuario: string, nuevaClave: string, direccionIP: string) {
  try {
    console.log('Iniciando cambio de clave para usuario:', nombreUsuario);

    // Obtener el usuario con el campo Clave (que tiene select: false)
    const usuario = await this.usuarioRepository
      .createQueryBuilder('usuario')
      .addSelect('usuario.Clave')
      .where('usuario.Nombre = :nombreUsuario', { nombreUsuario })
      .getOne();

    if (!usuario) {
      console.log('Usuario no encontrado:', nombreUsuario);
      return 'Usuario no encontrado';
    }

    console.log('Usuario encontrado, procediendo a cambiar clave');
    usuario.Clave = nuevaClave;

    // Guardar el nuevo valor en la tabla
    await this.usuarioRepository.save(usuario);
    console.log('Contraseña actualizada en base de datos');

    // Ejecutar procedimiento almacenado después de actualizar
    await this.usuarioRepository.query(
      `EXEC UsuarioModificaClave @Clave = @0, @Usuario = @1`,
      [nuevaClave, nombreUsuario]
    );
    console.log('Procedimiento UsuarioModificaClave ejecutado');

    await this.registrarAcceso(nombreUsuario, direccionIP);
    console.log('Acceso registrado exitosamente');

    return 'Contraseña cambiada, procedimiento ejecutado y acceso registrado';
  } catch (error) {
    console.error('Error en cambiarClave:', error);
    throw error;
  }
}
 


  async recuperarClave(nombreUsuario: string, cedula: string): Promise<string> {
    try {
  
      // 1. Consulta al usuario: select Clave, * from Usuario where Nombre = 'ECEPEDA' AND Activo = 1 AND idGrupo <> 36

      const usuario = await this.usuarioRepository
        .createQueryBuilder('usuario')
        .addSelect('usuario.Clave') // porque está con `select: false`
        .where('usuario.Nombre = :nombreUsuario', { nombreUsuario })
        .andWhere('usuario.Activo = :activo', { activo: true })
        .andWhere('usuario.idGrupo != :grupoExcluido', { grupoExcluido: 36 })
        .getOne();

     

      if (!usuario) {
        console.log('❌ Usuario no válido o inactivo');
        return 'Usuario no válido o inactivo';
      }

 
      const datosNomina = await this.nominaService.findEmailByCodigoAndCedula(nombreUsuario, cedula);

      console.log('Resultado búsqueda nómina:', datosNomina);

      if (!datosNomina) {
        return 'Datos de cédula no coinciden o el usuario está inactivo en nómina';
      }

      if (!datosNomina.EMail) {

        return 'Usuario no tiene email registrado en nómina';
      }

       if (datosNomina.idCom_Estado === 2) {
        return 'Usuario inactivo en nómina';
       }

      // 3. Enviar la clave por email
      await this.emailService.enviarRecuperacionClave(datosNomina.EMail, nombreUsuario, usuario.Clave);
      return 'La contraseña ha sido enviada al correo registrado';
    } catch (error) {
      return 'Error al recuperar la contraseña. Intente nuevamente.';
    }
  }


    
}
