
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
@Entity('FIR_Documentos')
export class FirDocumento {
    @PrimaryGeneratedColumn('uuid')
    idFIR_Documento: string;

    @Column({ type: 'uuid' })
    idFIR_OperacionFirma: string;

    @Column({ type: 'varchar', length: 50, nullable: true })
    code: string;

    @Column({ type: 'varchar', length: 100, nullable: true })
    name: string;

    @Column({ type: 'nvarchar', length: 500, nullable: true })
    path: string;

    @Column({ type: 'varchar', length: 50, nullable: true })
    state_sign: string;

    @Column({ type: 'datetime', default: () => 'GETDATE()' })
    FechaSistema: Date;
}
