import { Component } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { Router } from '@angular/router';
import { User } from '../../entities/users.entity';

@Component({
  selector: 'app-signed-in-home',
  templateUrl: './signed-in-home.component.html',
  styleUrls: ['./signed-in-home.component.css']
})
export class SignedInHomeComponent {

  user!: User;

  constructor(
    private userService: UserService, // Use CamelCase for the service variable
    private router: Router
  ) {
  }

  ngOnInit(): void {
    const currentUserId = this.userService.getCurrentUserId() ?? 0;
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
  logout() {
    console.log('logged out ');
    }
}
