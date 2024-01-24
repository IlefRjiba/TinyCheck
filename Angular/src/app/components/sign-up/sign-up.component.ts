import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../../services/user/user.service';
import { Router } from '@angular/router';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  user = {
    username: '',
    email: '',
    phone : 0,
    password: '',
    passwordConfirm: ''
  };
  constructor(
    private UserService: UserService,
    private router: Router
  ) { }


  onSignUp(form: NgForm) {
    console.log(form.value);
    if (form.invalid) {
      return;
    }

    this.UserService.signUp(form.value).subscribe(
      {
        next: response => {
          console.log('User signed up', response);
          this.router.navigate(['/signIn']);
          // Vous pouvez ici rediriger l'utilisateur ou afficher un message de succès
        },
        error: error => {
          console.error('Sign up failed', error);
          console.log(form.value)
        }

       }
    );
  }
}

