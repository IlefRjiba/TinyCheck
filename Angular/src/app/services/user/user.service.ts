import { Injectable } from '@angular/core';
import { User } from '../../entities/users.entity';
import { Observable } from 'rxjs';
import {HttpClient} from '@angular/common/http';

const API_LINK = 'http://localhost:3000/user';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }
  users : User[] = [] ;

  getUser() : Observable<User[]> {
    return this.http.get<User[]>(API_LINK+'/get-all-users');
  }
  addUser(user: User) {
    return this.http.post(API_LINK + '/create-user', user);
  }
}