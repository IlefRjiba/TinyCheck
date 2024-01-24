import { Injectable } from '@angular/core';
import { User } from '../../entities/users.entity';
import { BehaviorSubject, Observable, of } from 'rxjs';
import {HttpClient} from '@angular/common/http';
import { Patient } from '../../entities/patient.entites';
import { Appointment } from '../../entities/appointment.entity';
import { MedicalRecord } from '../../entities/medical-record.entity';

const API_LINK = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {
    this.medicalRecords=[
      new MedicalRecord(0,"mother: diabetes , monitor BP",this.patients[0],this.users[1])
    ]
    this.appointments=[
      new Appointment( '12/12/2023', '12:15', this.patients[0], this.users[0]),
      new Appointment( '12/11/2023', '12:15', this.patients[1], this.users[0]),
     
    ]
    this.patients=[
      new Patient("fourat","achour","fouratachour","18 months",7,"fever"),
      new Patient("yassmine","moubarak","yasminemoubarak","1 month",3,"she throws up constantly")
    ]
    this.users=[
    new User("sarra","sarah.ragguem@insat.ucar.tn",99777666,12345678,"ilefilefilef","teacher",this.appointments,this.patients,this.medicalRecords[0]),
    new User("ilef","ilef.ragguem@insat.ucar.tn",99888666,12345679,"ilefilefilef","engineer",this.appointments,this.patients,this.medicalRecords[0])
    ]
   }
  users : User[] = [] ;
 patients: Patient[]=[];
 appointments: Appointment[]=[];
 medicalRecords: MedicalRecord[]=[];
  getUser(): Observable<User[]> {
    return this.http.get<User[]>(`${API_LINK}/get-all-users`);
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(`${API_LINK}/create-user`, user);
  }

  // Method to update a user. It assumes that your API requires the user ID as part of the URL
  
  updateUser(userId: number, updatedUser: User): Observable<User> {
    return this.http.put<User>(`${API_LINK}/user/update-user/${userId}`, updatedUser);
  }

 
  getUserById(userId: number): Observable<User> {
    return this.http.get<User>(`${API_LINK}/user/get-user/${userId}`);
  }
  signUp(user: User): Observable<User> {
    return this.http.post<User>(API_LINK + '/user/create-user', user);
  }

  signIn(email: string, password: string): Observable<any> {
    return this.http.post<any>(API_LINK + '/auth/login', { email, password });
  }
  logout(): Observable<any> {
    return this.http.post(`${API_LINK}/auth/logout`, {}); // Sending a POST request to the logout endpoint
    // After this, you would typically clear any local session data
  }

  //getCurrentUser(): Observable<User| null> {
    
    //const userJson = localStorage.getItem('currentUser');
    //if (userJson) {
     // return of(JSON.parse(userJson));
    //}
    //return of(null); 
 
//}
}
