import { Component } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { Router } from '@angular/router';
import { User } from '../../entities/users.entity';

@Component({
  selector: 'app-signed-in-home',
  templateUrl: './signed-in-home.component.html',
  styleUrls: ['./signed-in-home.component.css']
})
export class SignedInHomeComponent {
  user!: User;

  constructor(
    private userService: UserService, // Use CamelCase for the service variable
    private router: Router
  ) {
  }

  ngOnInit(): void {
    // For testing, let's use the first user in the hardcoded array
    this.user = this.userService.users[0]; // Assuming the first user is the one you want to display
  }
}
