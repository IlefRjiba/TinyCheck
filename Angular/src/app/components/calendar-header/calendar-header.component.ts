import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CalendarView } from 'angular-calendar';

@Component({
  selector: 'mwl-demo-utils-calendar-header',
  templateUrl: './calendar-header.component.html',
})
export class CalendarHeaderComponent implements OnInit {
  constructor(private router:Router) {}
  ngOnInit(): void {
    console.log('this is calendar header !');
  }
  @Input()
  view!: CalendarView;

  @Input()
  viewDate!: Date;

  @Input() locale: string = 'en';

  @Output() viewChange = new EventEmitter<CalendarView>();

  @Output() viewDateChange = new EventEmitter<Date>();

  CalendarView = CalendarView;

  viewOppointments() {
    this.router.navigate(['/viewProfile']);
  }
}
