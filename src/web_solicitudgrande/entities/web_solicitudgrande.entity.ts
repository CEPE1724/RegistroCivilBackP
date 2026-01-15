
import { Column, Entity, PrimaryGeneratedColumn, BeforeInsert } from "typeorm";

@Entity('Web_SolicitudGrande')
export class WebSolicitudgrande {

    @PrimaryGeneratedColumn('increment')
    idWeb_SolicitudGrande: number;

    @Column('int', {
        default: 0
    })
    idCre_SolicitudWeb: number;

    @Column('int', {
        default: 0
    })
    idCognoSolicitudCredito: number;

    @Column('datetime', {
        default: () => 'GETDATE()'
    })
    Fecha: Date;

    @Column('int', {
        default: 1
    })
    idTipoDoc: number;

    @Column('varchar', {
        default: ''
    })
    Cedula: string;

    @Column('varchar', {
        default: ''
    })

    ApellidoPaterno: string;

    @Column('varchar', {
        default: ''
    })
    ApellidoMaterno: string;

    @Column('varchar', {
        default: ''
    })
    PrimerNombre: string;

    @Column('varchar', {
        default: ''
    })
    SegundoNombre: string;

    @Column('int', {
        default: 1
    })
    idEntidadFinanciera: number;

    @Column('varchar', {
        default: ''
    })
    NumeroSolicitud: string;

    @Column('int', {
        default: 0
    })

    Bodega: number;

    @Column('int', {
        default: 0
    })
    Garante: number;

    @Column('int', {
        default: 54
    })

    idNacionalidad: number;

    @Column('date', {
        nullable: true
    })

    FechaNacimiento: Date;

    @Column('int', {
        default: 1
    })
    idGenero: number;

    @Column('int', {
        default: 1
    })
    idProvinciaNacimiento: number;

    @Column('int', {
        default: 1
    })
    idCantonNacimiento: number;

    @Column('int', {
        default: 3
    })

    idEdoCivil: number;

    @Column('int', {
        default: 0
    })
    NumeroHijos: number;

    @Column('int', {
        default: 1
    })
    idNivelEducacion: number;

    @Column('int', {
        default: 8
    })
    idProfesion: number;

    @Column('int', {
        default: 3
    })
    idSituacionLaboral: number;

    @Column('int', {
        default: 1
    })

    idActEconomica: number;

    @Column('varchar', {
        default: ''
    })
    ObservacionesActividadEconomica: string;

    @Column('int', {
        default: 1
    })
    idProvinciaDomicilio: number;

    @Column('int', {
        default: 1
    })
    idCantonDomicilio: number;

    @Column('int', {
        default: 1
    })
    idParroquiaDomicilio: number;

    @Column('int', {
        default: 1
    })
    idBarrioDomicilio: number;

    @Column('varchar', {
        default: ''
    })
    Email: string;

    @Column('varchar', {
        default: ''
    })
    CallePrincipal: string;

    @Column('varchar', {
        default: ''
    })

    NumeroCasa: string;

    @Column('varchar', {
        default: ''
    })

    CalleSecundaria: string;

    @Column('varchar', {
        default: ''
    })

    ReferenciaUbicacion: string;

    @Column('varchar', {
        default: ''
    })

    TelefonoDomicilio: string;

    @Column('varchar', {
        default: ''
    })

    TelefonoDomiliarDos: string;

    @Column('varchar', {
        default: ''
    })

    Celular: string;

    @Column('int', {
        default: 1
    })

    idTipoVivienda: number;

    @Column('int', {
        default: 1
    })

    idCre_Tiempo: number;

    @Column('varchar', {
        default: ''
    })

    NombreArrendador: string;

    @Column('varchar', {
        default: ''
    })

    TelefonoArrendador: string;

    @Column('varchar', {
        default: ''
    })

    CelularArrendador: string;

    @Column('int', {
        default: 1
    })

    idInmueble: number;

    @Column('int', {
        default: 1
    })

    idCantonInmueble: number;

    @Column('decimal', {
        precision: 10,   // Número máximo de dígitos en total (antes y después del punto decimal)
        scale: 2,        // Número de dígitos después del punto decimal
        default: 0,      // Valor por defecto si no se pasa nada
    })
    ValorInmmueble: number;

    @Column('int', {
        default: 1
    })

    idTipoDocConyuge: number;

    @Column('varchar', {
        default: ''
    })

    CedulaConyuge: string;

    @Column('varchar', {
        default: ''
    })

    ApellidoPaternoConyuge: string;

