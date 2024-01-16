import { Injectable } from '@angular/core';
import {CalendarEvent} from 'angular-calendar';
import { addDays, endOfDay, endOfMonth, startOfDay, subDays } from 'date-fns';
import { ColorsService } from '../colors/colors.service';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  constructor(private colors : ColorsService) { }


  chosenDate!: Date; 
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
      title: 'unavailable',
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

  addEvent(): void {
    this.events = [
      ...this.events,
      {
        title: 'New event',
        start: startOfDay(new Date()),
        end: endOfDay(new Date()),
        color: this.colors.colors['red'],
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
      },
    ];
  }

}
