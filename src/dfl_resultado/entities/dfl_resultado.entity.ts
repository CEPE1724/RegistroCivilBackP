/*CREATE TABLE DFL_Resultado (
    idDFL_Resultado UNIQUEIDENTIFIER DEFAULT NEWID() PRIMARY KEY,
    idDFL_AnalisisBiometrico UNIQUEIDENTIFIER NOT NULL,
    ok_selfie_fuente BIT,
    es_selfie_valida BIT,
    ok_frontal_fuente BIT,
    existe_fuente BIT,
    cliente_en_lista_blanca BIT,
    codigo_dactilar_detectado BIT,
    es_cedula_mayor_edad BIT,
    es_cedula_vigente BIT,
    es_horario_valido BIT,
    fecha_nacimiento_detectada BIT,
    identificacion_detectada BIT,
    selfie_intentos_moderado BIT,
    texto_resumen NVARCHAR(MAX),
    FOREIGN KEY (idDFL_AnalisisBiometrico) REFERENCES DFL_AnalisisBiometrico(idDFL_AnalisisBiometrico)
);*/
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity('DFL_Resultado')
export class DflResultado {
    @PrimaryGeneratedColumn('uuid')
    idDFL_Resultado: string;

    @Column({ type: 'uuid', name: 'idDFL_AnalisisBiometrico' })
    idDFL_AnalisisBiometrico: string;

    @Column({ type: 'bit', name: 'ok_selfie_fuente', nullable: true })
    ok_selfie_fuente: boolean;

    @Column({ type: 'bit', name: 'es_selfie_valida', nullable: true })
    es_selfie_valida: boolean;

    @Column({ type: 'bit', name: 'ok_frontal_fuente', nullable: true })
    ok_frontal_fuente: boolean;

    @Column({ type: 'bit', name: 'existe_fuente', nullable: true })
    existe_fuente: boolean;

    @Column({ type: 'bit', name: 'cliente_en_lista_blanca', nullable: true })
    cliente_en_lista_blanca: boolean;

    @Column({ type: 'bit', name: 'codigo_dactilar_detectado', nullable: true })
    codigo_dactilar_detectado: boolean;

    @Column({ type: 'bit', name: 'es_cedula_mayor_edad', nullable: true })
    es_cedula_mayor_edad: boolean;

    @Column({ type: 'bit', name: 'es_cedula_vigente', nullable: true })
    es_cedula_vigente: boolean;

    @Column({ type: 'bit', name: 'es_horario_valido', nullable: true })
    es_horario_valido: boolean;

    @Column({ type: 'bit', name: 'fecha_nacimiento_detectada', nullable: true })
    fecha_nacimiento_detectada: boolean;

    @Column({ type: 'bit', name: 'identificacion_detectada', nullable: true })
    identificacion_detectada: boolean;

    @Column({ type: 'bit', name: 'selfie_intentos_moderado', nullable: true })
    selfie_intentos_moderado: boolean;

    @Column({ type: 'nvarchar', length: 'MAX', name: 'texto_resumen', nullable: true })
    texto_resumen: string;
}