    @Column('varchar', {
        default: ''
    })

    PrimerNombreConyuge: string;

    @Column('varchar', {
        default: ''
    })

    SegundoNombreConyuge: string;

    @Column('int', {
        default: 54
    })

    idNacionalidadConyuge: number;

    @Column('date', {
        nullable: true
    })

    FechaNacimientoConyuge: Date;

    @Column('int', {
        default: 1
    })

    idGeneroConyuge: number;

    @Column('int', {
        default: 1
    })

    idNivelEducacionConyuge: number;

    @Column('int', {
        default: 8
    })

    idProfesionConyuge: number;

    @Column('int', {
        default: 0
    })

    idCre_ReferenciasClientes: number;

    @Column('varchar', {
        default: ''
    })

    NombreNegocio: string;

    @Column('int', {
        default: 1
    })

    idCre_TiempoNegocio: number;

    @Column('int', {
        default: 0
    })

    MetrosCuadrados: number;

    @Column('int', {
        default: 1
    })

    idProvinciaNegocio: number;

    @Column('int', {
        default: 1
    })

    idCantonNegocio: number;

    @Column('int', {
        default: 1
    })

    idParroquiaNegocio: number;

    @Column('int', {
        default: 1
    })

    idBarrioNegocio: number;

    @Column('varchar', {
        default: ''
    })

    CallePrincipalNegocio: string;

    @Column('varchar', {
        default: ''
    })

    NumeroCasaNegocio: string;

    @Column('varchar', {
        default: ''
    })

    CalleSecundariaNegocio: string;

    @Column('varchar', {
        default: ''
    })

    ReferenciaUbicacionNegocio: string;

    @Column('varchar', {
        default: ''
    })

    TelefonoNegocio: string;

    @Column('varchar', {
        default: ''
    })

    CelularNegocio: string;

    @Column('decimal', {
        default: 0
    })

    IngresosNegosio: number;

    @Column('decimal', {
        default: 0
    })

    EgresosNegocio: number;

    @Column('varchar', {
        default: ''
    })

    ActividadEconomicaNegocio: string;

    @Column('bit', {
        default: false
    })

    AfiliadoTributario: boolean;

    @Column('bit', {
        default: false
    })

    OblidagoLlevarContabilidad: boolean;

    @Column('varchar', {
        default: ''
    })

    NombreEmpresa: string;

    @Column('int', {
        default: 0
    })

    idTipoEmpresa: number;

    @Column('date', {
        nullable: true
    })

    FechaIngresoEmpresa: Date;

    @Column('decimal', {
        precision: 10,   // Número máximo de dígitos en total (antes y después del punto decimal)
        scale: 2,        // Número de dígitos después del punto decimal
        default: 0,      // Valor por defecto si no se pasa nada
    })
    IngresosTrabajo: number;

    @Column('decimal', {
        precision: 10,   // Número máximo de dígitos en total (antes y después del punto decimal)
        scale: 2,        // Número de dígitos después del punto decimal
        default: 0,      // Valor por defecto si no se pasa nada
    })
    EgresosTrabajo: number;

    @Column('int', {
        default: 0
    })

    idTipoContrato: number;

    @Column('int', {
        default: 0
    })

    idTipoSueldo: number;

    @Column('varchar', {
        default: ''
    })

    Departaento: string;

    @Column('int', {
        default: 0
    })

    idCargo: number;

    @Column('int', {
        default: 0
    })

    DiaPago: number;

    @Column('bit', {
        default: false
    })

    AfiliadoIESS: boolean;

    @Column('int', {
        default: 0
    })

    idProvinciaTrabajo: number;

    @Column('int', {
        default: 0
    })

    idCantonTrabajo: number;

    @Column('int', {
        default: 0
    })

    idParroquiaTrabajo: number;

    @Column('int', {
        default: 0
    })

    idBarrioTrabajo: number;

    @Column('varchar', {
        default: ''
    })

    CallePrincipalTrabajo: string;

    @Column('varchar', {
        default: ''
    })

    NumeroCasaTrabajo: string;

    @Column('varchar', {
        default: ''
    })

    CalleSecundariaTrabajo: string;

    @Column('varchar', {
        default: ''
    })

    ReferenciaUbicacionTrabajo: string;

    @Column('varchar', {
        default: ''
    })

    TelefonoTrabajo: string;

    @Column('varchar', {
        default: ''
    })

    CelularTrabajo: string;

    @Column('varchar', {
        default: ''
    })

    Ext: string;

    @Column('varchar', {
        default: ''
    })

    RangoIngresos: string;

