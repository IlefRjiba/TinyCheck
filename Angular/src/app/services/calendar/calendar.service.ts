import { Injectable } from '@angular/core';
import {CalendarEvent} from 'angular-calendar';
import { addDays, endOfDay, endOfMonth, startOfDay, subDays } from 'date-fns';
import { ColorsService } from '../colors/colors.service';
import { Observable, Subject } from 'rxjs';
import { Appointment } from 'src/app/entities/appointment.entity';
import { HttpClient } from '@angular/common/http';
import { AppointmentsService } from '../appointments/appointments.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  constructor(private colors : ColorsService , private toastr:ToastrService) { }

  private dateSubject = new Subject<void>();
  dateChanged$ = this.dateSubject.asObservable();


  chosenDate = new Date();
  chosenDateByUser : boolean = false;
  hours = 0
  minutes = 0
  seconds = 0
  formattedTime : string = "0:0";
  formattedDate : string = ""
  



  events: CalendarEvent[] = [
    {
      start: subDays(startOfDay(new Date()), 1),
      end: addDays(new Date(), 1),
      title: 'A 3 day event',
      color: { ...this.colors.colors['red'] },
      allDay: true,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      draggable: true,
    },
    {
      start: startOfDay(new Date()),
      title: 'hellooooooooooo',
      color: { ...this.colors.colors['grey'] },
    },
    {
  start: subDays(endOfMonth(new Date()), 3),
   end: addDays(endOfMonth(new Date()), 3),
  title: 'A long event that spans 2 months',
  color: { ...this.colors.colors['grey'] },
   allDay: true,
  }
  ];

  initializeHour() : string {
    if (this.chosenDateByUser)
    return this.updateTime();
    else 
    return "";
  }

  initializeDate(){
    let day = this.chosenDate.getDate(); // Returns the day of the month (1-31)
    let month = this.chosenDate.getMonth() + 1; // Returns the month (0-11), so we add 1
    let year = this.chosenDate.getFullYear(); // Returns the year (four digits)
    this.formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;

    if (this.chosenDateByUser)
    return this.formattedDate;
    else 
    return "";

  }

  updateTime(){
    console.log('update time -------------------------');

    console.log(this.chosenDate)
      this.hours = this.chosenDate.getHours();
      this.minutes = this.chosenDate.getMinutes();
      this.seconds = this.chosenDate.getSeconds();

      const addLeadingZero = (value: number) => (value < 10 ? `0${value}` : value);

      this.formattedTime = `${addLeadingZero(this.hours)}:${addLeadingZero(this.minutes)}`;

      console.log(`Current time: ${this.formattedTime}`);

      return this.formattedTime;
  }

  resetDate(){
    this.formattedTime="00:00";
    this.formattedDate = "";
  }


}
