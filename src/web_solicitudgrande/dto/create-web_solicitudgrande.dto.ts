import {
    IsNotEmpty,
    IsNumber,
    IsString,
    IsDate,
    IsOptional,
    IsPositive,
    MinLength,
    IsEmail,
    IsDecimal,
    IsBoolean,
  } from 'class-validator';
  import { Type } from 'class-transformer';
  
  export class CreateWebSolicitudgrandeDto {
  
    @IsOptional()
    @IsNumber()
    @IsPositive()
    readonly idCre_SolicitudWeb?: number;
  
    @IsOptional()
    @IsNumber()
    @IsPositive()
    readonly idCognoSolicitudCredito?: number;
  
    @IsOptional()
    @IsDate()
    @Type(() => Date)
    readonly Fecha?: Date;
  
    @IsOptional()
    @IsNumber()
    @IsPositive()
    readonly idTipoDoc?: number;
  
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    readonly Cedula: string;
  
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    readonly ApellidoPaterno: string;
  
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    readonly ApellidoMaterno: string;
  
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    readonly PrimerNombre: string;
  
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    readonly SegundoNombre: string;
  
    @IsOptional()
    @IsNumber()
    @IsPositive()
    readonly idEntidadFinanciera?: number;
  
    @IsOptional()
    @IsString()
    @MinLength(1)
    readonly NumeroSolicitud?: string;
  
    @IsOptional()
    @IsNumber()
    @IsPositive()
    readonly Bodega?: number;
  
    @IsOptional()
    @IsNumber()
    @IsPositive()
    readonly Garante?: number;
  
    @IsOptional()
    @IsNumber()
    @IsPositive()
    readonly idNacionalidad?: number;
  
    @IsOptional()
    @IsDate()
    @Type(() => Date)
    readonly FechaNacimiento?: Date;
  
    @IsOptional()
    @IsNumber()
    @IsPositive()
    readonly idGenero?: number;
  
    @IsOptional()
    @IsNumber()
    @IsPositive()
    readonly idProvinciaNacimiento?: number;
  
    @IsOptional()
    @IsNumber()
    @IsPositive()
    readonly idCantonNacimiento?: number;
  
    @IsOptional()
    @IsNumber()
    @IsPositive()
    readonly idEdoCivil?: number;
  
    @IsOptional()
    @IsNumber()
    readonly NumeroHijos?: number;
  
    @IsOptional()
    @IsNumber()
    @IsPositive()
    readonly idNivelEducacion?: number;
  
    @IsOptional()
    @IsNumber()
    @IsPositive()
    readonly idProfesion?: number;
  
    @IsOptional()
    @IsNumber()
    @IsPositive()
    readonly idSituacionLaboral?: number;
  
    @IsOptional()
    @IsNumber()
    @IsPositive()
    readonly idActEconomica?: number;
  
    @IsOptional()
    @IsString()
    @MinLength(1)
    readonly ObservacionesActividadEconomica?: string;
    
    @IsOptional()
    @IsNumber()
    @IsPositive()
    readonly idProvinciaDomicilio?: number;
  
    @IsOptional()
    @IsNumber()
    @IsPositive()
    readonly idCantonDomicilio?: number;
  
    @IsOptional()
    @IsNumber()
    @IsPositive()
    readonly idParroquiaDomicilio?: number;
  
    @IsOptional()
    @IsNumber()
    @IsPositive()
    readonly idBarrioDomicilio?: number;
  
    @IsOptional()
    @IsEmail()
    @MinLength(3)
    readonly Email?: string;
  
    @IsOptional()
    @IsString()
    @MinLength(1)
    readonly CallePrincipal?: string;
  
    @IsOptional()
    @IsString()
    @MinLength(1)
    readonly NumeroCasa?: string;
  
    @IsOptional()
    @IsString()
    @MinLength(1)
    readonly CalleSecundaria?: string;
  
    @IsOptional()
    @IsString()
    @MinLength(1)
    readonly ReferenciaUbicacion?: string;
  
    @IsOptional()
    @IsString()
    readonly TelefonoDomicilio?: string;
  
    @IsOptional()
    @IsString()
    readonly TelefonoDomiliarDos?: string;
  
    @IsOptional()
    @IsString()
    @MinLength(1)
    readonly Celular?: string;
  
    @IsOptional()
    @IsNumber()
    @IsPositive()
    readonly idTipoVivienda?: number;
  
    @IsOptional()
    @IsNumber()
    @IsPositive()
    readonly idCre_Tiempo?: number;
  
    @IsOptional()
    @IsString()
    readonly NombreArrendador?: string;
  
    @IsOptional()
    @IsString()
    readonly TelefonoArrendador?: string;
  
    @IsOptional()
    @IsString()
    readonly CelularArrendador?: string;
  
    @IsOptional()
    @IsNumber()
    @IsPositive()
    readonly idInmueble?: number;
  
    @IsOptional()
    @IsNumber()
    @IsPositive()
    readonly idCantonInmueble?: number;
  
    @IsOptional()
    @IsNumber()
    readonly ValorInmmueble?: number;
  
    @IsOptional()
    @IsNumber()
    @IsPositive()
    readonly idTipoDocConyuge?: number;
  
    @IsOptional()
    @IsString()
    @MinLength(1)
    readonly CedulaConyuge?: string;
  
    @IsOptional()
    @IsString()
    @MinLength(1)
    readonly ApellidoPaternoConyuge?: string;
  
    @IsOptional()
    @IsString()
    @MinLength(1)
    readonly PrimerNombreConyuge?: string;
  
    @IsOptional()
    @IsString()
    @MinLength(1)
    readonly SegundoNombreConyuge?: string;
  
    @IsOptional()
    @IsNumber()
    @IsPositive()
    readonly idNacionalidadConyuge?: number;
  
    @IsOptional()
    @IsDate()
    @Type(() => Date)
    readonly FechaNacimientoConyuge?: Date;
  
    @IsOptional()
    @IsNumber()
    @IsPositive()
    readonly idGeneroConyuge?: number;
  
    @IsOptional()
    @IsNumber()
    @IsPositive()
    readonly idNivelEducacionConyuge?: number;
  
    @IsOptional()
    @IsNumber()
    @IsPositive()
    readonly idProfesionConyuge?: number;
  
    @IsOptional()
    @IsString()
    @MinLength(1)
    readonly NombreNegocio?: string;
  
    @IsOptional()
    @IsNumber()
    @IsPositive()
    readonly idCre_TiempoNegocio?: number;
  
    @IsOptional()
    @IsDecimal()
    readonly IngresosNegosio?: number;
  
    @IsOptional()
    @IsDecimal()
    readonly EgresosNegocio?: number;
  
    @IsOptional()
    @IsString()
    @MinLength(1)
    readonly ActividadEconomicaNegocio?: string;
  
    @IsOptional()
    @IsBoolean()
    readonly AfiliadoTributario?: boolean;
  
    @IsOptional()
    @IsBoolean()
    readonly OblidagoLlevarContabilidad?: boolean;
  
    @IsOptional()
    @IsString()
    @MinLength(1)
    readonly NombreEmpresa?: string;
  
    @IsOptional()
    @IsNumber()
    @IsPositive()
    readonly idTipoEmpresa?: number;
  
    @IsOptional()
    @IsDecimal()
    readonly IngresosTrabajo?: number;
  
    @IsOptional()
    @IsDecimal()
    readonly EgresosTrabajo?: number;
  
    @IsOptional()
    @IsNumber()
    @IsPositive()
    readonly idTipoContrato?: number;
  
    @IsOptional()
    @IsNumber()
    @IsPositive()
    readonly idTipoSueldo?: number;
  
    @IsOptional()
    @IsString()
    @MinLength(1)
    readonly Departaento?: string;
  
    @IsOptional()
    @IsNumber()
    @IsPositive()
    readonly idCargo?: number;
  
    @IsOptional()
    @IsNumber()
    @IsPositive()
    readonly DiaPago?: number;
  
    @IsOptional()
    @IsBoolean()
    readonly AfiliadoIESS?: boolean;
  
    @IsOptional()
    @IsNumber()
    @IsPositive()
    readonly idProvinciaTrabajo?: number;
  
    @IsOptional()
    @IsNumber()
    @IsPositive()
    readonly idCantonTrabajo?: number;
  
    @IsOptional()
    @IsNumber()
    @IsPositive()
    readonly idParroquiaTrabajo?: number;
  
    @IsOptional()
    @IsNumber()
    @IsPositive()
    readonly idBarrioTrabajo?: number;
  
    @IsOptional()
    @IsDecimal()
    readonly CapacidadPago?: number;
  
    @IsOptional()
    @IsDecimal()
    readonly TotalVencido?: number;
  
    @IsOptional()
    @IsDecimal()
    readonly CarteraCastigada?: number;
  
    @IsOptional()
    @IsDecimal()
    readonly Score?: number;
  
    @IsOptional()
    @IsDecimal()
    readonly ScoreInclusion?: number;
  
    @IsOptional()
    @IsDecimal()
    readonly ScoreSobreendeudamiento?: number;
  
    @IsOptional()
    @IsNumber()
    @IsPositive()
    readonly idTipoCliente?: number;
  
    @IsOptional()
    @IsNumber()
    @IsPositive()
    readonly idDetalleTipoCliente?: number;
  
    @IsOptional()
    @IsDecimal()
    readonly CuotaAsignada?: number;
  
    @IsOptional()
    @IsNumber()
    @IsPositive()
    readonly idEstadoSolicitud?: number;
  
    @IsOptional()
    @IsDecimal()
    readonly Cupo?: number;
  
    @IsOptional()
    @IsNumber()
    @IsPositive()
    readonly idTipoCalificacion?: number;
  
    @IsOptional()
    @IsNumber()
    @IsPositive()
    readonly idSituacionLaboralFactores?: number;
  
    @IsOptional()
    @IsNumber()
    @IsPositive()
    readonly idNegadoPendiente?: number;
  
    @IsOptional()
    @IsString()
    @MinLength(1)
    readonly Observaciones?: string;
  
    @IsOptional()
    @IsDate()
    @Type(() => Date)
    readonly FechaSoliciudCompleta?: Date;
  
    @IsOptional()
    @IsNumber()
    @IsPositive()
    readonly EstadoVerificacionTelefonica?: number;
  
    @IsOptional()
    @IsNumber()
    @IsPositive()
    readonly EstadoVerificacionDocumental?: number;
  
    @IsOptional()
    @IsNumber()
    @IsPositive()
    readonly EstadoVerificacionTerrena?: number;
  
    @IsOptional()
    @IsNumber()
    @IsPositive()
    readonly EstadoPausaVerificacionTelefonica?: number;
  
    @IsOptional()
    @IsNumber()
    @IsPositive()
    readonly EstadoPausaVerificacionDocumental?: number;
  
    @IsOptional()
    @IsNumber()
    @IsPositive()
    readonly EstadoPausaVerificacionTerrena?: number;
  
    @IsOptional()
    @IsString()
    @MinLength(1)
    readonly NotasVerificacionTelefonica?: string;
  
    @IsOptional()
    @IsString()
    @MinLength(1)
    readonly NotasVerificacionDocumental?: string;
  
    @IsOptional()
    @IsString()
    @MinLength(1)
    readonly NotasVerificacionTerrena?: string;
  
    @IsOptional()
    @IsNumber()
    @IsPositive()
    readonly TiempoTotalVerificacionTelefonica?: number;
  
    @IsOptional()
    @IsNumber()
    @IsPositive()
    readonly TiempoTotalVerificacionDocumental?: number;
  
    @IsOptional()
    @IsNumber()
    @IsPositive()
    readonly TiempoTotalVerificacionTerrena?: number;
  
    @IsOptional()
    @IsString()
    @MinLength(1)
    readonly UsuarioAtencion?: string;
  
    @IsOptional()
    @IsDate()
    @Type(() => Date)
    readonly FechaAtencion?: Date;
  
    @IsOptional()
    @IsString()
    @MinLength(1)
    readonly UsuarioVerificacionTelefonica?: string;
  
    @IsOptional()
    @IsDate()
    @Type(() => Date)
    readonly FechaVerificacionTelefonica?: Date;
  
    @IsOptional()
    @IsString()
    @MinLength(1)
    readonly UsuarioVerificacionDocumental?: string;
  
    @IsOptional()
    @IsDate()
    @Type(() => Date)
    readonly FechaVerificacionDocumental?: Date;
  
    @IsOptional()
    @IsString()
    @MinLength(1)
    readonly UsuarioVerificacionTerrena?: string;
  
    @IsOptional()
    @IsDate()
    @Type(() => Date)
    readonly FechaVerificacionTerrena?: Date;
  
    @IsOptional()
    @IsNumber()
    @IsPositive()
    readonly idCodigoPostVerificacionTelefonica?: number;
  
    @IsOptional()
    @IsNumber()
    @IsPositive()
    readonly idCodigoPostVerificacionDocumental?: number;
  
    @IsOptional()
    @IsNumber()
    @IsPositive()
    readonly idCodigoPostVerificacionTerrena?: number;
  
    @IsOptional()
    @IsString()
    @MinLength(1)
    readonly NotasFinales?: string;
  
    @IsOptional()
    @IsDate()
    @Type(() => Date)
    readonly FechaCalificacionFinal?: Date;
  }
  