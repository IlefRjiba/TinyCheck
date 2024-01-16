import { UserService } from '../../services/user/user.service';
import { User } from '../../entities/users.entity';
import { ActivatedRoute, Router } from '@angular/router';
import {FormsModule} from '@angular/forms';
import {FlatpickrModule} from 'angularx-flatpickr';
  import {
    Component,
    ChangeDetectionStrategy,
    ViewChild,
    TemplateRef,
    Input,
    OnInit,
  } from '@angular/core';
  import { startOfDay, endOfDay, subDays, addDays,endOfMonth,isSameDay,isSameMonth,addHours } from 'date-fns';
  import { Subject } from 'rxjs';
  import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
  import {
    CalendarEvent,
    CalendarEventAction,
    CalendarEventTimesChangedEvent,
    CalendarView,
  } from 'angular-calendar';
  import { EventColor } from 'calendar-utils';
  import { CalendarService } from '../../services/calendar/calendar.service';
  
  const colors: Record<string, EventColor> = {
    red: {
      primary: '#ad2121',
      secondary: '#FAE3E3',
    },
    blue: {
      primary: '#1e90ff',
      secondary: '#D1E8FF',
    },
    yellow: {
      primary: '#e3bc08',
      secondary: '#FDF1BA',
    },
  };
  
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
    ]
  })

export class ViewSchedComponent {

  constructor(private calendarService : CalendarService , private router : Router ){
    this.events=this.calendarService.events
  }

  hourSelected(arg0: Date) {
      this.calendarService.chosenDate = arg0;
      this.calendarService.chosenDateByUser = true;
      console.log('hourselected-----------------------')
      console.log(this.calendarService.chosenDate)
      this.calendarService.updateTime()
      this.router.navigate(['/schedule']);
  }

  selectedDate ?: Date
  view: CalendarView = CalendarView.Month;

  viewDate: Date = new Date();

  events: CalendarEvent[] = [];

  changeDay(date: Date) {
    this.viewDate = date;
    this.view = CalendarView.Day;
    this.calendarService.chosenDate = date;
  }
  
}