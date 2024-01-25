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
    const currentUserId = this.userService.getCurrentUserId();
    if (currentUserId !== 0) {
      // Fetch the user information using the current user ID
      this.userService.getUserById(currentUserId).subscribe(
        (user: User) => {
          this.user = user;
        },
        error => {
          console.error('Error fetching user information:', error);
        }
      );
    }
    
  }





  }


