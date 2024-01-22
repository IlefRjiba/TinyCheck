import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { endOfDay, startOfDay } from 'date-fns';
import { ToastrService } from 'ngx-toastr';
import { Observable, forkJoin } from 'rxjs';
import { Appointment } from 'src/app/entities/appointment.entity';
import { Patient } from 'src/app/entities/patient.entites';

@Injectable({
  providedIn: 'root'
})
export class AppointmentsService {

  constructor(private http:HttpClient , private toastr : ToastrService) { }
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

  // addAppointment(rdv: Appointment, patient: Patient) {
  //   this.http.post(this.apiLinkAppointment, rdv).subscribe(
  //     () => this.http.post(this.apiLinkPatient, patient).subscribe(
  //       ()=> this.toastr.success('Rendez-vous ajouté avec succès'),
  //       (error) => { this.toastr.error('Erreur lors de l\'ajout du rendez-vous')}
  //       ),
  //     (error) => { this.toastr.error('Erreur lors de l\'ajout du rendez-vous') }
  //     )
  // }

  addAppointment(rdv: Appointment, patient: Patient) {
    const appointmentRequest = this.http.post(this.apiLinkAppointment, rdv);
    const patientRequest = this.http.post(this.apiLinkPatient, patient);
  
    forkJoin([appointmentRequest, patientRequest]).subscribe(
      ([appointmentResponse, patientResponse]) => {
        console.log(patientRequest);
        // Both requests succeeded
        this.toastr.success('Rendez-vous et patient ajoutés avec succès');
        // You can add additional logic here if needed
      },
      (error) => {
        // At least one request failed
        this.toastr.error('Erreur lors de l\'ajout du rendez-vous ou du patient', error);
        // Handle the error (log, show user-friendly message, etc.)
      }
    );
  }
  
}
