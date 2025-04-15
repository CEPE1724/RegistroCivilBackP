
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity('UserRolesWeb') // Explicitly setting the table name
export class UserRolesWeb {
    @PrimaryGeneratedColumn()  // Define una columna 'id' como la clave primaria
    idUserRolesWeb: number;
    
    @Column('int', {
        nullable: false
    })
    idUsuario: number;

    @Column('int', {
        nullable: false
    })
    idRolesWeb: number;

    @Column('varchar', {
        length: 50,
        nullable: true
    })
    Usuario: string;
}
