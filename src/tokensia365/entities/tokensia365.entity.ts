/*/*CREATE  TABLE Tokensia365 (
    idTokensia365 INT IDENTITY(1,1) PRIMARY KEY,
    status INT NOT NULL,
    tkn_token VARCHAR(255) NOT NULL,
    tkn_fecha_vencimiento DATETIME NOT NULL,
    usr_id INT NOT NULL,
    FechaSistema DATETIME DEFAULT GETDATE()
);*/

import { Column, Entity, PrimaryGeneratedColumn, BeforeInsert } from "typeorm";
@Entity('Tokensia365')  // Explicitly setting the table name

export class Tokensia365 {
    @PrimaryGeneratedColumn('uuid', { name: 'idTokensia365' })
    idTokensia365: string;

    @Column()
    status: number;

    @Column({ name: 'tkn_token' })
    tkn_token: string;

    @Column({ name: 'tkn_fecha_vencimiento' })
    tkn_fecha_vencimiento: Date;

    @Column({ name: 'usr_id' })
    usr_id: number;

    @Column({ name: 'FechaSistema', default: () => 'CURRENT_TIMESTAMP' })
    FechaSistema: Date;
}

