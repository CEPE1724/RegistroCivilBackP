
/*CREATE TABLE FIR_Firmantes (
    idFIR_Firmante UNIQUEIDENTIFIER DEFAULT NEWID() PRIMARY KEY,

    idFIR_OperacionFirma UNIQUEIDENTIFIER NOT NULL,
    dni VARCHAR(20),
    name VARCHAR(100),
    first_last_name VARCHAR(100),
    second_last_name VARCHAR(100),
    email VARCHAR(150),

    sign_state VARCHAR(50) NULL,
    signed_at DATETIME NULL,

    FechaSistema DATETIME DEFAULT GETDATE(),
);*/
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
@Entity('FIR_Firmantes')
export class FirOperacionesfirma {
    @PrimaryGeneratedColumn('uuid')
    idFIR_Firmante: string;

    @Column({ type: 'uuid' })
    idFIR_OperacionFirma: string

    @Column({ type: 'varchar', length: 20, nullable: true })
    dni: string

    @Column({ type: 'varchar', length: 100, nullable: true })
    name: string

    @Column({ type: 'varchar', length: 100, nullable: true })
    first_last_name: string

    @Column({ type: 'varchar', length: 100, nullable: true })
    second_last_name: string

    @Column({ type: 'varchar', length: 150, nullable: true })
    email: string

    @Column({ type: 'varchar', length: 50, nullable: true })
    sign_state: string | null

    @Column({ type: 'datetime', nullable: true })
    signed_at: Date | null
    
    @Column({ type: 'datetime', default: () => 'GETDATE()' })
    FechaSistema: Date
}

    
