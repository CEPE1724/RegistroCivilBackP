/*CREATE TABLE DFL_IndicadoresAnverso (
    idDFL_IndicadoresAnverso UNIQUEIDENTIFIER DEFAULT NEWID() PRIMARY KEY,
    idDFL_AnalisisBiometrico UNIQUEIDENTIFIER NOT NULL,
    identificacion VARCHAR(15),
    metadata NVARCHAR(MAX),
    esFotoEspejo VARCHAR(2),
    FOREIGN KEY (idDFL_AnalisisBiometrico) REFERENCES DFL_AnalisisBiometrico(idDFL_AnalisisBiometrico)
);*/

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { DflAnalisisBiometrico } from 'src/dfl_analisis-biometrico/entities/dfl_analisis-biometrico.entity';

@Entity('DFL_IndicadoresAnverso')

export class DflIndicadoresAnverso {
    @PrimaryGeneratedColumn('uuid', { name: 'idDFL_IndicadoresAnverso' })
    idDFL_IndicadoresAnverso: string

    @Column({ type: 'uuid', name: 'idDFL_AnalisisBiometrico' })
    idDFL_AnalisisBiometrico: string
    
    @Column({ length: 15, name: 'identificacion', nullable: true })
    identificacion: string
    @Column({ type: 'nvarchar', length: 'MAX', name: 'metadata', nullable: true })
    metadata: string
    @Column({ length: 2, name: 'esFotoEspejo', nullable: true })
    esFotoEspejo: string
}

