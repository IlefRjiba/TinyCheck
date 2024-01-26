import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { AppointmentsService } from 'src/app/services/appointments/appointments.service';
import { User } from '../../entities/users.entity';
import { Router } from '@angular/router';
import { Appointment } from '../../entities/appointment.entity';
import { CalendarService } from '../../services/calendar/calendar.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user!: User;
  currentUserId!: number;

  constructor(
    private calendarService: CalendarService,
    private userService: UserService, 
    private router: Router,
    private appointmentService: AppointmentsService,
  ) {
  }
  appointments: Appointment[] = [];

  ngOnInit(): void {
    const currentUserId = this.userService.getCurrentUserId() ?? 0;
    if (currentUserId !== 0) {
      // Fetch the user information using the current user ID
      this.userService.getUserById(currentUserId).subscribe(
        (user: User) => {
          this.user = user;
          this.currentUserId = currentUserId
          
        },
        error => {
          console.error('Error fetching user information:', error);
        }
      );
    }
    
  }

  editprofile() {
    this.router.navigate(['/editProfile']);
      }
  
  loadAppointments(): void {
        this.appointmentService.getAppointments().subscribe({
          next: (data) => {
          },
          error: (err) => {
            console.error('Error fetching appointments:', err);
          }
        });}
    
}