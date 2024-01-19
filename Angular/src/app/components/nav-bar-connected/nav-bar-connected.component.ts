import { Component } from '@angular/core';
import { BehaviorSubject, Observable, Subscribable } from 'rxjs';
import { User } from '../../entities/users.entity';
import { Router } from '@angular/router';
import { UserService } from '../../services/user/user.service';
@Component({
  selector: 'app-nav-bar-connected',
  templateUrl: './nav-bar-connected.component.html',
  styleUrls: ['./nav-bar-connected.component.css']
})
export class NavBarConnectedComponent {

  constructor(private authService: AuthService) {
    // If using Observables, subscribe to the authService to get user data
   // this.userName$ = this.authService.userName;
  }
  // Add methods that your template calls, such as logout
  onLogout() {
    // Call the logout method from your auth service or implement logout logic
    this.UserService.logout();
    
  }
  
}
