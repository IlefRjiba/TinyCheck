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

@Component({
  selector: 'app-view-sched',
  templateUrl: './view-sched.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewSchedComponent implements OnInit {
  constructor(
    private calendarService: CalendarService,
    private appointmentService: AppointmentsService,
    private router: Router,
    private toastr: ToastrService
  ) {
  }

  selectedDate?: Date;
  view: CalendarView = CalendarView.Month;
  viewDate: Date = new Date();
  appointments: Appointment[] = [];
  events: CalendarEvent[] = [];

  ngOnInit(): void {
    this.loadAppointments();
    this.events = this.calendarService.events;
    console.log('events------------------------------------',this.events);
  }

  changeDay(date: Date) {
    this.viewDate = date;
    this.view = CalendarView.Day;
    this.calendarService.chosenDate = date;
  }

  hourSelected(arg0: Date) {
    this.calendarService.chosenDate = arg0;
    this.calendarService.chosenDateByUser = true;
    console.log('hourselected-----------------------');
    console.log(this.calendarService.chosenDate);
    this.calendarService.updateTime();
    this.router.navigate(['/schedule']);
  }

  eventClicked(arg0: CalendarEvent<any>) {
    this.toastr.error('This schedule is reserved for another appointment');
  }

  loadAppointments(): void {
    this.appointmentService.getAppointments().subscribe({
      next: (data) => {
        
        this.appointments = data;
        this.appointments.forEach(appointment => {
          this.calendarService.addEvent(appointment);
        });
      },
      error: (err) => {
        console.error('Error fetching appointments:', err);
      }
    });}

}
