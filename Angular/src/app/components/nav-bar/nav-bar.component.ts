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
  email: string = '';
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
        this.isLoggedIn = true;
      },
      (error) => {
      }
    );
  }
}
