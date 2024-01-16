import { Component } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators, FormsModule } from '@angular/forms';
import { el } from 'date-fns/locale';
import { ToastrService } from 'ngx-toastr';
import { Appointment } from 'src/app/entities/appointment.entity';
import { Patient } from 'src/app/entities/patient.entites';

@Component({
  selector: 'app-schedule-oppoint',
  templateUrl: './schedule-oppoint.component.html',
  styleUrls: ['./schedule-oppoint.component.css']
})
export class ScheduleOppointComponent {
  rdv !: Appointment;
  patient !: Patient; 

  parentName: string = "";
  parentSurname: string = "";
  phoneNumber: string = "";
  babyName: string = "";
  babyAge: number = 0;
  reasonOfAppointment: string = "";
  dateOfAppointment: Date = new Date();
  hourOfAppointment: string = "";


  appointmentForm ! : FormGroup;
  hours = ['09:00', '09:30', '10:00', /* ...more hours... */ '17:30'];

  constructor(private fb: FormBuilder, private toastr: ToastrService) {}

addAppointment(formulaire: NgForm) {
  console.log(formulaire)
  if (formulaire.valid) {
    this.toastr.success('Rendez-vous ajouté avec succès');
  }
  else {
    this.toastr.error("Veuillez remplir tous les champs correctement")
  }
  }

  
}