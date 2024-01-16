/* eslint-disable prettier/prettier */
// user.entity.ts
import { Entity, PrimaryGeneratedColumn, Column , OneToMany, OneToOne, JoinColumn, ManyToMany} from 'typeorm';
import { Role } from "../enums/role.enum";
import { Appointment } from './Appointment.entity';
import { Patient } from './patient.entity';
import { MedicalRecord } from './medical-record.entity';
@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column({ unique: true })
    email: string;
    @Column()
    phone: number;
    @Column()
    password: string;

    @Column({ default: Role.User })
    role: Role;

    @OneToMany(() => Appointment, (appointment) => appointment.user)
    appointments: Appointment[];

    // Relation OneToMany avec les patients (un utilisateur peut avoir plusieurs patients)
    @ManyToMany(() => Patient, (patient) => patient.users)
    patients: Patient[];

    // Relation OneToOne avec la fiche médicale (un utilisateur a une seule fiche médicale)
    @OneToOne(() => MedicalRecord, (medicalRecord) => medicalRecord.user)
    @JoinColumn()
    medicalRecord: MedicalRecord;

}
