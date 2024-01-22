import { Appointment } from "./appointment.entity";
import { MedicalRecord } from "./medical-record.entity";
import { User } from "./users.entity";

export class Patient {

  constructor(
    public name: string = '',
    public lastname: string = '',
    public babyName: string = '',
    public babyAge: number = 0,
    public babyWeight: number = 0,
    public Reason: string = '',
    // public patient: Patient,
    // public appointments: Appointment[],
    // public medicalRecord: MedicalRecord,
    // public user: User[]
  ) {}
  
  }