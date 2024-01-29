import { Component } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { User } from 'src/app/entities/users.entity';
import { ToastrService } from 'ngx-toastr';
import { CalendarService } from 'src/app/services/calendar/calendar.service';
import { Router } from '@angular/router';
import { AppointmentsService } from 'src/app/services/appointments/appointments.service';
import { UserService } from 'src/app/services/user/user.service';
import { Appointment } from 'src/app/entities/appointment.entity';
import { Patient } from 'src/app/entities/patient.entites';

@Component({
  selector: 'app-update-appointment',
  templateUrl: './update-appointment.component.html',
  styleUrls: ['./update-appointment.component.css']
})
export class UpdateAppointmentComponent {
updateAppointment() {
throw new Error('Method not implemented.');
}

  
  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private calendarService: CalendarService,
    private router: Router,
    private appointmentServie: AppointmentsService,
    private userService: UserService
  ) {}

  viewform: boolean = true;

  rdv!: Appointment;
  patient!: Patient;
  user!: User;

  currentUserId ! : number ;

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

      this.patient = new Patient(
        this.NameOfParent,
        this.SurnameOfParent,
        this.NameOfBaby,
        this.AgeOfBaby,
        this.WeightOfBaby,
        this.ReasonOfAppointment
      );
      this.rdv = new Appointment(rdvDate.toString(), this.hourOfAppointment,this.patient,this.currentUserId,1);
      console.log(this.rdv)
      this.appointmentServie.addPatientIdToAppointment(this.rdv, this.patient).subscribe({
        next: (updatedRdv) => {
          this.appointmentServie.addAppointment(updatedRdv);
        },
        error: (error) => {
          this.toastr.error('Erreur lors de l\'ajout du patient');
      }})
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

  ngOnInit(): void {
    const currentUserId = this.userService.getCurrentUserId();
    if (currentUserId !== null && currentUserId !== 0) {
      // Fetch the user information using the current user ID
      this.userService.getUserById(currentUserId).subscribe(
        (user: User) => {
          this.user = user
          this.currentUserId = currentUserId
        },
        error => {
          console.error('Error fetching user information:', error);
        }
      );
    }
    
  }
}