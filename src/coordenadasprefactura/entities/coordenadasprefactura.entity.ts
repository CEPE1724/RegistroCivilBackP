

import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('CoordenadasPrefactura')
export class Coordenadasprefactura {

    @PrimaryGeneratedColumn('increment') /// llave primaria o primary key
    idCoordenadasPrefactura: number;

	@Column('int')
    id: number;

    @Column('varchar', {
        length: 20
    })
    cedula: string;

    @Column('decimal', {
        precision: 9,
        scale: 6
    })
    latitud: number;

    @Column('decimal', {
        precision: 9,
        scale: 6
    })
    longitud: number;

    @Column('varchar', {
        length: 255
    })
    direccion: string;

    @Column('varchar', {
        length: 50
    })
    Usuario: string;

	@Column({ type: 'varchar', length: 50, nullable: true })
	ip: string;


    @Column('int')
    iEstado: number;

    @Column('datetime')
    FechaSistema: Date;

    @Column('int')
    Tipo: number;

	@Column({ type: 'simple-json', nullable: true })
	UrlImagen: string[];

    @Column('int', )
    web : number;

}
