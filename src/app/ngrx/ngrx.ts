import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { NgrxService} from './ngrx.service';

@Component({
    selector: 'app-ngrx',
    templateUrl: 'ngrx.html',
})

export class NgrxComponent {

  city: any = '';
  response: any = '';

  constructor(
    private service: NgrxService) {}

  ngOnInit() {
    this.service.weather$.subscribe(payload => {
      this.response = payload;
    });
  }

  onKey(event: any) {
    this.city = event.target.value;
  }

  getWeather() {
    this.service.getWeatherByCity(this.city);
  }

}
