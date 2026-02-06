import { Inject, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CboGestorCobranzas } from './cbo-gestor-cobranzas.entity';
import { PersonalBddService } from 'src/personal-bdd/personal-bdd.service';
import { RedisService } from 'src/redis/redis.service';
import {
    CboGestorCobranzasOperativoFilterDto,
    CboGestorCobranzasOperativoResponseDto,
    CboGestorCobranzasOperativoPaginatedResponseDto,
    CboGestorCobranzasOperativoFilterDetalleDto,
    CboGestorCobranzasOperativoDetalleResponseDto,
    CboGestorCobranzasOperativoFilterDetalleWebDto,
    CboGestorCobranzasOperativoDetalleWebResponseDto,
    GuardaCbo_GestionesDeCobranzasWebDto,
    TablaDeAmortizacionResponseDto,
    CboGestorCobranzasOperativoPorcentajeDto,
    CboGestorCobranzasOperativoPorcentajeResponseDto

} from './cbo-gestor-cobranzas-operativo.dto';
import { CreSolicitudwebWsGateway } from "../cre_solicitudweb-ws/cre_solicitudweb-ws.gateway";

import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { CacheTTL } from '../common/cache-ttl.config';
import { Cache } from 'cache-manager';
import axios, { AxiosInstance } from 'axios';

@Injectable()
export class CboGestorCobranzasOperativoService {
    private readonly logger = new Logger(CboGestorCobranzasOperativoService.name);
    private readonly EXPO_NOTIFICATION_URL = 'https://appservices.com.ec/cobranza/api/v1/point/NotificationUser/expo';
    private readonly axiosInstance: AxiosInstance;

