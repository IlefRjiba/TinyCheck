import { Injectable } from '@angular/core';
import { User } from '../../entities/users.entity';
import { Observable,BehaviorSubject } from 'rxjs';
import {HttpClient} from '@angular/common/http';
import { tap } from 'rxjs/operators';
const API_LINK = 'http://localhost:3000';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private authStatusListener = new BehaviorSubject<boolean>(false);
  constructor(private http: HttpClient) { }
  users : User[] = [] ;
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


  signUp(user: User): Observable<User> {
    return this.http.post<User>(API_LINK + '/user/create-user', user);
  }

  signIn(email: string, password: string): Observable<any> {
    return this.http.post<any>(API_LINK + '/auth/login', { email, password }).pipe(
      tap(response => {
        if (response.access_token) {
          localStorage.setItem('token', response.access_token);
          this.authStatusListener.next(true);
        }
      })
    );

  }

}
