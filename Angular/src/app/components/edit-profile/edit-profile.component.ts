import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { User } from '../../entities/users.entity';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  user!: User;

  constructor(
    private userService: UserService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    const currentUserId = this.userService.getCurrentUserId() ?? 0;
    if (currentUserId !== 0) {
      // Fetch the user information using the current user ID
      this.userService.getUserById(currentUserId).subscribe(
        (user: User) => {
          console.log('User information:', user);
          this.user = user;
        },
        error => {
          console.error('Error fetching user information:', error);
        }
      );
    }
    
  }

  updateUser(form: NgForm) {
    const currentUserId = this.userService.getCurrentUserId();
    console.log('Component initialized')
    console.log('Form data:', form.value);
    console.log('Form valid:', form.valid);
    console.log('Current User ID:', currentUserId);

    if (currentUserId && form.valid) {
      this.userService.updateUser(currentUserId, form.value).subscribe(
        updatedUser => {
          console.log('Updated user:', updatedUser);
          this.user = updatedUser;
          this.router.navigate(['/viewProfile']);
        },
        error => console.error('Error updating user:', error)
      );
    }
  
  }}