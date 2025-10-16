
/*CREATE   TABLE DFL_MetadataProcesada (
    idDFL_MetadataProcesada UNIQUEIDENTIFIER DEFAULT NEWID() PRIMARY KEY,
    idDFL_AnalisisBiometrico UNIQUEIDENTIFIER NOT NULL,
    identificacion VARCHAR(15),
	nombre_completo VARCHAR(200),
    codigo_dactilar VARCHAR(10),
    nacionalidad VARCHAR(20),
    estado_civil VARCHAR(20),
    sexo VARCHAR(10),
    fecha_nacimiento DATE,
	lugar_nacimiento NVARCHAR(MAX),
    fecha_emision DATE,
    fecha_caducidad DATE,
    FOREIGN KEY (idDFL_AnalisisBiometrico) REFERENCES DFL_AnalisisBiometrico(idDFL_AnalisisBiometrico)
);
*/
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity('DFL_MetadataProcesada')
export class DflMetadataProcesada {
    @PrimaryGeneratedColumn('uuid')
    idDFL_MetadataProcesada: string;

    @Column({ type: 'uuid', name: 'idDFL_AnalisisBiometrico' })
    idDFL_AnalisisBiometrico: string;

    @Column({ type: 'varchar', length: 15, name: 'identificacion', nullable: true })
    identificacion: string;

    @Column({ type: 'varchar', length: 200, name: 'nombre_completo', nullable: true })
    nombre_completo: string;

    @Column({ type: 'varchar', length: 10, name: 'codigo_dactilar', nullable: true })
    codigo_dactilar: string;

    @Column({ type: 'varchar', length: 20, name: 'nacionalidad', nullable: true })
    nacionalidad: string;

    @Column({ type: 'varchar', length: 20, name: 'estado_civil', nullable: true })
    estado_civil: string;

    @Column({ type: 'varchar', length: 10, name: 'sexo', nullable: true })
    sexo: string;

    @Column({ type: 'date', name: 'fecha_nacimiento', nullable: true })
    fecha_nacimiento: Date;

    @Column({ type: 'date', name: 'fecha_emision', nullable: true })
    fecha_emision: Date;

    @Column({ type: 'nvarchar', name: 'lugar_nacimiento', nullable: true })
    lugar_nacimiento: string;

    @Column({ type: 'date', name: 'fecha_caducidad', nullable: true })
    fecha_caducidad: Date;
}
