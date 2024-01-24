/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn  } from 'typeorm';
import { Patient } from '../entities/patient.entity';

@Entity()
export class MedicalRecord {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  notes: string;

  @OneToOne(() => Patient, patient => patient.medicalRecord)
  patient: Patient;


}


