import { Component } from '@angular/core';
import { User } from '../../entities/users.entity';
import { UserService } from '../../services/user/user.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent {
  user!: User;

  constructor(
    private userService: UserService, 
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

  updateUser(formulaire: NgForm) {
    // 15 to be replaced bu currentuser.id
    this.userService.updateUser(15,formulaire.value).subscribe(
      (reponse) => this.router.navigate(['/viewProfile']),
      (erreur) => console.log(erreur)
    );
  }

  onSubmit(formulaire: NgForm){
    console.log(formulaire);
    }
  
}
