import { RouterModule, Routes } from "@angular/router";
import { HomePageComponent } from "./components/home-page/home-page.component";
import { SignInComponent } from "./components/sign-in/sign-in.component";
import { SignUpComponent } from "./components/sign-up/sign-up.component";
import { ScheduleOppointComponent } from "./components/schedule-oppoint/schedule-oppoint.component";
import { ViewSchedComponent } from "./components/view-sched/view-sched.component";

const APP_ROUTING : Routes = [
    { path: 'home', component: HomePageComponent },
    { path: '', component: HomePageComponent },
    { path: 'signIn', component: SignInComponent },
    { path: 'signUp', component: SignUpComponent },
    { path: 'schedule', component: ScheduleOppointComponent },
    { path: 'viewOppointments', component: ViewSchedComponent },
]

export const ROUTES = RouterModule.forRoot(APP_ROUTING);