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
  styles: [
    `
      h3 {
        margin: 0 0 10px;
      }

      pre {
        background-color: #f5f5f5;
        padding: 15px;
      }
    `,
  ],
})
export class ViewSchedComponent {
  constructor(
    private calendarService: CalendarService,
    private appointmentService: AppointmentsService,
    private router: Router,
    private colors: ColorsService,
    private toastr: ToastrService
  ) {
    this.events = this.calendarService.events;
  }

  selectedDate?: Date;
  view: CalendarView = CalendarView.Month;
  viewDate: Date = new Date();
  appointments: Appointment[] = [];
  events: CalendarEvent[] = [];

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
    this.toastr.error('Cette horaire est déjà réservée');
  }
}
