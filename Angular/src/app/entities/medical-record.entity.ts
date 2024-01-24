import { Patient } from "./patient.entites";
import { User } from "./users.entity";


export class MedicalRecord {
  constructor(
    public id: number = 0,
    public notes: string = '',
    public patient: Patient,
    public user: User
  ) {}  
}


