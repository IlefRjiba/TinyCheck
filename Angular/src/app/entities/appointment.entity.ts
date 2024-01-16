/* eslint-disable prettier/prettier */
import { Patient } from './patient.entites';
import { User } from './users.entity';

export class Appointment {

  constructor(
    public id = 0,
    public date = '',
    public time = '',
    public patient = Patient,
    public user: User
  ) {}
}