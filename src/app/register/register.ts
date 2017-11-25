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
  model: any = {};
  loading = false;
  registered: any = false;
  error: any = false;
  roles: any;
  emailField: string;

  constructor(
    private service: RegisterService,
    public fb: FormBuilder,
    private validationService: ValidationService) {
      this.registrationForm = this.fb.group({
        Email: new FormControl('', Validators.compose([Validators.required, Validators.minLength(6), validationService.emailValidator.bind(this)])),
        UserName: new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)])),
        Password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(6), validationService.passwordValidator.bind(this)])),
        ConfirmPassword: new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)])),
        Level: new FormControl('', Validators.required),
      }, {
        validator: validationService.MatchPassword.bind(this),
      });
    }

    onRegister() {
        this.loading = true;
        this.service.registered$.subscribe((payload) => {
        this.registered = payload;
        });
        this.service.register(this.registrationForm.value);
        if (this.registered && !this.error) {
        // this.router.navigate(['/login']);
        } else if (this.registered && this.error) {
        this.loading = false;
        }
    }

}
