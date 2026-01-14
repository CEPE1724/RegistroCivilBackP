
/*CREATE TABLE FIR_OperacionFirma (
    idFIR_OperacionFirma UNIQUEIDENTIFIER DEFAULT NEWID() PRIMARY KEY,

    hash_operation VARCHAR(100) NOT NULL,
    code_client VARCHAR(50),
    code_bio VARCHAR(100),
    link NVARCHAR(500),

    time_signature_validity DATETIME,
    state VARCHAR(50),
    task VARCHAR(100),

    state_fiducia VARCHAR(50) NULL,
    message_fiducia NVARCHAR(500) NULL,

    status INT NOT NULL,
    message NVARCHAR(250),

    FechaSistema DATETIME DEFAULT GETDATE()
);
*/
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
@Entity('FIR_OperacionFirma')
export class FirOperacionFirma {
    @PrimaryGeneratedColumn('uuid')
    idFIR_OperacionFirma: string;
    @Column({ type: 'varchar', length: 100 })
    hash_operation: string
    @Column({ type: 'varchar', length: 50, nullable: true })
    code_client: string
    @Column({ type: 'varchar', length: 100, nullable: true })
    code_bio: string
    @Column({ type: 'nvarchar', length: 500, nullable: true })
    link: string
    @Column({ type: 'datetime', nullable: true })
    time_signature_validity: Date
    @Column({ type: 'varchar', length: 50, nullable: true })
    state: string
    @Column({ type: 'varchar', length: 100, nullable: true })
    task: string
    @Column({ type: 'varchar', length: 50, nullable: true })
    state_fiducia: string | null
    @Column({ type: 'nvarchar', length: 500, nullable: true })
    message_fiducia: string | null
    @Column({ type: 'int' })
    status: number
    @Column({ type: 'nvarchar', length: 250, nullable: true })
    message: string
    @Column({ type: 'datetime', default: () => 'GETDATE()' })
    FechaSistema: Date
}

