import { Appointment } from "./appointment.entity";
import { MedicalRecord } from "./medical-record.entity";
import { Patient } from "./patient.entites";

export class User {

  public appointments: Appointment[];
  public patients: Patient[];
  public medicalRecord: MedicalRecord;
    constructor(
        public id = 0,
        public username = '',
        public email = '',
        public phone = 0,
        public cin = 1,
        public password = '',
        public role = '',
        appointments: Appointment[],
        patients: Patient[],
        medicalRecord: MedicalRecord
  ) {
    this.appointments = appointments;
    this.patients = patients;
    this.medicalRecord = medicalRecord;
  }
}