    constructor(
        @InjectRepository(CboGestorCobranzas)
        private readonly cboGestorCobranzasRepository: Repository<CboGestorCobranzas>,
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
        private readonly personalBddService: PersonalBddService,
        private readonly redisService: RedisService,
        private readonly creSolicitudwebWsGateway: CreSolicitudwebWsGateway,
    ) {
        this.axiosInstance = axios.create({
            timeout: 5000,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }


    async getDetalleGestoresCobranzasDetalleOperativoWeb(
        filtros: CboGestorCobranzasOperativoFilterDetalleWebDto,
    ): Promise<CboGestorCobranzasOperativoDetalleWebResponseDto[]> {
        try {
            // const params = this.validarParametros(filtros);
            this.logger.log(
                `🔍 Ejecutando SP ConsultaCbo_GestionesDeCobranzasWeb con parámetros: ${JSON.stringify(filtros)}`,
            );
            const cacheKey = `ConsultaCbo_GestionesDeCobranzasWeb_${filtros.idCompra}`;
            const cached = await this.cacheManager.get<CboGestorCobranzasOperativoDetalleWebResponseDto[]>(cacheKey);
            if (cached) {
                this.logger.log(`✅ CACHE HIT - Datos obtenidos desde Redis para: ${cacheKey}`);
                return cached;
            }

            this.logger.log(`❌ CACHE MISS - Consultando base de datos para: ${cacheKey}`);

            const query = `EXEC [dbo].[ConsultaCbo_GestionesDeCobranzasWeb]
                @idCompra = @0`;

            const datos: CboGestorCobranzasOperativoDetalleWebResponseDto[] =
                await this.cboGestorCobranzasRepository.query(query, [
                    filtros.idCompra,
                ]);

            await this.cacheManager.set(cacheKey, datos, CacheTTL.CboGestorCobranzasOperativoDetalle);
            this.logger.log(`✅ Datos almacenados en Redis para: ${cacheKey}`);
            return datos;
        }
        catch (error) {
            this.logger.error(
                `❌ Error ejecutando SP ConsultaCbo_GestionesDeCobranzasWeb: ${error.message} `,
                error.stack,
            );
            throw new InternalServerErrorException(
                'Error al obtener el detalle de gestores de cobranzas. Por favor intente más tarde.',
            );
        }
    }


    async getDetalleGestoresCobranzasDetalleOperativo(
        filtros: CboGestorCobranzasOperativoFilterDetalleDto,
    ): Promise<CboGestorCobranzasOperativoDetalleResponseDto[]> {
        try {

            const cacheKey = `cbo_gestor_cobranzas_detalle_${filtros.ScRE_SOLIICTUDwEB}`;
            const cached = await this.cacheManager.get<CboGestorCobranzasOperativoDetalleResponseDto[]>(cacheKey);
            if (cached) {
                this.logger.log(`✅ CACHE HIT - Datos obtenidos desde Redis para: ${cacheKey}`);
                return cached;
            }
            this.logger.log(`❌ CACHE MISS - Consultando base de datos para: ${cacheKey}`);


            const query = `EXEC [dbo].[Cbo_GestorDeCobranzasOperativoDetalle]
                @ScRE_SOLIICTUDwEB = @0`;
            const datos: CboGestorCobranzasOperativoDetalleResponseDto[] =
                await this.cboGestorCobranzasRepository.query(query, [
                    filtros.ScRE_SOLIICTUDwEB,
                ]);


            await this.cacheManager.set(cacheKey, datos, CacheTTL.CboGestorCobranzasOperativoDetalle);
            this.logger.log(`✅ Datos almacenados en Redis para: ${cacheKey}`);
            return datos;
        }
        catch (error) {
            this.logger.error(
                `❌ Error ejecutando SP Cbo_GestorDeCobranzasOperativoDetalle: ${error.message} `,
                error.stack,
            );
            throw new InternalServerErrorException(
                'Error al obtener el detalle de gestores de cobranzas. Por favor intente más tarde.',
            );
        }
    }

    async getPorcentajeCobranzas(
        filtros: CboGestorCobranzasOperativoPorcentajeDto,
        usuario: { idUsuario: number; Nombre: string; idGrupo: number; Activo: boolean },
    ): Promise<CboGestorCobranzasOperativoPorcentajeResponseDto[]> {
        try {

            const cacheKey = `cbo_gestor_cobranzas_porcentaje_${filtros.ScRE_SOLIICTUDwEB}`;
            const cached =
                await this.cacheManager.get<CboGestorCobranzasOperativoPorcentajeResponseDto[]>(cacheKey);

            if (cached) {
                this.logger.log(`✅ CACHE HIT - Datos obtenidos desde Redis para: ${cacheKey}`);
                return cached;
            }

            this.logger.log(`❌ CACHE MISS - Consultando base de datos para: ${cacheKey}`);

            const query = `EXEC [dbo].[Cbo_GestorDeCobranzasOperativoSumatoria]	
                   @idOperadorCobrador = @0`;

            let datos: CboGestorCobranzasOperativoPorcentajeResponseDto[] =
                await this.cboGestorCobranzasRepository.query(query, [
                    filtros.ScRE_SOLIICTUDwEB,
                ]);

            /*  if (usuario.idGrupo !== 31 && usuario.idGrupo !== 19) {
                datos = datos.map(() => ({
                  TotalCobrado: 0,
                  TotalProyectado: 0,
                  PorcentajeCobrado: 0,
                }));
              }*/

            await this.cacheManager.set(
                cacheKey,
                datos,
                CacheTTL.CboGestorCobranzasOperativoPorcentaje,
            );

            this.logger.log(`✅ Datos almacenados en Redis para: ${cacheKey}`);

            return datos;

        } catch (error) {
            this.logger.error(
                `❌ Error ejecutando SP Cbo_GestorDeCobranzasOperativoSumatoria: ${error.message}`,
                error.stack,
            );
            throw new InternalServerErrorException(
                'Error al obtener el detalle de gestores de cobranzas. Por favor intente más tarde.',
            );
        }
    }



    async getGestoresCobranzasOperativo(
        filtros: CboGestorCobranzasOperativoFilterDto,
    ): Promise<CboGestorCobranzasOperativoPaginatedResponseDto> {
        try {
            // Validar parámetros
            const params = this.validarParametros(filtros);

            this.logger.log(
                `🔍 Ejecutando SP Cbo_GestorDeCobranzasOperativo con parámetros: ${JSON.stringify(params)}`,
            );

            const queryCount = `EXEC [dbo].[Cbo_GestorDeCobranzasOperativoCount]
                @DesdeDiasMora = @0,
                @HastaDiasMora = @1,
                @CobradorOperador = @2,
                @idOperadorCobrador = @3,
                @Gestionados = @4,
                @idCbo_ResultadoGestion = @5,
                @idCbo_Gestores = @6,
                @GestionHoy = @7,
                @Filtro = @8
                `;

            const totalCountResult = await this.cboGestorCobranzasRepository.query(queryCount, [
                params.desdeDiasMora,
                params.hastaDiasMora,
                params.cobradorOperador,
                params.idOperadorCobrador, // Ya es null o un GUID válido
                params.gestionados,
                params.idCbo_ResultadoGestion,
                params.idGestores,
                params.GestionHoy,
                params.Filtro,
            ]);

            const totalCount = totalCountResult[0]?.TotalRegistros || 0;


            // Ejecutar el SP directamente usando query con parámetros posicionales
            const query = `EXEC [dbo].[Cbo_GestorDeCobranzasOperativo]
                @DesdeDiasMora = @0,
                @HastaDiasMora = @1,
                @CobradorOperador = @2,
                @idOperadorCobrador = @3,
                @Gestionados = @4,
                @idCbo_ResultadoGestion = @5,
                @idCbo_Gestores = @6,
                @GestionHoy = @7,
                @Filtro = @8,
                @PageNumber = @9,
                @PageSize = @10,
                @OrdenarPor = @11,
                @Direccion = @12`;
            const datos: CboGestorCobranzasOperativoResponseDto[] =
                await this.cboGestorCobranzasRepository.query(query, [
                    params.desdeDiasMora,
                    params.hastaDiasMora,
                    params.cobradorOperador,
                    params.idOperadorCobrador, // Ya es null o un GUID válido
                    params.gestionados,
                    params.idCbo_ResultadoGestion,
                    params.idGestores,
                    params.GestionHoy,
                    params.Filtro,
                    params.pageNumber,
                    params.pageSize,
                    params.ordenarPor,
                    params.direccion,
                ]);

            this.logger.log(`✅ SP ejecutado exitosamente.Registros obtenidos: ${datos.length} `);
            this.logger.log(`✅ Total registros para paginación: ${totalCount} `);
            return {
                data: datos,
                pageNumber: params.pageNumber,
                pageSize: params.pageSize,
                totalCount: totalCount,
                totalPages: totalCount === 0 ? 0 : Math.ceil(totalCount / params.pageSize)
            };
        } catch (error) {
            this.logger.error(
                `❌ Error ejecutando SP Cbo_GestorDeCobranzasOperativo: ${error.message} `,
                error.stack,
            );
            throw new InternalServerErrorException(
                'Error al obtener los gestores de cobranzas. Por favor intente más tarde.',
            );
        }
    }


    private validarParametros(
        filtros: CboGestorCobranzasOperativoFilterDto,
    ): Required<CboGestorCobranzasOperativoFilterDto> {
        const desdeDiasMora = filtros.desdeDiasMora ?? 1;
        const hastaDiasMora = filtros.hastaDiasMora ?? 100000;
        const cobradorOperador = filtros.cobradorOperador ?? 0;
        // Convertir cadena vacía o "null" a null para UNIQUEIDENTIFIER
        const idOperadorCobrador = (!filtros.idOperadorCobrador || filtros.idOperadorCobrador === 'null')
            ? null
            : filtros.idOperadorCobrador;
        const gestionados = filtros.gestionados ?? 0;
        const idCbo_ResultadoGestion = filtros.idCbo_ResultadoGestion ?? 0;
        const idGestores = filtros.idGestores ?? 0;
        const GestionHoy = filtros.GestionHoy ?? 0;
        const Filtro = filtros.Filtro ?? '';
        const pageNumber = Math.max(1, filtros.pageNumber ?? 1);
        const pageSize = Math.max(1, filtros.pageSize ?? 50);

        // Validaciones lógicas
        if (desdeDiasMora > hastaDiasMora) {
            throw new InternalServerErrorException(
                'desdeDiasMora no puede ser mayor que hastaDiasMora',
            );
        }

        if (cobradorOperador < 0 || cobradorOperador > 2) {
            throw new InternalServerErrorException(
                'cobradorOperador debe ser 0 (TODOS), 1 (OPERADOR) o 2 (COBRADOR)',
            );
        }

        if (gestionados < 0 || gestionados > 2) {
            throw new InternalServerErrorException(
                'gestionados debe ser 0 (TODOS), 1 (CON GESTION) o 2 (SIN GESTION)',
            );
        }

        return {
            desdeDiasMora,
            hastaDiasMora,
            cobradorOperador,
            idOperadorCobrador,
            gestionados,
            idCbo_ResultadoGestion,
            idGestores,
            GestionHoy,
            Filtro,
            pageNumber,
            pageSize,
        } as Required<CboGestorCobranzasOperativoFilterDto>;
    }


    async exportarGestoresCobranzas(
        filtros: Omit<CboGestorCobranzasOperativoFilterDto, 'pageNumber' | 'pageSize'>,
    ): Promise<CboGestorCobranzasOperativoResponseDto[]> {
        try {
            this.logger.log('📤 Iniciando exportación de gestores de cobranzas');

            // Ejecutar sin paginación (valores máximos)
            const response = await this.getGestoresCobranzasOperativo({
                ...filtros,
                pageNumber: 1,
                pageSize: 999999,
            });

            this.logger.log(
                `✅ Exportación completada.Total de registros: ${response.data.length} `,
            );

            return response.data;
        } catch (error) {
            this.logger.error(`❌ Error exportando gestores de cobranzas: ${error.message} `);
            throw error;
        }
    }


    async guardaCbo_GestionesDeCobranzasWeb(
        datos: GuardaCbo_GestionesDeCobranzasWebDto,
        usuario: { idUsuario: number; Nombre: string; idGrupo: number; Activo: boolean },
    ): Promise<{ success: boolean; message: string }> {
        try {
            this.logger.log(
                `🔍 Ejecutando SP GuardaCbo_GestionesDeCobranzasWeb con datos: ${JSON.stringify(datos)}`,
            );
            const idOperadorCobrador = await this.obtenerIdOperadorCobradorPorNombre(usuario.Nombre);
            this.logger.log(`🔍 idOperadorCobrador obtenido: ${idOperadorCobrador}`);
            /*CREATE PROCEDURE [dbo].[GuardaCbo_GestionesDeCobranzasWeb] (
     @idCompra int,
     @idOperadorCobrador UNIQUEIDENTIFIER = null,
     @idCbo_EstadoGestion int,
     @idCbo_EstadosTipocontacto int = 0,
     @idCbo_ResultadoGestion int,
     @Notas varchar(300),
     @telefono varchar(15),
     @FechaPago DateTime,
     @Valor Decimal(18,2),
     @Usuario varchar(50)*/
            const query = `EXEC [dbo].[GuardaCbo_GestionesDeCobranzasWeb]
                @idCompra = @0,
                @idOperadorCobrador = @1,
                @idCbo_EstadoGestion = @2,
                @idCbo_EstadosTipocontacto = @3,
                @idCbo_ResultadoGestion = @4,
                @Notas = @5,
                @telefono = @6,
                @Usuario = @7,
                @FechaPago = @8,
                @Valor = @9`;
            await this.cboGestorCobranzasRepository.query(query, [
                datos.idCompra,
                idOperadorCobrador,
                datos.idCbo_EstadoGestion,
                datos.idCbo_EstadosTipocontacto,
                datos.idCbo_ResultadoGestion,
                datos.Notas,
                datos.telefono,
                usuario.Nombre,
                datos.FechaPago,
                datos.Valor,
            ]);
            this.logger.log(`✅ SP ejecutado exitosamente. Gestión de cobranza guardada.`);

            /* delete cache related to cobranzas after insert */
            const cacheKeys = `ConsultaCbo_GestionesDeCobranzasWeb_${datos.idCompra}`;
            await this.redisService.delete(cacheKeys);
            this.logger.log(`✅ Caché relacionado con cobranzas eliminado después de la inserción.`);

            return { success: true, message: 'Gestión de cobranza guardada exitosamente.' };
        } catch (error) {
            this.logger.error(
                `❌ Error ejecutando SP GuardaCbo_GestionesDeCobranzasWeb: ${error.message} `,
                error.stack,
            );
            throw new InternalServerErrorException(
                'Error al guardar la gestión de cobranza. Por favor intente más tarde.',
            );
        }
    }



    private async obtenerIdOperadorCobradorPorNombre(nombre: string): Promise<string | null> {
        const cacheKey = `PersonalBdd_IdOperadorCobrador_${nombre}`;
        const cachedId = await this.cacheManager.get<string>(cacheKey);
        if (cachedId) {
            this.logger.log(`✅ CACHE HIT - idOperadorCobrador obtenido desde Redis para: ${cacheKey}`);
            return cachedId;
        }
        this.logger.log(`❌ CACHE MISS - Consultando PersonalBdd para: ${cacheKey}`);
        const personal = await this.personalBddService.findOne(nombre);
        const idOperadorCobrador = personal ? personal.idPersonalBDD : null;
        if (idOperadorCobrador) {
            await this.cacheManager.set(cacheKey, idOperadorCobrador, CacheTTL.PersonalBddIdOperadorCobrador);
            this.logger.log(`✅ idOperadorCobrador almacenado en Redis para: ${cacheKey}`);
        }
        return idOperadorCobrador;
    }
    /*ALTER PROCEDURE [dbo].[Cobranzas]  
     (
        @idCompra Int, @Fecha Date
        )	WITH RECOMPILE
    AS*/
    async getTablaAmortizacion(idCompra: number, Fecha: Date): Promise<TablaDeAmortizacionResponseDto[]> {
        try {
            this.logger.log(
                `🔍 Ejecutando SP Cobranzas para idCompra: ${idCompra} y Fecha: ${Fecha}`,
            );
            const query = `EXEC [dbo].[Cobranzas]
                @idCompra = @0,
                @Fecha = @1
                `;

            const datos: any[] =
                await this.cboGestorCobranzasRepository.query(query, [
                    idCompra,
                    Fecha,
                ]);

            this.logger.log(`✅ SP ejecutado exitosamente. Registros obtenidos: ${datos.length} `);
            return datos;
        }
        catch (error) {
            this.logger.error(
                `❌ Error ejecutando SP Cobranzas: ${error.message} `,
                error.stack,
            );
            throw new InternalServerErrorException(
                'Error al obtener la tabla de amortización. Por favor intente más tarde.',
            );
        }
    }

    async getTablaAmortizacionValores(idCompra: number, Fecha: Date): Promise<TablaDeAmortizacionResponseDto[]> {
        try {
            this.logger.log(
                `🔍 Ejecutando SP ValoresCobranza para idCompra: ${idCompra} y Fecha: ${Fecha}`,
            );
            const query = `EXEC [dbo].[ValoresCobranza]
                @idCompra = @0,
                @Fecha = @1
                `;

            const datos: any[] =
                await this.cboGestorCobranzasRepository.query(query, [
                    idCompra,
                    Fecha,
                ]);

            this.logger.log(`✅ SP ejecutado exitosamente. Registros obtenidos: ${datos.length} `);
            return datos;
        }
        catch (error) {
            this.logger.error(
                `❌ Error ejecutando SP ValoresCobranza: ${error.message} `,
                error.stack,
            );
            throw new InternalServerErrorException(
                'Error al obtener la tabla de amortización. Por favor intente más tarde.',
            );
        }
    }

    async getTablaAmortizacionValoresDetallePagos(idCre_TablaDeAmortizacion: number): Promise<TablaDeAmortizacionResponseDto[]> {
        try {
            this.logger.log(
                `🔍 Ejecutando SP [ResumenPagoCrediPoint_APP] para idCre_TablaDeAmortizacion: ${idCre_TablaDeAmortizacion}`,
            );
            const query = `EXEC [dbo].[ResumenPagoCrediPoint_APP]
                @idCre_TablaDeAmortizacion = @0
                `;
            const datos: any[] =
                await this.cboGestorCobranzasRepository.query(query, [
                    idCre_TablaDeAmortizacion
                ]);
            this.logger.log(`✅ SP ejecutado exitosamente. Registros obtenidos: ${datos.length} `);
            return datos;
        }
        catch (error) {
            this.logger.error(
                `❌ Error ejecutando SP [ResumenPagoCrediPoint_APP]: ${error.message} `,
                error.stack,
            );
            throw new InternalServerErrorException(
                'Error al obtener el detalle de pagos de la tabla de amortización. Por favor intente más tarde.',
            );
        }
    }

    async InsertNewPago(idCompra: number): Promise<{ ok: boolean }> {
        try {
            this.logger.log(
                `🔍 Ejecutando SP [GuardaCbo_GestionesDeCobranzasCanalesMasivos] para idCompra: ${idCompra}`,
            );
            /*    @idCompra int,
    @Telefono varchar (15) ='',
    @Notas varchar (250) ='',
    @idCbo_EstadoGestion int = 12,
    @idCbo_EstadosTipocontacto int = 10,
    @idCbo_ResultadoGestion int = 80*/
            const query = `
            EXEC [dbo].[GuardaCbo_GestionesDeCobranzasCanalesMasivos] 
                @idCompra = @0,
                @Telefono = '',
                @Notas = 'PAGO REALIZADO DESDE LATINIUM.',
                @idCbo_EstadoGestion = 8,
                @idCbo_EstadosTipocontacto = 1,
                @idCbo_ResultadoGestion = 1
        `;

            await this.cboGestorCobranzasRepository.query(query, [
                idCompra
            ]);
            const cacheKeys = `ConsultaCbo_GestionesDeCobranzasWeb_${idCompra}`;
            await this.redisService.delete(cacheKeys);
            this.logger.log(`✅ SP ejecutado exitosamente.`);
            return { ok: true };
        } catch (error) {
            this.logger.error(
                `❌ Error ejecutando SP [GuardaCbo_GestionesDeCobranzasCanalesMasivos]: ${error.message}`,
                error.stack,
            );
            throw new InternalServerErrorException(
                'Error al insertar nuevo pago. Por favor intente más tarde.',
            );
        }
    }


    async getnotificaciones(idCompra: number): Promise<any[]> {
        const cacheKey = `Cbo_GestorDeCobranzasOperativoGateway_${idCompra}`;

        try {
            this.logger.log(`🔍 Ejecutando SP [Cbo_GestorDeCobranzasOperativoGateway] para idCompra: ${idCompra}`);

            // 🔹 Intentar obtener datos desde cache
            let datos: any[] = await this.cacheManager.get<any[]>(cacheKey);
            let cacheHit = !!datos;

            if (cacheHit) {
                this.logger.log(`✅ CACHE HIT - Datos obtenidos desde Redis para: ${cacheKey}`);
            } else {
                this.logger.log(`❌ CACHE MISS - Consultando base de datos para: ${cacheKey}`);

                const query = `EXEC [dbo].[Cbo_GestorDeCobranzasOperativoGateway] @idCompra = @0`;
                datos = await this.cboGestorCobranzasRepository.query(query, [idCompra]);

                // Guardar en cache
                await this.cacheManager.set(cacheKey, datos, CacheTTL.Cbo_GestorDeCobranzasOperativoGateway);
                this.logger.log(`✅ Datos almacenados en Redis para: ${cacheKey}`);
            }

            // 🔹 FLUJO ÚNICO PARA NOTIFICACIONES Y PAGO
            if (datos.length > 0) {
                // 1️⃣ Enviar notificación de pago
                this.enviarNotificacionPago(datos, idCompra);


                const dataCliente = await this.FindCompromisosDePago(idCompra);
                const cliente = this.mapClienteForNotification(dataCliente[0]);

                if (cliente?.Enviar === 1 && cliente.tokens.length > 0) {
                    await this.enviarNotificacionExpo(cliente);
                }
                await this.InsertNewPago(idCompra);
            }

            this.logger.log(`✅ SP ejecutado exitosamente. Registros obtenidos: ${datos.length}`);
            return datos;
        } catch (error) {
            this.logger.error(
                `❌ Error ejecutando SP [Cbo_GestorDeCobranzasOperativoGateway]: ${error.message}`,
                error.stack,
            );
            throw new InternalServerErrorException(
                'Error al obtener las notificaciones. Por favor intente más tarde.',
            );
        }
    }

    private mapClienteForNotification(data: any) {
        if (!data) return null;

        return {
            idUsuario: data.idUsuario,
            nombre: data.Nombre,
            cedula: data.Ruc,
            factura: data.Factura,
            Enviar: data.Enviar,
            Empresa: data.Empresa,
            tokens: data.Token ? data.Token : []
        };
    }


    private enviarNotificacionPago(
        datos: any[],
        idCompra: number,
    ): void {
        if (!datos?.length) {
            this.logger.log(`ℹ️ No se encontraron registros para notificación`);
            return;
        }

        const { idUsuario, Nombre, Factura, Ruc } = datos[0];

        const mensaje = `El cliente ${Nombre} (CI: ${Ruc}) canceló una de sus letras correspondiente a la factura N° ${Factura}. Gracias por su gestión.`;

        this.logger.log(
            `📢 Enviando notificación de pago al usuario ${idUsuario} | solicitudId: ${idCompra}`,
        );

        this.creSolicitudwebWsGateway.notificarUsuario(idUsuario, {
            tipo: 'success',
            mensaje,
            solicitudId: idCompra,
        });

        this.logger.log(`✅ Notificación enviada correctamente al usuario: ${idUsuario}`);
    }

    private async enviarNotificacionExpo(
        cliente: {
            nombre: string;
            cedula: string;
            factura: string;
            tokens: string[];
            idUsuario: number;
            Enviar: number;
            Empresa: string;
        },
    ): Promise<void> {
        try {
            if (!cliente.tokens || cliente.tokens.length === 0) {
                this.logger.warn('⚠️ No hay tokens disponibles para enviar notificación Expo');
                return;
            }
            /*"tokens": [
        "ExponentPushToken[C-Fy3MNUgLZvRhGLAlDarJ]"
      ],*/
            const tokens = [cliente.tokens];
            const payload = {
                tokens: tokens,
                notification: {
                    type: 'success',
                    title: '✅ Pago recibido del cliente',
                    body: `🎉 El cliente ${cliente.nombre} (🆔 ${cliente.cedula}) ha cumplido con su compromiso de pago. 📄 Factura: ${cliente.factura}.`,
                    url: 'https://miempresa.com/mis-pagos',
                    empresa: 'CREDI',
                },
            };

            this.logger.log(
                `📤 Enviando notificación Expo a URL: ${this.EXPO_NOTIFICATION_URL}`,
            );
            this.logger.log(
                `📤 Payload: ${JSON.stringify(payload)}`,
            );

            const response = await this.axiosInstance.post(
                this.EXPO_NOTIFICATION_URL,
                payload,
            );

            this.logger.log(
                `✅ Notificación Expo enviada exitosamente. Respuesta: ${JSON.stringify(response.data)}`,
            );
        } catch (error) {
            if (error.response) {
                this.logger.error(
                    `❌ Error enviando notificación Expo. Status: ${error.response.status}, Data: ${JSON.stringify(error.response.data)}`,
                );
            } else if (error.request) {
                this.logger.error(
                    `❌ No se recibió respuesta del servidor: ${error.message}`,
                );
            } else {
                this.logger.error(
                    `❌ Error configurando la solicitud: ${error.message}`,
                );
            }
        }
    }

    async FindCompromisosDePago(idcompra: number): Promise<any[]> {
        try {
            this.logger.log(
                `🔍 Ejecutando SP [Cbo_GestorDeCobranzasOperativoGatewayCobrador] para idcompra: ${idcompra}`,
            );
            const query = `EXEC [dbo].[Cbo_GestorDeCobranzasOperativoGatewayCobrador]
                @idcompra = @0
                `;
            const datos: any[] =
                await this.cboGestorCobranzasRepository.query(query, [
                    idcompra
                ]);
            this.logger.log(`✅ SP ejecutado exitosamente. Registros obtenidos: ${datos.length} `);
            return datos;
        }
        catch (error) {
            this.logger.error(
                `❌ Error ejecutando SP [Cbo_GestorDeCobranzasOperativoGatewayCobrador]: ${error.message} `,
                error.stack,
            );
            throw new InternalServerErrorException(
                'Error al obtener los compromisos de pago. Por favor intente más tarde.',
            );
        }
    }


}



