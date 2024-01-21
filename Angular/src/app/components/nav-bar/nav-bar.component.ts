import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  isLoggedIn: boolean = false;
  email: string = ''; // Variable pour stocker l'email saisi par l'utilisateur
  password: string = '';
  constructor(private userService: UserService

  , private router: Router) {}
  ngOnInit() {
    this.isLoggedIn = this.userService.isAuthenticated();
    this.userService.getAuthStatusListener().subscribe(isAuth => {
      this.isLoggedIn = isAuth;
    });}
  loginUser() {
    this.userService.signIn(this.email, this.password).subscribe(
      (response) => {
        // Si la connexion est réussie, vous pouvez mettre à jour la variable isLoggedIn.
        this.isLoggedIn = true;
      },
      (error) => {
        // Gérez les erreurs de connexion ici
        console.error('Erreur de connexion : ', error);
      }
    );
  }
}
