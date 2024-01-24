/* eslint-disable prettier/prettier */
// user.entity.ts
import { Entity, PrimaryGeneratedColumn, Column , OneToMany, ManyToMany} from 'typeorm';
import { Role } from "../enums/role.enum";
import { Appointment } from './Appointment.entity';
import { Patient } from './patient.entity';

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
   

}
