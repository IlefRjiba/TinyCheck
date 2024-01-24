import { Component, NgModule } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { FormBuilder, FormGroup, NgForm, FormsModule } from '@angular/forms';
import { NgModel } from '@angular/forms';
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
      const { email, password } = form.value;
      this.UserService.signIn(email, password).subscribe({
        next: (response) => {
          // La connexion a réussi, vous pouvez maintenant rediriger l'utilisateur ou effectuer d'autres actions
          this.router.navigate(['/signedInHome']);
        },
        error:(error) => {
          console.error('Sign in failed :(', error);
        }
    });
    }
}
