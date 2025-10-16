/*CREATE TABLE DFL_IndicadoresReverso (
    idDFL_IndicadoresReverso UNIQUEIDENTIFIER DEFAULT NEWID() PRIMARY KEY,
    idDFL_AnalisisBiometrico UNIQUEIDENTIFIER NOT NULL,
    confianza FLOAT,
    metadata NVARCHAR(MAX),
    codigoDactilar VARCHAR(10),
    confianza_indicadores NVARCHAR(MAX),
    codigoDactilarEncontrado VARCHAR(10),
    FOREIGN KEY (idDFL_AnalisisBiometrico) REFERENCES DFL_AnalisisBiometrico(idDFL_AnalisisBiometrico)
);*/

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

@Entity('DFL_IndicadoresReverso')
export class DflIndicadoresReverso {
     @PrimaryGeneratedColumn('uuid', { name: 'idDFL_IndicadoresReverso' })
     idDFL_IndicadoresReverso: string

        @Column({ type: 'uuid', name: 'idDFL_AnalisisBiometrico' })
        idDFL_AnalisisBiometrico: string
        
        @Column({ type: 'float', name: 'confianza', nullable: true })
        confianza: number

        @Column({ type: 'nvarchar', length: 'MAX', name: 'metadata', nullable: true })
        metadata: string

        @Column({ length: 10, name: 'codigoDactilar', nullable: true })
        codigoDactilar: string

        @Column({ type: 'nvarchar', length: 'MAX', name: 'confianza_indicadores', nullable: true })
        confianza_indicadores: string

        @Column({ length: 10, name: 'codigoDactilarEncontrado', nullable: true })
        codigoDactilarEncontrado: string
}

