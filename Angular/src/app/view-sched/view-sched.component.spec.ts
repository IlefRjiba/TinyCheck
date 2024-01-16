import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSchedComponent } from './view-sched.component';

describe('ViewSchedComponent', () => {
  let component: ViewSchedComponent;
  let fixture: ComponentFixture<ViewSchedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewSchedComponent]
    });
    fixture = TestBed.createComponent(ViewSchedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
