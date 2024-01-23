import { Component } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Appointment } from 'src/app/entities/appointment.entity';
import { Patient } from 'src/app/entities/patient.entites';
import { AppointmentsService } from 'src/app/services/appointments/appointments.service';
import { CalendarService } from 'src/app/services/calendar/calendar.service';

@Component({
  selector: 'app-schedule-oppoint',
  templateUrl: './schedule-oppoint.component.html',
  styleUrls: ['./schedule-oppoint.component.css'],
})
export class ScheduleOppointComponent {
  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private calendarService: CalendarService,
    private router: Router,
    private appointmentServie: AppointmentsService
  ) {}

  viewform: boolean = true;

  rdv!: Appointment;
  patient!: Patient;

  NameOfParent: string = '';
  SurnameOfParent: string = '';
  NameOfBaby: string = '';
  AgeOfBaby: string = '';
  WeightOfBaby: number = 0;
  ReasonOfAppointment: string = '';
  dateOfAppointment = this.calendarService.initializeDate();
  hourOfAppointment = this.calendarService.initializeHour();

  addAppointment(formulaire: NgForm) {
    if (formulaire.valid) {
      const rdvDate = this.calendarService
        .returnDate(this.dateOfAppointment, this.hourOfAppointment)
        .toISOString();
      this.rdv = new Appointment(rdvDate.toString(), this.hourOfAppointment);
      this.patient = new Patient(
        this.NameOfParent,
        this.SurnameOfParent,
        this.NameOfBaby,
        this.AgeOfBaby,
        this.WeightOfBaby,
        this.ReasonOfAppointment
      );
      this.appointmentServie.addAppointment(this.rdv, this.patient);
    } else {
      this.toastr.error('Veuillez remplir tous les champs correctement');
    }
  }

  resetForm(formulaire: NgForm) {
    this.calendarService.resetDate();
    this.dateOfAppointment = '';
    this.hourOfAppointment = '';
    formulaire.resetForm();
  }

  backToSchedule() {
    this.router.navigate(['/viewOppointments']);
  }
}
