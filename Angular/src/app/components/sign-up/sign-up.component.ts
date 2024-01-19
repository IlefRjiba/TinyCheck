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
mail: any;
phone: any;
pwd: any;
name: any;
pwd2: any;

  constructor(
    private UserService: UserService,
    private router: Router
  ) { }

  addUser(formulaire: NgForm) {
    this.UserService.addUser(formulaire.value).subscribe(
      (reponse) => this.router.navigate(['']),
      (erreur) => console.log(erreur)
    );
  }

  onSubmit(formulaire: NgForm){
    console.log(formulaire);
    }

}