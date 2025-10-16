
/*CREATE TABLE DFL_MetadataProcesada (
    idDFL_MetadataProcesada UNIQUEIDENTIFIER DEFAULT NEWID() PRIMARY KEY,
    idDFL_AnalisisBiometrico UNIQUEIDENTIFIER NOT NULL,
    identificacion VARCHAR(15),
    codigo_dactilar VARCHAR(10),
    nacionalidad VARCHAR(10),
    estado_civil VARCHAR(20),
    sexo VARCHAR(10),
    fecha_nacimiento DATE,
    fecha_emision DATE,
    fecha_caducidad DATE,
    FOREIGN KEY (idDFL_AnalisisBiometrico) REFERENCES DFL_AnalisisBiometrico(idDFL_AnalisisBiometrico)
);*/
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity('DFL_MetadataProcesada')
export class DflMetadataProcesada {
    @PrimaryGeneratedColumn('uuid')
    idDFL_MetadataProcesada: string;

    @Column({ type: 'uuid', name: 'idDFL_AnalisisBiometrico' })
    idDFL_AnalisisBiometrico: string;

    @Column({ type: 'varchar', length: 15, name: 'identificacion', nullable: true })
    identificacion: string;

    @Column({ type: 'varchar', length: 10, name: 'codigo_dactilar', nullable: true })
    codigo_dactilar: string;

    @Column({ type: 'varchar', length: 10, name: 'nacionalidad', nullable: true })
    nacionalidad: string;

    @Column({ type: 'varchar', length: 20, name: 'estado_civil', nullable: true })
    estado_civil: string;

    @Column({ type: 'varchar', length: 10, name: 'sexo', nullable: true })
    sexo: string;

    @Column({ type: 'date', name: 'fecha_nacimiento', nullable: true })
    fecha_nacimiento: Date;

    @Column({ type: 'date', name: 'fecha_emision', nullable: true })
    fecha_emision: Date;

    @Column({ type: 'date', name: 'fecha_caducidad', nullable: true })
    fecha_caducidad: Date;
}
