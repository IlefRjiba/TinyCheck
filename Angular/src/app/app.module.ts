import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { ViewSchedComponent } from './components/view-sched/view-sched.component';
import { ScheduleOppointComponent } from './components/schedule-oppoint/schedule-oppoint.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { ROUTES } from './app.routes';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule, NgModel, ReactiveFormsModule} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { HttpClientModule } from '@angular/common/http';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { CalendarHeaderComponent } from './components/calendar-header/calendar-header.component';
import { ToastrModule } from 'ngx-toastr';
import { ProfileComponent } from './components/profile/profile.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { NavBarConnectedComponent } from './components/nav-bar-connected/nav-bar-connected.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { SignedInHomeComponent } from './components/signed-in-home/signed-in-home.component';



@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    ViewSchedComponent,
    ScheduleOppointComponent,
    SignUpComponent,
    SignInComponent,
    HomePageComponent,
    CalendarHeaderComponent,
    ProfileComponent,
    EditProfileComponent,
    SignedInHomeComponent,
    NavBarConnectedComponent,
    
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    
    ROUTES,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    ReactiveFormsModule,
    FormsModule,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),
    NgbModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    BsDropdownModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
