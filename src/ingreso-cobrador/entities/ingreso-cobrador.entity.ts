
/*COLUMN_NAME	DATA_TYPE	IS_NULLABLE
idIngresoCobrador	int	NO
Cedula	varchar	YES
Nombre	varchar	YES
idRegion	int	YES
Fecha	datetime	YES
FechaIngreso	datetime	YES
FechaSalida	datetime	YES
idCargo	int	YES
Codigo	varchar	YES
FechaSistema	datetime	YES
Usuario	varchar	YES
Estacion	varchar	YES*/

import { Entity, PrimaryGeneratedColumn,  Column, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { DispositivosApp } from 'src/dispositivos-app/entities/dispositivos-app.entity';

@Entity('IngresoCobrador')
export class IngresoCobrador {
	@PrimaryGeneratedColumn('increment')
	idIngresoCobrador: number;

	@Column('varchar', {
		length: 70,
		nullable: true
	})
	Nombre: string;

	@Column('datetime', {
		nullable: true
	})
	FechaSalida: Date;

	@Column('datetime', {
		nullable: true
	})
	FechaIngreso: Date;
  /* idCom_Estado */
	
	@Column('int', {
		nullable: true
	})
	idCom_Estado: number;


	@OneToMany(() => DispositivosApp, dispositivo => dispositivo.ingresoCobrador)
	dispositivos: DispositivosApp[];
}