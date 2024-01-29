import { Component } from '@angular/core';
import { FormGroup, FormControl,Validators, AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';
import { UserService } from '../../services/user/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  signUpForm: FormGroup;

  constructor(
    private userService: UserService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.signUpForm = new FormGroup({
      username: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      passwordConfirm: new FormControl('', Validators.required)
    }, this.passwordMatchValidator);
  }

  passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const formGroup = control as FormGroup;
    const password = formGroup.get('password')?.value;
    const passwordConfirm = formGroup.get('passwordConfirm')?.value;
    return password === passwordConfirm ? null : { mismatch: true };
  };



  onSignUp() {
    if (this.signUpForm.invalid || this.signUpForm.hasError('mismatch')) {
      this.toastr.error('Please fill in all fields correctly and ensure passwords match.');
      return;
    }

    this.userService.signUp(this.signUpForm.value).subscribe({
      next: (response) => {
        this.toastr.success('Welcome, please sign in');
        this.router.navigate(['/signIn']);
      },
      error: (error) => {
        this.toastr.error('This email is already in use.');
      }
    });
  }
}
