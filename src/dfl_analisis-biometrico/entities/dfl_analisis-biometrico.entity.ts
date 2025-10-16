/*CREATE TABLE DFL_AnalisisBiometrico (
    idDFL_AnalisisBiometrico UNIQUEIDENTIFIER DEFAULT NEWID() PRIMARY KEY,
    status INT NOT NULL,
    tipo VARCHAR(50),
    codigo VARCHAR(50),
    rostroSimilitud FLOAT,
    rostroSimilitudFrontal FLOAT,
    rostroSimilitudSelfie FLOAT,
    img_frontal NVARCHAR(MAX),
    img_reverso NVARCHAR(MAX),
    img_selfie NVARCHAR(MAX),
    bio_intento_frontal INT,
    bio_intento_reverso INT,
    bio_intento_selfie INT,
    bio_intento_dactilar INT,
    FechaSistema DATETIME DEFAULT GETDATE()
);*/

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity('DFL_AnalisisBiometrico')

export class DflAnalisisBiometrico {
    @PrimaryGeneratedColumn('uuid', { name: 'idDFL_AnalisisBiometrico' })
    idDFL_AnalisisBiometrico: string;
    @Column({ type: 'int', name: 'status' })
    status: number;
    @Column({ length: 50, name: 'tipo', nullable: true })
    tipo: string
    @Column({ length: 50, name: 'codigo', nullable: true })
    codigo: string
    @Column({ type: 'float', name: 'rostroSimilitud', nullable: true })
    rostroSimilitud: number;
    @Column({ type: 'float', name: 'rostroSimilitudFrontal', nullable: true })
    rostroSimilitudFrontal: number;
    @Column({ type: 'float', name: 'rostroSimilitudSelfie', nullable: true })
    rostroSimilitudSelfie: number;
    @Column({ type: 'nvarchar', length: 'MAX', name: 'img_frontal', nullable: true })
    img_frontal: string;
    @Column({ type: 'nvarchar', length: 'MAX', name: 'img_reverso', nullable: true })
    img_reverso: string;
    @Column({ type: 'nvarchar', length: 'MAX', name: 'img_selfie', nullable: true })
    img_selfie: string;
    @Column({ type: 'int', name: 'bio_intento_frontal', nullable: true })
    bio_intento_frontal: number;
    @Column({ type: 'int', name: 'bio_intento_reverso', nullable: true })
    bio_intento_reverso: number;
    @Column({ type: 'int', name: 'bio_intento_selfie', nullable: true })
    bio_intento_selfie: number;
    @Column({ type: 'int', name: 'bio_intento_dactilar', nullable: true })
    bio_intento_dactilar: number;
    @Column({ name: 'FechaSistema', default: () => 'CURRENT_TIMESTAMP' })
    FechaSistema: Date

    
}

