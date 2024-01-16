import { Injectable } from '@angular/core';
import { EventColor } from 'calendar-utils';

@Injectable({
  providedIn: 'root'
})
export class ColorsService {

  constructor() { }
   colors: Record<string, EventColor> = {
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
    grey : {
      primary : '#99a2b0',
      secondary : '#8a8d96'
    }
}
}