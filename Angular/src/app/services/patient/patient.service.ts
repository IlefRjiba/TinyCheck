import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Patient } from '../../entities/patient.entites';
import { Observable } from 'rxjs';

const API_LINK = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(private http: HttpClient) { }
  getPatientById(patientId: number): Observable<Patient> {
    return this.http.get<Patient>(`${API_LINK }/patients/${patientId}`);
  }

  updatePatient(patient: Patient,patientId : number): Observable<Patient> {
    return this.http.put<Patient>(`${API_LINK }/patients/${patientId}`, patient);
  }
}
