import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { CognoAfiliacionIess } from './cognoAfiliacionIess.entity';

@Entity("CognoAfiliacionIessEmpresa")

export class CognoAfiliacionIessEmpresa {
    @PrimaryGeneratedColumn('uuid')
    idCognoAfiliacionIessEmpresa: string;

    @Column()
    idCognoAfiliacionIess: string;

    @Column({ type: 'text', nullable: true })
    nombreEmpresa: string;

    @Column({ type: 'text', nullable: true })
    ruc: string;

    @Column({ type: 'datetime', default: () => 'GETDATE()' })
    FechaSistema: Date;

    @OneToOne(() => CognoAfiliacionIess)
    @JoinColumn({ name: 'idCognoAfiliacionIess' })
    afiliacionIess: CognoAfiliacionIess;
}


