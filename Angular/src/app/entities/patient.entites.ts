import { Appointment } from "./appointment.entity";
import { MedicalRecord } from "./medical-record.entity";
import { User } from "./users.entity";

export class Patient {

  public id = 0;
      public name = '';
      public lastname = '';
      public babyname = '';
      public babyage = '';
      public babypoid =0;
      public Reason = '';
      constructor(id: number, name: string, lastname: string, babyname: string, babyage: string, babypoid: number, reason: string) {
        this.id = id;
        this.name = name;
        this.lastname = lastname;
        this.babyname = babyname;
        this.babyage = babyage;
        this.babypoid = babypoid;
        this.Reason = reason;
        
      }
      }

