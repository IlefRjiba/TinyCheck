/* eslint-disable prettier/prettier */
import { Patient } from './patient.entites';
import { User } from './users.entity';

export class Appointment {

  constructor(
    // public id: number = 0,
    public date: string = '',
    public time: string = '',
    // public patient: Patient,
    // public user: User = new User()
  ) {}
}