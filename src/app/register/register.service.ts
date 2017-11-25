import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Store } from '@ngrx/store';
import { RegisterApi } from './register.api';

@Injectable()
export class RegisterService {

    user$: Observable<any>;
    registering$: Observable<boolean>;
    registered$: Observable<boolean>;
    failed$: Observable<boolean>;
    registerFailedMessage$: Observable<any>;
    token$: Observable<any>;

  constructor(private store: Store<any>, private api: RegisterApi) {
    const store$ = store.select<any>('RegisterReducer');
    this.user$ = store$.map(data => data.get('user'));
    this.registering$ = store$.map(data => data.get('registering'));
    this.registered$ = store$.map(data => data.get('registered'));
    this.failed$ = store$.map(data => data.get('failed'));
    this.registerFailedMessage$ = store$.map(data => data.get('registerFailedMessage'));
    this.token$ = store$.map(data => data.get('token'));
  }

  register(user) {
    this.store.dispatch({ type: 'USER_REGISTERING' });
    this.api.register(user).subscribe((payload) => {
      this.store.dispatch({ type: 'USER_REGISTRATION_SUCCESSFUL', payload: payload });
    }, (payload) => {
      this.store.dispatch({ type: 'USER_REGISTRATION_FAIL', payload: payload });
    });
  }

}
