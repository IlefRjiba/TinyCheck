import { RouterModule, Routes } from "@angular/router";
import { HomePageComponent } from "./components/home-page/home-page.component";
import { SignInComponent } from "./components/sign-in/sign-in.component";
import { SignUpComponent } from "./components/sign-up/sign-up.component";
import { ScheduleOppointComponent } from "./components/schedule-oppoint/schedule-oppoint.component";
import { ViewSchedComponent } from "./components/view-sched/view-sched.component";
import { ProfileComponent } from "./components/profile/profile.component";
import { EditProfileComponent } from "./components/edit-profile/edit-profile.component";
import { SignedInHomeComponent } from "./components/signed-in-home/signed-in-home.component";
import { UpdateAppointmentComponent } from "./components/update-appointment/update-appointment.component";

const APP_ROUTING : Routes = [
    { path: 'home', component: HomePageComponent },
    { path: '', component: HomePageComponent },
    { path: 'signIn', component: SignInComponent },
    { path: 'signUp', component: SignUpComponent },
    { path: 'schedule', component: ScheduleOppointComponent },
    { path: 'signedInHome', component:SignedInHomeComponent},
    { path: 'viewOppointments', component: ViewSchedComponent },
    { path: 'viewProfile', component:ProfileComponent },
    { path: 'editProfile', component:EditProfileComponent},
    { path: 'updateAppointment/:id', component:UpdateAppointmentComponent},
    
]

export const ROUTES = RouterModule.forRoot(APP_ROUTING);