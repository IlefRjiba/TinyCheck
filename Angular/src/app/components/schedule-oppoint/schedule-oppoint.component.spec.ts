import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleOppointComponent } from './schedule-oppoint.component';

describe('ScheduleOppointComponent', () => {
  let component: ScheduleOppointComponent;
  let fixture: ComponentFixture<ScheduleOppointComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ScheduleOppointComponent]
    });
    fixture = TestBed.createComponent(ScheduleOppointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
