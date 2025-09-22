import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';

@Entity("CognoAfiliacionIess")
export class CognoAfiliacionIess {
    @PrimaryGeneratedColumn('uuid')
    idCognoAfiliacionIess: string;
  
    @Column()
    idCognoSolicitudCredito: number;

    @Column({ length: 20 })
    cedula: string;

    @Column({ length: 200 })
    nombre: string;

    @Column({ length: 50 })
    corte: string;

    @Column({ length: 100 })
    estado: string;

    @Column({ type: 'datetime', default: () => 'GETDATE()' })
    FechaSistema: Date;

}

