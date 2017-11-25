import { Injectable } from '@angular/core';
import { Api } from '../services/api.service';

@Injectable()
export class NgrxApi {

  constructor(private api: Api) {}

  getWeatherByCity(city: string) {
    return this.api.get('data/2.5/weather?q=' + city + '&appid=e9fc171ebf8d729025d63a594c267f92');
  }

}
