import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../../services/user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  user = {
    username: '',
    email: '',
    phone: '',
    password: '',
    passwordConfirm: ''
  };
  constructor(
    private UserService: UserService,
    private router: Router
  ) { }


  onSignUp(form: NgForm) {
    if (form.invalid) {
      return;
    }
    
    this.UserService.signUp(form.value).subscribe(
      response => {
        console.log('User signed up', response);
        this.router.navigate(['/home']);
        // Vous pouvez ici rediriger l'utilisateur ou afficher un message de succès
      },
      error => {
        console.error('Sign up failed', error);
      }
    );
  }
}

