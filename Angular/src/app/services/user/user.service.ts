import { Injectable } from '@angular/core';
import { User } from '../../entities/users.entity';
import { tap } from 'rxjs/operators';
import { BehaviorSubject, Observable, of } from 'rxjs';
import {HttpClient} from '@angular/common/http';
import { Patient } from '../../entities/patient.entites';
import { Appointment } from '../../entities/appointment.entity';
import { MedicalRecord } from '../../entities/medical-record.entity';
import { jwtDecode } from 'jwt-decode';


const API_LINK = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private authStatusListener = new BehaviorSubject<boolean>(false);

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

  setAuthStatus(isAuth: boolean) {
    this.authStatusListener.next(isAuth);
  }
  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }
  isAuthenticated(): boolean {
    const token = localStorage.getItem('authToken');
    if (!token) {
      return false;
    }
    const isExpired = this.isTokenExpired(token);
    this.authStatusListener.next(!isExpired);
    return !isExpired;
  }

  private isTokenExpired(token: string): boolean {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const now = new Date().getTime() / 1000;
    return payload.exp < now;
  }
  updateUser(userId: number, updatedUser: User): Observable<User> {
    return this.http.put<User>(`${API_LINK}/user/update-user/${userId}`, updatedUser);
  }

 getCurrentUserId(): number | null {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken: any = jwtDecode(token);

      return decodedToken.sub;
    }
    return null;
  }
  getUserById(userId: number): Observable<User> {
    return this.http.get<User>(`${API_LINK}/user/get-user/${userId}`);
  }


  signUp(user: User): Observable<User> {
    return this.http.post<User>(API_LINK + '/user/create-user', user);

  }

  signIn(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${API_LINK}/auth/login`, { email, password }).pipe(
      tap(response => {
        if (response && response.access_token) {
          localStorage.setItem('token', response.access_token);
          console.log(response.access_token);
          this.authStatusListener.next(true);
        }
      })
    );
  }
  }
