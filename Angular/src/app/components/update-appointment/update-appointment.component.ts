import { Component, Input } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { User } from 'src/app/entities/users.entity';
import { ToastrService } from 'ngx-toastr';
import { CalendarService } from 'src/app/services/calendar/calendar.service';
import { Router } from '@angular/router';
import { AppointmentsService } from 'src/app/services/appointments/appointments.service';
import { UserService } from 'src/app/services/user/user.service';
import { Appointment } from 'src/app/entities/appointment.entity';
import { Patient } from 'src/app/entities/patient.entites';
import { PatientService } from 'src/app/services/patient/patient.service';
import { Observable } from 'rxjs';
import * as moment from 'moment';

@Component({
  selector: 'app-update-appointment',
  templateUrl: './update-appointment.component.html',
  styleUrls: ['./update-appointment.component.css'],
})
export class UpdateAppointmentComponent {
  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private calendarService: CalendarService,
    private router: Router,
    private appointmentServie: AppointmentsService,
    private userService: UserService,
    private patientService: PatientService
  ) {}

  rdv!: Appointment;
  patient!: Patient;

  NameOfParent = '';
  SurnameOfParent: string = '';
  NameOfBaby: string = '';
  AgeOfBaby: string = '';
  WeightOfBaby: number = 0;
  ReasonOfAppointment: string = '';
  dateOfAppointment = this.calendarService.initializeDate();
  hourOfAppointment = this.calendarService.initializeHour();

  resetForm() {
    this.initializeForm();
  }

  backToSchedule() {
    this.toastr.info('Your changes have been discarded');
    this.router.navigate(['/viewOppointments']);
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  updateAppointment(formulaire: NgForm) {
    if (formulaire.invalid) {
      this.toastr.error('Please fill all the fields correctly');
    } else {
      // this.calendarService.deleteAppointment(this.rdv)
      this.readForm();
      this.patientService
        .updatePatient(this.patient, this.rdv.patientId)
        .subscribe({
          next: () => {
            this.appointmentServie
              .updateAppointment(
                this.appointmentServie.updatedAppointmentId,
                this.rdv
              )
              .subscribe({
                next: () =>
                  this.toastr.success('Appointment updated successfully'),
              });
          },
        });
      this.router.navigate(['/viewOppointments']);
    }
  }

  initializeForm() {
    this.rdv = this.appointmentServie.updatedAppointment;
    this.patientService.getPatientById(this.rdv.patientId).subscribe({
      next: (patient) => {
        this.patient = patient;
        console.log(this.patient);
        this.NameOfParent = patient.name;
        this.SurnameOfParent = patient.lastname;
        this.NameOfBaby = patient.Babyname;
        this.AgeOfBaby = patient.Babyage;
        this.WeightOfBaby = patient.babypoid;
        this.ReasonOfAppointment = patient.Reason;
        this.hourOfAppointment = this.rdv.time;
        const d = this.calendarService.returnDate(this.rdv.date, this.rdv.time);
        console.log(d)
      },
      error: (error) => {
        console.error('Error fetching patient information:', error);
      },
    });
  }

  readForm() {
    this.patient.name = this.NameOfParent;
    this.patient.lastname = this.SurnameOfParent;
    this.patient.Babyname = this.NameOfBaby;
    this.patient.Babyage = this.AgeOfBaby;
    this.patient.babypoid = this.WeightOfBaby;
    this.patient.Reason = this.ReasonOfAppointment;
    this.rdv.date = this.dateOfAppointment;
    this.rdv.time = this.hourOfAppointment;
  }
}
