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
    ]
  })

export class ViewSchedComponent {

  constructor(private calendarService : CalendarService , private appointmentService : AppointmentsService ,private router : Router , private colors : ColorsService, private toastr : ToastrService ){
    this.events=this.calendarService.events
  }

 

  selectedDate ?: Date
  view: CalendarView = CalendarView.Month;
  viewDate: Date = new Date();
  appointments : Appointment[] = [];


  events: CalendarEvent[] = [
    {
      start: startOfDay(new Date()),
      title: 'heeeeeeeeeeeeereeeeeeeeeeeeeeeeeeeee',
      color: { ...this.colors.colors['grey'] },
    },
  ];

  changeDay(date: Date) {
    this.viewDate = date;
    this.view = CalendarView.Day;
    this.calendarService.chosenDate = date;
  }

  hourSelected(arg0: Date) {
    this.calendarService.chosenDate = arg0;
    this.calendarService.chosenDateByUser = true;
    console.log('hourselected-----------------------')
    console.log(this.calendarService.chosenDate)
    this.calendarService.updateTime()
    this.router.navigate(['/schedule']);
}

    ngOnInit(): void {
    this.appointmentService.getAppointments().subscribe({
      next: (appointments) => {
        this.appointments = appointments;
        
        // Create new events based on the appointments
        this.calendarService.events = appointments.map(appointment => ({
          start: new Date(appointment.date + ' ' + appointment.time),
          title: "Réservé",
          color: { ...this.colors.colors['grey'] }
        }));

      },
      error:(error) => { this.toastr.error('Erreur lors du chargement des cvs') ;
      this.appointments = []
    }
  });
  }
  
}