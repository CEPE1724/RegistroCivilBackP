
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity('RoutesWeb') // Explicitly setting the table name
export class Routesweb {

    @PrimaryGeneratedColumn('increment')
    idRoutesWeb: number;

    @Column('nvarchar', {
        length: 255,
        nullable: false
    })
    RouteName: string;

    @Column('nvarchar', {
        length: 255,
        nullable: false
    })
    RouteUrl: string;

    @Column('varchar', {
        length: 50,
        nullable: true
    })
    Usuario: string;
}