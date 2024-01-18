import { Injectable } from '@angular/core';
import { User } from '../../entities/users.entity';
import { Observable } from 'rxjs';
import {HttpClient} from '@angular/common/http';

const API_LINK = 'http://localhost:3000';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }
  users : User[] = [] ;


  signUp(user: User): Observable<User> {
    return this.http.post<User>(API_LINK + '/user/create-user', user);
  }

  signIn(email: string, password: string): Observable<any> {
    return this.http.post<any>(API_LINK + '/auth/login', { email, password });
  }
}
