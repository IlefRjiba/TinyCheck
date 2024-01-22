import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { endOfDay, startOfDay } from 'date-fns';
import { ToastrService } from 'ngx-toastr';
import { Observable, forkJoin } from 'rxjs';
import { Appointment } from 'src/app/entities/appointment.entity';
import { Patient } from 'src/app/entities/patient.entites';
import { CalendarService } from '../calendar/calendar.service';

@Injectable({
  providedIn: 'root'
})
export class AppointmentsService {

  constructor(private http:HttpClient , private toastr : ToastrService , private calendarService : CalendarService) { }
  apiLinkAppointment = "http://localhost:3000/appointment"
  apiLinkPatient = "http://localhost:3000/patients"

  
  getAppointments(): Observable<Appointment[]>{
    return this.http.get<Appointment[]>(this.apiLinkAppointment); 
  }

  // addEvent(): void {
  //   this.events = [
  //     ...this.events,
  //     {
  //       title: 'New event',
  //       start: startOfDay(new Date()),
  //       end: endOfDay(new Date()),
  //       // color: this.colors.colors['red'],
  //       draggable: true,
  //       resizable: {
  //         beforeStart: true,
  //         afterEnd: true,
  //       },
  //     },
  //   ];
  // }

  addAppointment(rdv: Appointment, patient: Patient) : number {
    const appointmentRequest = this.http.post(this.apiLinkAppointment, rdv);
    const patientRequest = this.http.post(this.apiLinkPatient, patient);
    let  result = 0 ;
  
    forkJoin([appointmentRequest, patientRequest]).subscribe({
      next : ([appointmentResponse, patientResponse]) => {
        console.log(patientResponse);
        this.toastr.success('Rendez-vous ajouté avec succès');
        // this.calendarService.ngOnInit()
        result = 1;
      },
      error : (error) => {
        // At least one request failed
        this.toastr.error('Erreur lors de l\'ajout du rendez-vous ou du patient', error);
        // Handle the error (log, show user-friendly message, etc.)
        console.log(error);
        
      }}
      
    );
    return result;
  }
  
} 