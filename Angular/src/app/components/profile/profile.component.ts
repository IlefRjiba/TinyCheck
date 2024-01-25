import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { User } from '../../entities/users.entity';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
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

  editprofile() {
    this.router.navigate(['/editProfile']);
      }
}