import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Store } from '@ngrx/store';
import { NgrxApi } from './ngrx.api';

@Injectable()
export class NgrxService {

    weather$: Observable<any>;
    fetching$: Observable<boolean>;
    fetched$: Observable<boolean>;
    failed$: Observable<boolean>;

  constructor(private store: Store<any>, private api: NgrxApi) {
    const store$ = store.select<any>('NgrxReducer');
    this.weather$ = store$.map(data => data.get('weather'));
    this.fetching$ = store$.map(data => data.get('fetching'));
    this.fetched$ = store$.map(data => data.get('fetched'));
    this.failed$ = store$.map(data => data.get('failed'));
  }

  getWeatherByCity(city) {
    this.store.dispatch({ type: 'WEATHER_FETCHING' });
    this.api.getWeatherByCity(city).subscribe((payload) => {
      this.store.dispatch({ type: 'WEATHER_FETCH_SUCCESSFUL', payload: payload });
    }, (payload) => {
      this.store.dispatch({ type: 'WEATHER_FETCH_FAIL', payload: payload });
    });
  }

}
