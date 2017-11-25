import { Injectable } from '@angular/core';
import { Api } from '../services/api.service';

@Injectable()
export class RegisterApi {

    constructor(private api: Api) {}

    register(user) {
        return this.api.get('api/register', user);
    }

}
