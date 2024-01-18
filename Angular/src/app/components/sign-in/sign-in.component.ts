import { Component, NgModule } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, FormsModule } from '@angular/forms';
import { NgModel } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {


email !: string;
password !: string;

invalidEmail : boolean = false;
invalidPassword : boolean = false;
shortPassword : boolean = false;

constructor( private router : Router) { }

signIn(formulaire : NgForm) {
 console.log(this.email)
 console.log(this.password)
 if (this.email.length == 0) {
   this.invalidEmail = true;
 }
 if (this.password.length == 0) {
  this.invalidPassword = true;
}
if (this.password.length < 8) {
  this.shortPassword = true;}
}

signUp() {
  this.router.navigate(['signUp']);
  }

}
