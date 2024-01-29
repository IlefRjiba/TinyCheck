import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { AppointmentsService } from 'src/app/services/appointments/appointments.service';
import { User } from '../../entities/users.entity';
import { Router } from '@angular/router';
import { Appointment } from '../../entities/appointment.entity';
import { CalendarService } from '../../services/calendar/calendar.service';
import { PatientService } from '../../services/patient/patient.service';
import { Patient } from '../../entities/patient.entites';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  user!: User;
  currentUserId!: number;

  constructor(
    private calendarService: CalendarService,
    private userService: UserService,
    private router: Router,
    private appointmentService: AppointmentsService,
    private patientService: PatientService
  ) {}
  appointments: Appointment[] = [];
  patients: { [key: number]: Patient } = {};

  ngOnInit(): void {
    const currentUserId = this.userService.getCurrentUserId() ?? 0;
    if (currentUserId !== 0) {
      // Fetch the user information using the current user ID
      this.userService.getUserById(currentUserId).subscribe(
        (user: User) => {
          this.user = user;
          this.currentUserId = currentUserId;
        },
        (error) => {
          console.error('Error fetching user information:', error);
        }
      );
    }
    this.loadAppointments(currentUserId);
  }

  editprofile() {
    this.router.navigate(['/editProfile']);
  }

  loadAppointments(currentUserId: number): void {
    if (currentUserId) {
      this.appointmentService.getAppointmentsByUserId(currentUserId).subscribe({
        next: (data) => {
          this.appointments = data;
          this.appointments.forEach((appointment) => {
            this.loadPatient(appointment.patientId);
          });
        },
        error: (err) => {
          console.error('Error fetching appointments:', err);
        },
      });
    } else {
      // Handle the error or return an empty observable
      console.error('User ID is undefined');
    }
  }
  loadPatient(patientId: number) {
    this.patientService.getPatientById(patientId).subscribe((patient) => {
      this.patients[patientId] = patient; // Store the patient details
    });
  }
  editAppointment(appointment: any): void {
    this.appointmentService.updatedAppointment = appointment;
    this.appointmentService.updatedAppointmentId = appointment.id
    // console.log(appointment.id)
    this.router.navigate(['/updateAppointment']);
  }

  deleteAppointment(appointment: Appointment): void {
    console.log('delete appointment');
  }
}
