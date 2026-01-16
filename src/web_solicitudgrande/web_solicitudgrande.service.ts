
import { Injectable, Logger, NotFoundException, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateWebSolicitudgrandeDto } from './dto/create-web_solicitudgrande.dto';
import { UpdateWebSolicitudgrandeDto, UpdateCuotaYCupoDto } from './dto/update-web_solicitudgrande.dto';
import { WebSolicitudgrande } from './entities/web_solicitudgrande.entity';
import { CupoCreditoService } from 'src/cupo-credito/cupo-credito.service';
import { MenuItemRoleService } from 'src/menu-item-role/menu-item-role.service';
@Injectable()
export class WebSolicitudgrandeService {
  private readonly logger = new Logger('AuthServiceCogno');

  constructor(
    @InjectRepository(WebSolicitudgrande)
    private webSolicitudgrandeRepository: Repository<WebSolicitudgrande>,
    private readonly cupoCreditoService: CupoCreditoService,
    private readonly menuItemRoleService: MenuItemRoleService,
  ) { }

  // --- CRUD PRINCIPAL ---
  create(createWebSolicitudgrandeDto: CreateWebSolicitudgrandeDto) {
    try {
      const dtoTransformado: any = {
        ...createWebSolicitudgrandeDto,
        ValorInmmueble: createWebSolicitudgrandeDto.ValorInmmueble
          ? parseFloat(createWebSolicitudgrandeDto.ValorInmmueble)
          : undefined,
      };
      const newSolicitud = this.webSolicitudgrandeRepository.create(dtoTransformado);
      return this.webSolicitudgrandeRepository.save(newSolicitud);
    } catch (error) {
      this.logger.error(error.message, error.stack);
      throw new InternalServerErrorException('Error en el servidor');
    }
  }

  findAll() {
    return `This action returns all webSolicitudgrande`;
  }

  findOne(id: number, numerosolicitud: string) {
    return this.webSolicitudgrandeRepository.findOne({ where: { NumeroSolicitud: numerosolicitud } });
  }

  update(id: number, updateWebSolicitudgrandeDto: UpdateWebSolicitudgrandeDto) {
    // Actualiza solicitud grande
    const dtoTransformado: any = {
      ...updateWebSolicitudgrandeDto,
      ValorInmmueble: updateWebSolicitudgrandeDto.ValorInmmueble
        ? parseFloat(updateWebSolicitudgrandeDto.ValorInmmueble)
        : undefined,
    };
    return this.webSolicitudgrandeRepository.update(
      { idWeb_SolicitudGrande: id },
      { ...dtoTransformado },
    );
  }

