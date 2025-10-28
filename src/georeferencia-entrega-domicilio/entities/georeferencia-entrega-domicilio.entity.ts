/* 
CREATE TABLE [dbo].[georeferenciaEntregaDomicilio](
	[idGeoEntregDom] [int] IDENTITY(1,1) NOT NULL,
	[Bodega] [int] NOT NULL,
	[cedula] [varchar](20) NOT NULL,
	[tipo] [varchar](50) NOT NULL,
	[idCompra] [int] NOT NULL,
	[Latitud] [decimal](9, 6) NULL,
	[Longitud] [decimal](9, 6) NULL,
	[FechaSistema] [datetime] NULL,
*/
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('georeferenciaEntrega')
export class GeoreferenciaEntregaDomicilio {

	@PrimaryGeneratedColumn('uuid')
	idGeoreferenciaEntrega: string;

	@Column({ type: 'int' })
	Bodega: number;

	@Column({ type: 'varchar', length: 20 })
	cedula: string;

	@Column({ type: 'varchar', length: 50 })
	tipo: string;

	@Column({ type: 'int' })
	idCompra: number;

	@Column("decimal", { precision: 18, scale: 15 })
	Latitud: number;

	@Column("decimal", { precision: 18, scale: 15 })
	Longitud: number;

	@Column({type: 'varchar', length: 50})
	codigoEntrega: string;

	@Column({ type: 'datetime', nullable: true })
	FechaSistema: Date | null;

}
