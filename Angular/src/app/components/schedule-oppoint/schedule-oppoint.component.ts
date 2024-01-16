import { Component } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Appointment } from 'src/app/entities/appointment.entity';
import { Patient } from 'src/app/entities/patient.entites';
import { CalendarService } from 'src/app/services/calendar/calendar.service';

@Component({
  selector: 'app-schedule-oppoint',
  templateUrl: './schedule-oppoint.component.html',
  styleUrls: ['./schedule-oppoint.component.css']
})
export class ScheduleOppointComponent {

  constructor(private fb: FormBuilder, 
    private toastr: ToastrService , 
    private calendarService : CalendarService, 
    private router:Router) {}

  rdv !: Appointment;
  patient !: Patient; 

  parentName: string = "";
  parentSurname: string = "";
  phoneNumber: string = "";
  babyName: string = "";
  babyAge: number = 0;
  reasonOfAppointment: string = "";
  dateOfAppointment = this.calendarService.initializeDate();
  hourOfAppointment = this.calendarService.initializeHour();

  

addAppointment(formulaire: NgForm) {
  console.log(formulaire)
  if (formulaire.valid) {
    this.toastr.success('Rendez-vous ajouté avec succès');
  }
  else {
    this.toastr.error("Veuillez remplir tous les champs correctement")
  }
  }

  resetForm(formulaire: NgForm) {
      
      this.calendarService.resetDate();
      this.dateOfAppointment = ""
      this.hourOfAppointment = ""
      formulaire.resetForm();
    }

  backToSchedule() {
    this.router.navigate(['/viewOppointments']);
      }
}