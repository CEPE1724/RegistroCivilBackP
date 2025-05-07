/*CREATE TABLE [dbo].[EntidadesQueConsultaron](
	[idEntidadesQueConsultaron] [int] IDENTITY(1,1) NOT NULL,
	[idEQFX_IdentificacionConsultada] [int] NULL,
	[NombreCliente] [varchar](200) NULL,
	[Mes1] [varchar](10) NULL,
	[Mes2] [varchar](10) NULL,
	[Mes3] [varchar](10) NULL,
	[Mes4] [varchar](10) NULL,
	[Mes5] [varchar](10) NULL,
	[Mes6] [varchar](10) NULL,
	[Mes7] [varchar](10) NULL,
	[Mes8] [varchar](10) NULL,
	[Mes9] [varchar](10) NULL,
	[Mes10] [varchar](10) NULL,
	[Mes11] [varchar](10) NULL,
	[Mes12] [varchar](10) NULL,
	[ResaltadaInv] [char](1) NULL, */ 
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('EntidadesQueConsultaron')
export class EqfxEntidadesConsultada {
    @PrimaryGeneratedColumn()
    idEntidadesQueConsultaron: number;

    @Column({ type: 'int', nullable: true })
    idEQFX_IdentificacionConsultada: number;

    @Column({ length: 200, nullable: true })
    NombreCliente: string;

    @Column({ length: 10, nullable: true })
    Mes1: string;

    @Column({ length: 10, nullable: true })
    Mes2: string;

    @Column({ length: 10, nullable: true })
    Mes3: string;

    @Column({ length: 10, nullable: true })
    Mes4: string;

    @Column({ length: 10, nullable: true })
    Mes5: string;

    @Column({ length: 10, nullable: true })
    Mes6: string;

    @Column({ length: 10, nullable: true })
    Mes7: string;

    @Column({ length: 10, nullable: true })
    Mes8: string;

    @Column({ length: 10, nullable: true })
    Mes9: string;

    @Column({ length: 10, nullable: true })
    Mes10: string;

    @Column({ length: 10, nullable: true })
    Mes11: string;

    @Column({ length: 10, nullable: true })
    Mes12: string;

    @Column({ type:'char',length :1 ,nullable:true})
    ResaltadaInv:string;
}