  // --- ACTUALIZACIÓN DE CAMPOS ESPECÍFICOS ---
  async updateCuotayCupo(id: number, updateDto: UpdateCuotaYCupoDto, usuario: { idUsuario: number; Nombre: string; idGrupo: number; Activo: boolean }) {
    try {
      // Verificar si la solicitud existe

      const exists = await this.webSolicitudgrandeRepository.existsBy({
        idWeb_SolicitudGrande: id
      });

      this.logger.log(`Usuario ${usuario.idGrupo} está actualizando la solicitud con ID ${id}`);

      if (!exists) {
        throw new NotFoundException(`Solicitud con ID ${id} no encontrada`);
      }

      const idCre_SolicitudWeb = await this.webSolicitudgrandeRepository.findOne({
        where: { idWeb_SolicitudGrande: id },
        select: { idCre_SolicitudWeb: true, CupoCredito: true, CuotaAsignada: true }
      });
      // Validaciones de permisos y cupo
      const updateData: Partial<WebSolicitudgrande> = {};
      if (usuario.idGrupo === 22 || usuario.idGrupo === 24) {

        const permisoVerificado = await this.getPermissionsComponents(4, usuario.idUsuario);
        this.logger.log(`Permiso verificado: ${JSON.stringify(permisoVerificado)}`);
        const cupoData = await this.findCupoCreditoByIdSolicitud();
        this.logger.log(`CupoData obtenida: ${JSON.stringify(cupoData)}`);
        if (permisoVerificado.permiso === 0) {
          this.logger.warn(`Usuario ${usuario.idUsuario} no tiene permiso para actualizar el cupo.`);
          return {
            success: false,
            message: 'Usuario no tiene permiso para actualizar el cupo.',
            error: 'Permiso denegado',
            statusCode: 400
          };
        }
        if (permisoVerificado.estado === "SIN PERMISO") {
          this.logger.warn(`Usuario ${usuario.idUsuario} no tiene permiso para actualizar el cupo.`);
           return {
            success: false,
            message: 'Usuario no identificado Autonomía o Autonomía Parcial para actualizar el cupo.',
            error: 'Permiso denegado',
            statusCode: 400
          };
        }
        const PorcentajeCupo = cupoData.find(c => c.Autonomia && permisoVerificado.estado === "EDITAR CUPO AUTONOMIA")?.Porcentaje
          || cupoData.find(c => c.Parcial && permisoVerificado.estado === "EDITAR CUPO AUTONOMIA PARCIAL")?.Porcentaje;

        this.logger.log(`PorcentajeCupo determinado: ${PorcentajeCupo}`);
        /* EL CUPO NUEVO NO PUEDE EXCEDER EL PORCENTAJE PERMITIDO SEGÚN EL TIPO DE AUTONOMÍA  DEL CUPO ANTEIOR*/
        const cuotaAsignadaAnterior = idCre_SolicitudWeb?.CuotaAsignada || 0;
        const cupoMaximoPermitido = (cuotaAsignadaAnterior * PorcentajeCupo) / 100;
        this.logger.log(`Cupo solicitado: ${cuotaAsignadaAnterior}`);
        this.logger.log(`Cupo máximo permitido calculado: ${cupoMaximoPermitido + cuotaAsignadaAnterior}`);
        this.logger.log(`Cupo solicitado en updateDto: ${updateDto.CuotaAsignada}`);
        if (updateDto.CuotaAsignada !== undefined && updateDto.CuotaAsignada > cupoMaximoPermitido + cuotaAsignadaAnterior) {
          this.logger.warn(`Cupo solicitado ${updateDto.CuotaAsignada} excede el máximo permitido ${cupoMaximoPermitido + cuotaAsignadaAnterior} para el usuario ${usuario.idUsuario}.`);
           return {
            success: false,
            message: `El cupo solicitado excede el máximo permitido de ${cupoMaximoPermitido + cuotaAsignadaAnterior}.`,
            error: 'Cupo excedido',
            statusCode: 400
          };
        }
      }

      if (updateDto.CuotaAsignada !== undefined) {
        const cuotaValue = idCre_SolicitudWeb?.CupoCredito;
        if (cuotaValue === false) {
          this.logger.log(`CupoCredito es false, permitiendo actualización de CuotaAsignada.`);
          updateData.CuotaAsignada = updateDto.CuotaAsignada;
        }
        if (cuotaValue === true && (usuario.idGrupo === 22 || usuario.idGrupo === 24)) {
          this.logger.warn(`Cuota Asignada no puede ser actualizada porque ya fue Actualizada por un usuario con permisos.`);
          return({
            success: false,
            message: 'No es posible actualizar la Cuota Asignada porque ya fue actualizada por un usuario autorizado.',
            error: 'Actualización no permitida',
            statusCode: 400
          });
        }
      }

      if (updateDto.Cupo !== undefined) {

        updateData.Cupo = updateDto.Cupo;
      }

      if (usuario && usuario.idGrupo && (usuario.idGrupo === 22 || usuario.idGrupo === 24)) {
        this.logger.log(`Usuario con ID ${usuario.idUsuario} y grupo ${usuario.idGrupo} tiene permiso para actualizar CupoCredito.`);
        updateData.CupoCredito = true;
      }
      // Ejecutar la actualización
      const result = await this.webSolicitudgrandeRepository.update(
        { idWeb_SolicitudGrande: id },
        updateData
      );

      if (result.affected === 0) {
        throw new NotFoundException(`No se pudo actualizar la solicitud con ID ${id}`);
      }

      return { success: true, message: 'Actualización exitosa' };
    }
    catch (error) {
      this.logger.error(error.message, error.stack);
      if (error instanceof NotFoundException ) {
        throw error;
      }
      // Mensaje claro para el usuario final
      throw new InternalServerErrorException({
        success: false,
        message: 'No se pudo actualizar la cuota o el cupo. Por favor, revise los datos enviados o contacte al administrador.',
        error: 'Error de actualización',
        statusCode: 500
      });
    }
  }

