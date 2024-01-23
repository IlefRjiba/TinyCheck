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
    // For testing, let's use the first user in the hardcoded array
    this.user = this.userService.users[0]; // Assuming the first user is the one you want to display
  }

  updateUser(formulaire: NgForm) {
    this.userService.updateUser(this.user.id,formulaire.value).subscribe(
      (reponse) => this.router.navigate(['/viewProfile']),
      (erreur) => console.log(erreur)
    );
  }

  onSubmit(formulaire: NgForm){
    console.log(formulaire);
    }
  
}
