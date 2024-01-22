import { Appointment } from "./appointment.entity";
import { MedicalRecord } from "./medical-record.entity";
import { Patient } from "./patient.entites";

export class User {
  constructor(
    public id: number = 0,
    public username: string = '',
    public email: string = '',
    public phone: number = 0,
    public cin: number = 1,
    public password: string = '',
    public role: string = '',
    public appointments: Appointment[] = [],
    public patients: Patient[] = [],
    public medicalRecord: MedicalRecord[] = []
  ) {}

}