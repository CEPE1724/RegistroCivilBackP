/*CREATE TABLE DFL_Referencia (
    idDFL_Referencia UNIQUEIDENTIFIER DEFAULT NEWID() PRIMARY KEY,
    idDFL_AnalisisBiometrico UNIQUEIDENTIFIER NOT NULL,
    identificacion VARCHAR(15),
    codigo_dactilar VARCHAR(10),
    fecha_nacimiento DATE,
    fecha_mayor_edad DATE,
    edad_actual VARCHAR(20),
    fecha_actual DATE,
    FOREIGN KEY (idDFL_AnalisisBiometrico) REFERENCES DFL_AnalisisBiometrico(idDFL_AnalisisBiometrico)
);*/
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity('DFL_Referencia')
export class DflReferencia {

    @PrimaryGeneratedColumn('uuid')
    idDFL_Referencia: string;

    @Column({ type: 'uuid', name: 'idDFL_AnalisisBiometrico' })
    idDFL_AnalisisBiometrico: string;

    @Column({ type: 'varchar', length: 15, name: 'identificacion', nullable: true })
    identificacion: string;

    @Column({ type: 'varchar', length: 10, name: 'codigo_dactilar', nullable: true })
    codigo_dactilar: string;

    @Column({ type: 'date', name: 'fecha_nacimiento', nullable: true })
    fecha_nacimiento: Date;

    @Column({ type: 'date', name: 'fecha_mayor_edad', nullable: true })
    fecha_mayor_edad: Date;

    @Column({ type: 'varchar', length: 20, name: 'edad_actual', nullable: true })
    edad_actual: string;

    @Column({ type: 'date', name: 'fecha_actual', nullable: true })
    fecha_actual: Date;
}
