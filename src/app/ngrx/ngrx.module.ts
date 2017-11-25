import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { NgrxComponent, NgrxService, NgrxApi } from './index';

@NgModule({
  declarations: [
    NgrxComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
  ],
  providers: [
    NgrxService,
    NgrxApi,
  ],
  exports: [
    NgrxComponent,
  ],
})
export class NgrxModule { }
