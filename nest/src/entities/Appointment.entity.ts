/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Patient } from './patient.entity';
import { User } from './user.entity';
@Entity()
export class Appointment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: Date;

  @Column()
  time: string;

  @ManyToOne(() => Patient, (patient) => patient.appointments)
  patient: Patient;
  @ManyToOne(() => User, (user) => user.appointments)
  user: User;
}
