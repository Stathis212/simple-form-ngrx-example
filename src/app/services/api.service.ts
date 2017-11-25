import {Injectable} from '@angular/core';
import {Http, Headers, URLSearchParams, Response, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import 'rxjs/add/operator/catch';

@Injectable()
export class Api {

  baseUrl: string = 'https://reqres.in/';

  constructor(private _http: Http, private store: Store<any>) {}

  get(name: string, params?: URLSearchParams | any): any {
    const headers = this._headers();

    let queryParams = params;
    if (params && !(params instanceof URLSearchParams)) {
      queryParams = new URLSearchParams();
      for (const key of params) {
        queryParams.set(key, params[key].toString());
      }
    }
    return this._http.get(this._url(name), {search: queryParams, headers})
      .map((res: any) => res.json())
      .catch(this.handleError);
  }

  post(name: string, data: any, reqHeaders?: any): any {
    const headers = this._headers(reqHeaders);
    const options = new RequestOptions({headers: headers});
    const res = this._http.post(this._url(name), data, options );
    return res
      // .retry(1)
      .map((resp: any) => resp.json())
      .catch(this.handleError);
  }

  put(name: string, data: any, reqHeaders?: any): any {
    const headers = this._headers(reqHeaders);
    return this._http.put(this._url(name), data, { headers })
            // .retry(1)
            .map((res: any) => res.json())
            .catch(this.handleError);
  }

  delete(name: string): any {
    const headers = this._headers();
    return this._http.delete(this._url(name), { headers });
  }

  private _mapRes(res: any) {
    if (res && res._body) {
      return res.json();
    }
  }

  private _url(name: string): string {
    return this.baseUrl + name;
  }

  private _headers(reqHeaders?: any): Headers {
    const headers = new Headers();

    if (reqHeaders) {
      Object.keys(reqHeaders).forEach(key => headers.append(key, reqHeaders[key]));
    }
    return headers;
  }

  private handleError = (error: Response) => {
    // in a real world app, we may send the error to some remote logging infrastructure
    // instead of just logging it to the console

    console.error('SERVER ERROR:', error.json().message);
    let message = '';
    if (error.status === 401) {
      this.store.dispatch({ type: 'WEATHER_FETCH_FAIL'});
    }

    if (error.status !== 200 ) {
      const errorMsg = error.json();
      message = errorMsg.message;
      if (errorMsg.modelState) {
        // message = Object.values(errorMsg.modelState)[0].concat();
        message = Object.keys(errorMsg.modelState)[0].concat();
      }

      alert(message);
    }

    return Observable.throw(error.json().message || message || 'Server error');
  }
}
