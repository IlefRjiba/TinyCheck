import { Injectable } from '@angular/core';
import { User } from '../../entities/users.entity';
import { BehaviorSubject, Observable } from 'rxjs';
import {HttpClient} from '@angular/common/http';

const API_LINK = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }
  users : User[] = [] ;
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

  
 
}

