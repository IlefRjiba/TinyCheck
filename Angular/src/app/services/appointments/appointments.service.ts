import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { endOfDay, startOfDay } from 'date-fns';
import { ToastrService } from 'ngx-toastr';
import { Observable, forkJoin } from 'rxjs';
import { Appointment } from 'src/app/entities/appointment.entity';
import { Patient } from 'src/app/entities/patient.entites';
import { CalendarService } from '../calendar/calendar.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AppointmentsService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService,
    private calendarService: CalendarService
  ) {}
  apiLinkAppointment = 'http://localhost:3000/appointment';
  apiLinkPatient = 'http://localhost:3000/patients';

  getAppointments(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(this.apiLinkAppointment);
  }

  addAppointment(rdv: Appointment, patient: Patient) {
    const appointmentRequest = this.http.post(this.apiLinkAppointment, rdv);
    const patientRequest = this.http.post(this.apiLinkPatient, patient);

    forkJoin([appointmentRequest, patientRequest]).subscribe({
      next: () => {
        this.toastr.success('Rendez-vous ajouté avec succès');
        this.calendarService.addEvent(rdv);
        this.router.navigate(['/viewOppointments']);
      },
      error: (error) => {
        this.toastr.error(
          "Erreur lors de l'ajout du rendez-vous ou du patient",
          error
        );
      },
    });
  }
}
