import { Injectable } from '@angular/core';
import { CalendarEvent, CalendarEventAction } from 'angular-calendar';
import { ColorsService } from '../colors/colors.service';
import { Appointment } from 'src/app/entities/appointment.entity';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CalendarService {
  handleEvent(arg0: string, event: CalendarEvent<any>) {
    throw new Error('Method not implemented.');
  }

  constructor(private colors: ColorsService, private toastr: ToastrService) {
    console.log(this.events);
  }

  chosenDate = new Date();
  chosenDateByUser: boolean = false;
  hours = 0;
  minutes = 0;
  seconds = 0;
  formattedTime: string = '0:0';
  formattedDate: string = '';

  events: CalendarEvent[] = [];

  private appointmentsChangedSource = new Subject<void>();
  appointmentsChanged$ = this.appointmentsChangedSource.asObservable();

  addEvent(appointment: Appointment, currentUserId: number): void {
    const newEventStart = this.returnDate(appointment.date, appointment.time);
    const eventExists = this.events.some(
      (event) => event.start.getTime() === newEventStart.getTime()
    );

    if (!eventExists) {
      let newEvent = this.events;
      newEvent.push({
        title: this.initializeTitle(appointment, currentUserId),
        start: this.returnDate(appointment.date, appointment.time),
        color: this.initializeColor(appointment, currentUserId),
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
      });
      this.events = newEvent;
    }
  }

  initializeTitle(appointment: Appointment, currentUserId: number) {
    if (appointment.userId === currentUserId) return 'My appointment';
    else return 'Schedule reserved for another appointment';
  }

  initializeColor(appointment: Appointment, currentUserId: number) {
    if (appointment.userId === currentUserId)
      return this.colors.colors['green'];
    else return this.colors.colors['red'];
  }

  initializeHour(): string {
    if (this.chosenDateByUser) return this.updateTime();
    else return '';
  }

  initializeDate() {
    let day = this.chosenDate.getDate(); // Returns the day of the month (1-31)
    let month = this.chosenDate.getMonth() + 1; // Returns the month (0-11), so we add 1
    let year = this.chosenDate.getFullYear(); // Returns the year (four digits)
    this.formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day
      .toString()
      .padStart(2, '0')}`;

    if (this.chosenDateByUser) return this.formattedDate;
    else return '';
  }

  updateTime() {
    console.log(this.chosenDate);
    this.hours = this.chosenDate.getHours();
    this.minutes = this.chosenDate.getMinutes();
    this.seconds = this.chosenDate.getSeconds();

    const addLeadingZero = (value: number) =>
      value < 10 ? `0${value}` : value;

    this.formattedTime = `${addLeadingZero(this.hours)}:${addLeadingZero(
      this.minutes
    )}`;

    console.log(`Current time: ${this.formattedTime}`);

    return this.formattedTime;
  }

  resetDate() {
    this.formattedTime = '00:00';
    this.formattedDate = '';
  }

  returnDate(day: string, time: string): Date {
    let date = new Date(day);
    let [hours, minutes] = time.split(':').map(Number);
    date.setHours(hours, minutes, 0, 0);
    return date;
  }

  deleteAppointment(appointmentToDelete : Appointment){
    const newEventStart = this.returnDate(appointmentToDelete.date, appointmentToDelete.time);
    const eventExists = this.events.some(
      (event) => event.start.getTime() === newEventStart.getTime()
    );
    if (eventExists) {
      this.events = this.events.filter((event) => event.start.getTime() !== newEventStart.getTime());
    }
    console.log(this.events)
  }
}
