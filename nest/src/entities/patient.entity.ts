/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, JoinColumn , ManyToMany,JoinTable } from 'typeorm';
import { Appointment } from './Appointment.entity';
import { MedicalRecord } from '../entities/medical-record.entity';
import { User } from './user.entity';
@Entity()
export class Patient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
  @Column()
  lastname: string;
 
  @Column()
  Babyname: string;
  @Column()
  Babyage: number;
  @Column()
  Babypoid: number;
  
  @Column()
  Reason: string;
  @OneToMany(() => Appointment, (appointment) => appointment.patient)
  appointments: Appointment[];
  @OneToOne(() => MedicalRecord, (medicalRecord) => medicalRecord.patient)
  @JoinColumn()
  medicalRecord: MedicalRecord;
  @ManyToMany(() => User, (user) => user.patients)
  @JoinTable()
  users: User[];
}
