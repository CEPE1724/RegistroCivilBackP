/*CREATE   TABLE CupoCredito (
    idCupoCredito UNIQUEIDENTIFIER NOT NULL DEFAULT NEWID() PRIMARY KEY,
    MontoDesde DECIMAL(18,2) NOT NULL,
    MontoHasta DECIMAL(18,2) NOT NULL,
    Activo BIT NOT NULL DEFAULT 1,
	Autonomia BIT NOT NULL DEFAULT 0,
	Parcial BIT NOT NULL DEFAULT 0,
	SinAutonomia BIT NOT NULL DEFAULT 0,
    FechaSistema DATETIME NOT NULL DEFAULT GETDATE()
);
GO*/
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
@Entity('CupoCredito')
export class CupoCredito {
    @PrimaryGeneratedColumn('uuid')
    idCupoCredito: string;

    @Column({ type: 'decimal', precision: 18, scale: 2 })
    MontoDesde: number;

    @Column({ type: 'decimal', precision: 18, scale: 2 })
    MontoHasta: number;

    @Column({ type: 'bit', default: true })
    Activo: boolean;

    @Column({ type: 'bit', default: false })
    Autonomia: boolean;

    @Column({ type: 'bit', default: false })
    Parcial: boolean;

    @Column({ type: 'bit', default: false })
    SinAutonomia: boolean;

    @Column({ type: 'datetime', default: () => 'GETDATE()' })
    FechaSistema: Date;

    /*Porcentaje DECIMAL(18,2) NOT NULL,*/

    @Column({ type: 'decimal', precision: 18, scale: 2 })
    Porcentaje: number;


}

