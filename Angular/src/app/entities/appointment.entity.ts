/* eslint-disable prettier/prettier */
import { Patient } from './patient.entites';
import { User } from './users.entity';

export class Appointment {

  constructor(
    public date: string = '',
    public time: string = '',
    public patient: Patient,
    public userId : number,
    public patientId: number
  ) {}
}