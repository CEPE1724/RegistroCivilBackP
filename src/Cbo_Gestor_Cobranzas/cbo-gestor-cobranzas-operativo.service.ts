import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CboGestorCobranzas } from './cbo-gestor-cobranzas.entity';
import {
    CboGestorCobranzasOperativoFilterDto,
    CboGestorCobranzasOperativoResponseDto,
    CboGestorCobranzasOperativoPaginatedResponseDto,
} from './cbo-gestor-cobranzas-operativo.dto';

/**
 * Service para consumir el SP Cbo_GestorDeCobranzasOperativo
 * Maneja la lógica de filtrado y paginación de gestores de cobranzas
 */
@Injectable()
export class CboGestorCobranzasOperativoService {
    private readonly logger = new Logger(CboGestorCobranzasOperativoService.name);

    constructor(
        @InjectRepository(CboGestorCobranzas)
        private readonly cboGestorCobranzasRepository: Repository<CboGestorCobranzas>,
    ) { }


    async getGestoresCobranzasOperativo(
        filtros: CboGestorCobranzasOperativoFilterDto,
    ): Promise<CboGestorCobranzasOperativoPaginatedResponseDto> {
        try {
            // Validar parámetros
            const params = this.validarParametros(filtros);

            this.logger.log(
                `🔍 Ejecutando SP Cbo_GestorDeCobranzasOperativo con parámetros: ${JSON.stringify(params)}`,
            );

            // Ejecutar el SP directamente usando query con parámetros posicionales
            const query = `EXEC [dbo].[Cbo_GestorDeCobranzasOperativo]
                @DesdeDiasMora = @0,
                @HastaDiasMora = @1,
                @CobradorOperador = @2,
                @idOperadorCobrador = @3,
                @Gestionados = @4,
                @idCbo_ResultadoGestion = @5,
                @PageNumber = @6,
                @PageSize = @7,
                 @OrdenarPor = @8,
                 @Direccion = @9`; 

            const datos: CboGestorCobranzasOperativoResponseDto[] =
                await this.cboGestorCobranzasRepository.query(query, [
                    params.desdeDiasMora,
                    params.hastaDiasMora,
                    params.cobradorOperador,
                    params.idOperadorCobrador,
                    params.gestionados,
                    params.idCbo_ResultadoGestion,
                    params.pageNumber,
                    params.pageSize,
                    params.ordenarPor,
                    params.direccion,
                ]);

            this.logger.log(`✅ SP ejecutado exitosamente.Registros obtenidos: ${ datos.length } `);

            return {
                data: datos,
                pageNumber: params.pageNumber,
                pageSize: params.pageSize,
                totalCount: datos.length,
            };
        } catch (error) {
            this.logger.error(
                `❌ Error ejecutando SP Cbo_GestorDeCobranzasOperativo: ${ error.message } `,
                error.stack,
            );
            throw new InternalServerErrorException(
                'Error al obtener los gestores de cobranzas. Por favor intente más tarde.',
            );
        }
    }

    /**
     * Valida y normaliza los parámetros del filtro
     * @param filtros - Filtros del usuario
     * @returns Parámetros validados
     */
    private validarParametros(
        filtros: CboGestorCobranzasOperativoFilterDto,
    ): Required<CboGestorCobranzasOperativoFilterDto> {
        const desdeDiasMora = filtros.desdeDiasMora ?? 1;
        const hastaDiasMora = filtros.hastaDiasMora ?? 100000;
        const cobradorOperador = filtros.cobradorOperador ?? 0;
        const idOperadorCobrador = filtros.idOperadorCobrador ?? 0;
        const gestionados = filtros.gestionados ?? 0;
        const idCbo_ResultadoGestion = filtros.idCbo_ResultadoGestion ?? 0;
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
            pageNumber,
            pageSize,
        } as Required<CboGestorCobranzasOperativoFilterDto>;
    }

    /**
     * Método auxiliar para exportar datos a Excel o similares
     * @param filtros - Filtros de búsqueda
     * @returns Todos los datos sin paginación
     */
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
                `✅ Exportación completada.Total de registros: ${ response.data.length } `,
            );

            return response.data;
        } catch (error) {
            this.logger.error(`❌ Error exportando gestores de cobranzas: ${ error.message } `);
            throw error;
        }
    }
}
