import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { endOfDay, startOfDay } from 'date-fns';
import { ToastrService } from 'ngx-toastr';
import { Observable, forkJoin, of } from 'rxjs';
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
  patientId!: number;
  updatedAppointment!: Appointment;
  updatedAppointmentId!: number;

  getAppointments(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(this.apiLinkAppointment);
  }

  addPatientIdToAppointment(
    rdv: Appointment,
    patient: Patient
  ): Observable<Appointment> {
    return new Observable<Appointment>((observer) => {
      this.http.post<any>(this.apiLinkPatient, patient).subscribe({
        next: (response: any) => {
          rdv.patientId = response.id;
          observer.next(rdv);
          observer.complete();
        },
        error: (error) => {
          observer.error(error);
        },
      });
    });
  }

  addAppointment(rdv: Appointment) {
    this.http.post(this.apiLinkAppointment, rdv).subscribe({
      next: () => {
        this.toastr.success('Rendez-vous ajouté avec succès');
        this.calendarService.addEvent(rdv, rdv.userId);
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

  getAppointmentsByUserId(userId: number): Observable<Appointment[]> {
    if (userId) {
      return this.http.get<Appointment[]>(
        `${this.apiLinkAppointment}/user/${userId}`
      );
    } else {
      console.error('User ID is undefined');
      return of([]); 
    }
  }

  updateAppointment(id: number, updateAppointment: Appointment): Observable<any> {
    const url = `${this.apiLinkAppointment}/${id}`;
    return this.http.put(url, updateAppointment);
  }
  
  deleteAppointment(id: number): Observable<any> {
    return this.http.delete(`${this.apiLinkAppointment}/${id}`);
  }
}
