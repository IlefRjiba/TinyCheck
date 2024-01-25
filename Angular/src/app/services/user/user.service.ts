import { Injectable } from '@angular/core';
import { User } from '../../entities/users.entity';
import { tap } from 'rxjs/operators';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Patient } from '../../entities/patient.entites';
import { Appointment } from '../../entities/appointment.entity';
import { MedicalRecord } from '../../entities/medical-record.entity';
import { jwtDecode } from 'jwt-decode';

const API_LINK = 'http://localhost:3000';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private authStatusListener = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {
  }
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
    return this.http.put<User>(
      `${API_LINK}/user/update-user/${userId}`,
      updatedUser
    );
  }

 

  getUserById(userId: number): Observable<User> {
    return this.http.get<User>(`${API_LINK}/user/get-user/${userId}`);
  }

  signUp(user: User): Observable<User> {
    return this.http.post<User>(API_LINK + '/user/create-user', user);

  }
  getCurrentUserId(): number | null {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken: any = jwtDecode(token);

      return decodedToken.sub;
    }
    return null;
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