    @Column('decimal', {
        default: 0
    })

    CapacidadPago: number;

    @Column('decimal', {
        default: 0
    })

    TotalVencido: number;

    @Column('varchar', {
        default: ''
    })

    ResultadoEquifax: string;

    @Column('decimal', {
        default: 0
    })

    CarteraCastigada: number;

    @Column('varchar', {
        default: ''
    })

    SegmentacionEquifax: string;

    @Column('decimal', {
        default: 0
    })

    Score: number;

    @Column('decimal', {
        default: 0
    })

    ScoreInclusion: number;

    @Column('decimal', {
        default: 0
    })

    ScoreSobreendeudamiento: number;

    @Column('datetime', {
        nullable: true
    })

    FechaSoliciudCompleta: Date;

    @Column('int', {
        default: 0
    })

    idTipoCliente: number;

    @Column('int', {
        default: 0
    })

    idDetalleTipoCliente: number;

    @Column('decimal', {
        default: 0
    })

    CuotaAsignada: number;

    @Column('int', {
        default: 0
    })

    idEstadoSolicitud: number;

    @Column('decimal', {
        default: 0
    })

    Cupo: number;

    @Column('int', {
        default: 0
    })

    idTipoCalificacion: number;

    @Column('int', {
        default: 0
    })

    idSituacionLaboralFactores: number;

    @Column('int', {
        default: 0
    })

    idNegadoPendiente: number;

    @Column('varchar', {
        default: ''
    })

    Observaciones: string;

    @Column('datetime', {
        nullable: true
    })

    FechaInicioVerificacionTelefonica: Date;

    @Column('datetime', {
        nullable: true
    })

    FechaFinVerificacionTelefonica: Date;

    @Column('datetime', {
        nullable: true
    })

    FechaPausaVerificacionTelefonica: Date;

    @Column('datetime', {
        nullable: true
    })

    FechaReanudacionVerificacionTelefonica: Date;

    @Column('datetime', {
        nullable: true
    })

    FechaInicioVerificacionDocumental: Date;

    @Column('datetime', {
        nullable: true
    })

    FechaFinVerificacionDocumental: Date;

    @Column('datetime', {
        nullable: true
    })

    FechaPausaVerificacionDocumental: Date;

    @Column('datetime', {
        nullable: true
    })

    FechaReanudacionVerificacionDocumental: Date;

    @Column('datetime', {
        nullable: true
    })

    FechaInicioVerificacionTerrena: Date;

    @Column('datetime', {
        nullable: true
    })

    FechaFinVerificacionTerrena: Date;

    @Column('datetime', {
        nullable: true
    })

    FechaPausaVerificacionTerrena: Date;

    @Column('datetime', {
        nullable: true
    })

    FechaReanudacionVerificacionTerrena: Date;

    @Column('int', {
        default: 0
    })

    EstadoVerificacionTelefonica: number;

    @Column('int', {
        default: 0
    })

    EstadoVerificacionDocumental: number;

    @Column('int', {
        default: 0
    })

    EstadoVerificacionTerrena: number;

    @Column('int', {
        default: 0
    })

    EstadoPausaVerificacionTelefonica: number;

    @Column('int', {
        default: 0
    })

    EstadoPausaVerificacionDocumental: number;

    @Column('int', {
        default: 0
    })

    EstadoPausaVerificacionTerrena: number;

    @Column('varchar', {
        default: ''
    })

    NotasVerificacionTelefonica: string;

    @Column('varchar', {
        default: ''
    })

    NotasVerificacionDocumental: string;

    @Column('varchar', {
        default: ''
    })

    NotasVerificacionTerrena: string;

    @Column('int', {
        nullable: true
    })

    TiempoTotalVerificacionTelefonica: number;

    @Column('int', {
        nullable: true
    })

    TiempoTotalVerificacionDocumental: number;

    @Column('int', {
        nullable: true
    })

    TiempoTotalVerificacionTerrena: number;

    @Column('int', {
        default: 0
    })

    EstadoGeneralSolicitud: number;

    @Column('varchar', {
        default: ''
    })
    Facebook: string;

    @Column('varchar', {
        default: ''
    })
    JefeInmediato: string;

    @Column('varchar', {
        default: ''
    })
    CelularInmediato: string;

    @Column('varchar', {
        default: ''
    })
    JefeInmediatoIndependiente: string;

    @Column('varchar', {
        default: ''
    })
    CelularInmediatoIndependiente: string;

    @Column({ type: 'bit', default: false })
    CupoCredito: boolean;

}
