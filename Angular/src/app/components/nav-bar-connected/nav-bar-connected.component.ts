import { Component } from '@angular/core';
import { BehaviorSubject, Observable, Subscribable, map } from 'rxjs';
import { User } from '../../entities/users.entity';
import { Router } from '@angular/router';
import { UserService } from '../../services/user/user.service';
@Component({
  selector: 'app-nav-bar-connected',
  templateUrl: './nav-bar-connected.component.html',
  styleUrls: ['./nav-bar-connected.component.css']
})
export class NavBarConnectedComponent {
  user: User = new User(); // Initialize user
  userName$: Observable<string>; // This will hold the observable of the user's name
  
  constructor(
    private userService: UserService, // Use CamelCase for the service variable
    private router: Router
  ) {
    // Get the username from userService and assign it to userName$
    // Assuming userService has a method to get the current user's name
    this.userName$ = this.userService.getUserById(this.user.id).pipe(
      map(user => user.username)
    );
  }
  
  
  

  
  
  onLogout() {
    this.userService.logout().subscribe(
      response => {
        console.log('User logged out', response);
        // Clear local session data here if necessary
        this.router.navigate(['/home']); // Redirect the user to the home page
      },
      error => {
        console.error('Logout failed', error);
        
      }
    );
  }
    
  }
  

