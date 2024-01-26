import { Router } from '@angular/router';
import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
  Input,
  OnInit,
} from '@angular/core';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';
import { CalendarService } from '../../services/calendar/calendar.service';
import { ColorsService } from 'src/app/services/colors/colors.service';
import { AppointmentsService } from 'src/app/services/appointments/appointments.service';
import { Appointment } from 'src/app/entities/appointment.entity';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user/user.service';
import { User } from 'src/app/entities/users.entity';

@Component({
  selector: 'app-view-sched',
  templateUrl: './view-sched.component.html',
})
export class ViewSchedComponent implements OnInit {
  constructor(
    private calendarService: CalendarService,
    private appointmentService: AppointmentsService,
    private router: Router,
    private toastr: ToastrService,
    private userService: UserService
  ) {
  }

  selectedDate?: Date;
  view: CalendarView = CalendarView.Month;
  viewDate: Date = new Date();
  appointments: Appointment[] = [];
  events: CalendarEvent[] = [];

  currentUserId!: number;

  ngOnInit(): void {
    this.events = this.calendarService.events;
    const currentUserId = this.userService.getCurrentUserId();
    if (currentUserId !== null && currentUserId !== 0) {
      this.userService.getUserById(currentUserId).subscribe({
        next : (user: User) => {
          this.currentUserId = currentUserId
        },
        error : (error) => {
          console.error('Error fetching user information:', error);
        }
    });
    }
    this.loadAppointments();
  }

  changeDay(date: Date) {
    this.viewDate = date;
    this.view = CalendarView.Day;
    this.calendarService.chosenDate = date;
  }

  hourSelected(arg0: Date) {
    this.calendarService.chosenDate = arg0;
    this.calendarService.chosenDateByUser = true;
    this.calendarService.updateTime();
    this.router.navigate(['/schedule']);
  }

  eventClicked(arg0: CalendarEvent<any>) {
    this.toastr.error('This schedule is reserved');
  }

  loadAppointments(): void {
    this.appointmentService.getAppointments().subscribe({
      next: (data) => {
        this.appointments = data;
        this.appointments.forEach(appointment => {
          this.calendarService.addEvent(appointment,this.currentUserId);
        });
      },
      error: (err) => {
        console.error('Error fetching appointments:', err);
      }
    });}

}