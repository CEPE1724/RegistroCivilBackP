import { PartialType } from '@nestjs/mapped-types';
import { CreateClientesVerificacionTerrenaDto } from './create-clientes-verificacion-terrena.dto';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateClientesVerificacionTerrenaDto {

	@IsOptional()
	@IsString()
	readonly Numero?: string;

	@IsOptional()
	@IsNumber()
	readonly idCre_solicitud?: number;

	@IsOptional()
	@IsNumber()
	readonly idCre_DatosGenerales?: number;
	
	@IsOptional()
	@IsString()
	readonly Ruc?: string;
	
	@IsOptional()
	@IsString()
	readonly Nombres?: string;
	
	@IsOptional()
	@IsString()
	readonly Celular?: string;
	
	@IsOptional()
	@IsNumber()
	readonly  idVerificador?: number;
	
	@IsOptional()
	@IsNumber()
	readonly iEstado?: number;
	
	@IsOptional()
	@IsNumber()
	readonly  Bodega?: number;
	
	@IsOptional()
	@IsString()
	readonly Almacen?: string;
	
	@IsOptional()
	@IsBoolean()
	readonly bDomicilio?: boolean;
	
	@IsOptional()
    @IsBoolean()
    readonly bTrabajo?: boolean;
	
	@IsOptional()
    @IsBoolean()
    readonly bDomicilioVerifica?: boolean;
	
	@IsOptional()
    @IsBoolean()
    readonly bTrabajoVerifica?: boolean;
	
	@IsOptional()
	@IsNumber()
	readonly idTerrenaGestionDomicilio?: number;
	
	@IsOptional()
	@IsNumber()
	readonly idTerrenaGestionTrabajo?: number;
	
	@IsOptional()
	@IsString()
	readonly DireccionDomicilio?: string;
	
	@IsOptional()
	@IsString()
	readonly  DireccionTrabajo?: string;

	
	@IsOptional()
	@IsString()
	readonly  Usuario?: string;
	
	@IsOptional()
	@IsString()
	readonly  UrlGoogle?: string;
	
	@IsOptional()
	@IsString()
	readonly  UsuarioAnula?: string;
	
	@IsOptional()
	@IsString()
	readonly  NotaAnula?: string;	
	
	@IsOptional()
	@IsString()
	readonly  UsuarioAprueba?: string;
	
	@IsOptional()
	@IsString()
	readonly  NotaAprueba?: string;
	
	@IsOptional()
	@IsNumber()
	readonly Latitud?: number;
	
	@IsOptional()
	@IsNumber()
	readonly Longitud?: number;
	
	@IsOptional()
	@IsString()
	readonly  UrlPhoto?: string;
	
	@IsOptional()
	@IsString()
	readonly  JefeInmediato?: string;
	
	@IsOptional()
	@IsString()
	readonly  CelularInmediato?: string;
	
	@IsOptional()
	@IsNumber()
	readonly Afiliado?: number;
	
	@IsOptional()
	@IsNumber()
	readonly idTipoVivienda?: number;
	
	@IsOptional()
	@IsNumber()
	readonly idCre_TiempoVivienda?: number;
	
	@IsOptional()
	@IsNumber()
	readonly idCre_Tiempo?: number;
}
