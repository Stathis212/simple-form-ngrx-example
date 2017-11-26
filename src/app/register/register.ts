import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AbstractControl } from '@angular/forms';
import { FormBuilder, Validators, ControlContainer, FormGroup, FormControl } from '@angular/forms';
import { RegisterService } from './register.service';
import { ValidationService } from '../services/index';

@Component({
    selector: 'app-register',
    templateUrl: 'register.html',
})

export class RegisterComponent {
  registrationForm: FormGroup;

  constructor(
    private service: RegisterService,
    public fb: FormBuilder,
    private validationService: ValidationService) {
      this.registrationForm = this.fb.group({
        email: new FormControl('', Validators.compose([Validators.required, Validators.minLength(6), validationService.emailValidator.bind(this)])),
        password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(6), validationService.passwordValidator.bind(this)])),
        confirmPassword: new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)])),
      }, {
        validator: validationService.MatchPassword.bind(this),
      });
    }

  onRegister() {
    this.service.register(this.registrationForm.value);
  }

  reset() {
    this.registrationForm.markAsPristine();
    this.registrationForm.markAsUntouched();
  }

  newUser() {
    localStorage.removeItem('id_token');
    this.service.newUser();
  }

}
