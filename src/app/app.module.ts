import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgrxModule } from './ngrx/ngrx.module';
import { RegisterModule } from './register/register.module';
import { Api, ValidationService } from './services/index';

import {APP_STORE} from './app.store';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    CommonModule,
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    APP_STORE,
    NgrxModule,
    RegisterModule,
  ],
  exports: [],
  providers: [Api, ValidationService],
  bootstrap: [AppComponent],
})
export class AppModule {}
