import { Component, NgModule } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../../services/user/user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
  email: string = ''; // Initialisation avec une chaîne vide
  password: string = '';
  constructor( private UserService: UserService,
    private router: Router) {}

  onSignIn(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.UserService.signIn(form.value.email, form.value.password).subscribe(
      response => {
        console.log('User signed in', response);
        localStorage.setItem('token', response.token);
        this.router.navigate(['/home']);
        // Redirigez l'utilisateur ou affichez un message de bienvenue
      },
      error => {
        console.error('Sign in failed', error);
      }
    );
  }
}