  // --- SERVICIOS AUXILIARES ---
  async findCupoCreditoByIdSolicitud() {
    return this.cupoCreditoService.findAll();
  }

  /**
   * Obtiene y valida permisos de componentes para el usuario y menú
   */
  async getPermissionsComponents(idmenu_items: number, idUsuario: number) {
    try {
      const permisos = await this.menuItemRoleService.getPermissionsComponents(idmenu_items, idUsuario);
      this.logger.log(`Permisos obtenidos para el usuario ${idUsuario} en el menú ${idmenu_items}: ${JSON.stringify(permisos)}`);
      // Filtrar solo los permisos activos
      const permisosActivos = permisos.filter((p: any) => p.Activo === true || p.Activo === 1);
      // Buscar los permisos relevantes
      const tieneEditarCupo = permisosActivos.some((p: any) => p.Permisos === 'EDITAR VALORES DE CREDITO');
      const tieneAutonomia = permisosActivos.some((p: any) => p.Permisos === 'EDITAR CUPO AUTONOMIA');
      const tieneAutonomiaParcial = permisosActivos.some((p: any) => p.Permisos === 'EDITAR CUPO AUTONOMIA PARCIAL');

      let estado = 'SIN PERMISO';
      let permiso = 0;

      if (tieneEditarCupo) {
        // Si tiene ambos, predomina AUTONOMIA
        if (tieneAutonomia) {
          estado = 'EDITAR CUPO AUTONOMIA';
          permiso = 1;
        } else if (tieneAutonomiaParcial) {
          estado = 'EDITAR CUPO AUTONOMIA PARCIAL';
          permiso = 1;
        }
        permiso = 1;
      }
      this.logger.log(`Permiso verificado para el usuario ${idUsuario} en el menú ${idmenu_items}: ${estado}`);
      return { permiso, estado };
    } catch (error) {
      this.logger.error(`Error verificando permiso para el usuario ${idUsuario} en el menú ${idmenu_items}: ${error.message}`, error.stack);
      throw new InternalServerErrorException('Error verificando permisos de usuario');
    }
  }


  /**
   * Verifica el permiso de actualización de cupo
   */
  async VerificarPermisoactualizacionCupo() {
    try {
      const cupoData = await this.findCupoCreditoByIdSolicitud();
      this.logger.log(`cupodata: ${JSON.stringify(cupoData)}`);

    }
    catch (error) {
      this.logger.error(error.message, error.stack);
      throw new InternalServerErrorException('Error verificando permiso de actualización de cupo');
    }
  }

  // --- ACTUALIZACIÓN DE CAMPOS GENERALES ---
  async updateCamposWebSolicitud(id: number, updateDto: CreateWebSolicitudgrandeDto) {
    try {
      // Verificar si la solicitud existe
      const exists = await this.webSolicitudgrandeRepository.existsBy({
        idWeb_SolicitudGrande: id
      });

      if (!exists) {
        throw new NotFoundException(`Solicitud con ID ${id} no encontrada`);
      }
      // Actualizar solo los campos proporcionados
      const updateData: Partial<WebSolicitudgrande> = {
        ...updateDto,
        ValorInmmueble: updateDto.ValorInmmueble !== undefined
          ? parseFloat(updateDto.ValorInmmueble as any)
          : undefined,
      };

      // Ejecutar la actualización
      const result = await this.webSolicitudgrandeRepository.update(
        { idWeb_SolicitudGrande: id },
        updateData
      );

      if (result.affected === 0) {
        throw new NotFoundException(`No se pudo actualizar la solicitud con ID ${id}`);
      }

      return { success: true, message: 'Actualización exitosa' };
    }
    catch (error) {
      this.logger.error(error.message, error.stack);
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Error actualizando campos de la solicitud');
    }
  }

  // --- CONSULTA POR ID ---
  findOneId(id: number) {
    return this.webSolicitudgrandeRepository.findOne({ where: { idCre_SolicitudWeb: id } });
  }




  // --- ELIMINACIÓN ---
  remove(id: number) {
    return `This action removes a #${id} webSolicitudgrande`;
  }
}


