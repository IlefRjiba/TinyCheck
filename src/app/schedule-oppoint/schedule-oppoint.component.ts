import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-schedule-oppoint',
  templateUrl: './schedule-oppoint.component.html',
  styleUrls: ['./schedule-oppoint.component.css']
})
export class ScheduleOppointComponent {
parentName: string = "";
submitForm() {
throw new Error('Method not implemented.');
}

  appointmentForm ! : FormGroup;
  hours = ['09:00', '09:30', '10:00', /* ...more hours... */ '17:30'];

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.appointmentForm = this.fb.group({
      parentName: ['', Validators.required],
      parentSurname: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      babyName: ['', Validators.required],
      babySurname: ['', Validators.required],
      babyAge: ['', Validators.required],
      reasonOfAppointment: ['', Validators.required],
      dateOfAppointment: ['', Validators.required],
      hourOfAppointment: ['', Validators.required]
    });

    

}

onSubmit() {
  if (this.appointmentForm.valid) {
    alert(this.appointmentForm.value);
  }

}
}