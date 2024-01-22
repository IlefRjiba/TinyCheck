import { Patient } from "./patient.entites";
import { User } from "./users.entity";


export class MedicalRecord {
  constructor(
    public id = 0,
    public notes = '',
    public patient : Patient,
    public user: User
  ) {}
}


