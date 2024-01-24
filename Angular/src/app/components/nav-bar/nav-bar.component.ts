import { Component } from '@angular/core';
import { UserService } from '../../services/user/user.service';
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  isLoggedIn: boolean = false;
  email: string = ''; // Variable pour stocker l'email saisi par l'utilisateur
  password: string = '';
  constructor(private userService: UserService) {}
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
