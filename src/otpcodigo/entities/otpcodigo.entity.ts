
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('OTP_CODIGO')
export class Otpcodigo {
  @PrimaryGeneratedColumn()
  idOTP_CODIGO: number;

    @Column({ type: 'nvarchar', length: 15, nullable: false })
    phone_number: string;

    @Column({ type: 'nvarchar', length: 6, nullable: false })
    otp_code: string;

    @Column({ type: 'datetime', nullable: true })
    created_at: Date;

    @Column({ type: 'datetime', nullable: false })
    expires_at: Date;

    @Column({ type: 'bit', nullable: false })
    is_used: boolean;

    @Column({ type: 'bit', nullable: false })
    is_verified: boolean;


}