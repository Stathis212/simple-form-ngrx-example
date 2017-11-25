import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { RegisterComponent, RegisterService, RegisterApi } from './index';

@NgModule({
  declarations: [
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [
    RegisterService,
    RegisterApi,
  ],
  exports: [
    RegisterComponent,
  ],
})
export class RegisterModule { }
