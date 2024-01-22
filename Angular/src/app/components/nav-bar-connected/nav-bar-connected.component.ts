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
  
  user!: User; 
  constructor(
    private userService: UserService, // Use CamelCase for the service variable
    private router: Router
  ) {
  }

  ngOnInit(): void {
    // For testing, let's use the first user in the hardcoded array
    this.user = this.userService.users[0]; // Assuming the first user is the one you want to display
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
  

