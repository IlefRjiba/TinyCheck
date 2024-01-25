import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../../services/user/user.service';
import { Router } from '@angular/router';
import { NgModel } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

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
    private router: Router,
    private toastr: ToastrService,
  ) { }


  onSignUp(form: NgForm) {
    console.log(form.value);
    if (form.invalid) {
      this.toastr.error('Please fill in all fields correctly.');
      return;
    }

    this.UserService.signUp(form.value).subscribe(
      {
        next: response => {
          console.log('User signed up', response);
          
          this.router.navigate(['/signIn']);
          this.toastr.success('Welcome, please sign in');
          // Vous pouvez ici rediriger l'utilisateur ou afficher un message de succès
        },
        error: error => {
          console.error('Sign up failed', error);
          console.log(form.value);

            // Vous pouvez vérifier le message d'erreur spécifique ici si votre API le renvoie
            // par exemple: if (error.error.message.includes('email already exists'))
            this.toastr.error('This email is already in use.');



        }

       }
    );
  }
}

