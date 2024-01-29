/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Patient } from './patient.entity';
import { User } from './user.entity';
@Entity()
export class Appointment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  date: Date;

  @Column()
  time: string;

  @Column()
  userId : number;

  @Column()
  patientId : number;

  @ManyToOne(() => Patient, (patient) => patient.appointments)
  patient: Patient;
  @ManyToOne(() => User, (user) => user.appointments)
  user: User;
}
