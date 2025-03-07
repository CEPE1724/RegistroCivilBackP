
/*
CREATE  TABLE PermissionsWeb (
    idPermissionsWeb INT PRIMARY KEY IDENTITY(1,1),
    PermissionName NVARCHAR(50) NOT NULL,  -- Nombre de la acción (por ejemplo, "create", "edit", "delete", etc.)
	 FechaSistema DATETIME DEFAULT GETDATE(),
    Estacion VARCHAR(50) DEFAULT HOST_NAME(),
    Usuario VARCHAR(50) DEFAULT SUSER_NAME()
);*/


import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity('PermissionsWeb') // Explicitly setting the table name
export class PermissionsWeb {

    @PrimaryGeneratedColumn('increment')
    idPermissionsWeb: number;

    @Column('nvarchar', {
        length: 50,
        nullable: false
    })
    PermissionName: string;

    @Column('varchar', {
        length: 50,
        nullable: true
    })
    Usuario: string;

}