import { RouterModule, Routes } from "@angular/router";
import { HomePageComponent } from "./home-page/home-page.component";
import { SignInComponent } from "./sign-in/sign-in.component";
import { SignUpComponent } from "./sign-up/sign-up.component";
import { ScheduleOppointComponent } from "./schedule-oppoint/schedule-oppoint.component";
import { ViewSchedComponent } from "./view-sched/view-sched.component";

const APP_ROUTING : Routes = [
    { path: 'home', component: HomePageComponent },
    { path: 'signIn', component: SignInComponent },
    { path: 'signUp', component: SignUpComponent },
    { path: 'schedule', component: ScheduleOppointComponent },
    { path: 'viewOppointments', component: ViewSchedComponent },
]

export const ROUTES = RouterModule.forRoot(APP_ROUTING);