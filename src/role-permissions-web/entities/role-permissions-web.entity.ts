
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity('RolePermissionsWeb') // Explicitly setting the table name
export class RolePermissionsWeb {

    @PrimaryGeneratedColumn()  // Define una columna 'id' como la clave primaria
    idRolePermissionsWeb: number;

    @Column('int', {
        nullable: false
    })
    idRolesWeb: number;

    @Column('int', {
        nullable: false
    })
    idRoutesWeb: number;

    @Column('int', {
        nullable: false
    })
    idPermissionsWeb: number;

    @Column('varchar', {
        length: 50,
        nullable: true
    })
    Usuario: string;

}
