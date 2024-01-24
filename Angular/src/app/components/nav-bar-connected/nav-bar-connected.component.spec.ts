import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavBarConnectedComponent } from './nav-bar-connected.component';

describe('NavBarConnectedComponent', () => {
  let component: NavBarConnectedComponent;
  let fixture: ComponentFixture<NavBarConnectedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavBarConnectedComponent]
    });
    fixture = TestBed.createComponent(NavBarConnectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
