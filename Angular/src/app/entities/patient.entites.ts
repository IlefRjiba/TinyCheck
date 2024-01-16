import { Appointment } from "./appointment.entity";
import { MedicalRecord } from "./medical-record.entity";
import { User } from "./users.entity";

export class Patient {

    constructor(
      public id = 0,
      public name = '',
      public lastname = '',
      public babyname = '',
      public babyage = '',
      public babypoid =0,
      public Reason = '',
      // public patient = Patient,
      // public appointments: Appointment[],
      // public medicalRecord: MedicalRecord,
      // public user: User[]
    ) {}
  }

