import { Action } from '@ngrx/store';
import {fromJS} from 'immutable';

function toPayload(action: Action): any {
    return (action as any).payload;
}

let initialState = fromJS({
    user: null,
    registering: false,
    registered: false,
    failed: false,
    registerFailedMessage: null,
    token: null,
});

const storedToken = localStorage.getItem('id_token');
if (storedToken) {
  initialState = setUser(storedToken, initialState);
}

export const RegisterReducer = (state: any = initialState, action: Action) => {
  switch (action.type) {

    case 'USER_REGISTERING':
        return state.set('registering', true)
                    .set('failed', false)
                    .set('registerFailedMessage', null);

    case 'USER_REGISTRATION_SUCCESSFUL':
        return state.set('registering', false)
                    .set('registered', true)
                    .set('failed', false)
                    .set('token', toPayload(action));

    case 'USER_REGISTRATION_FAIL':
        return state.set('registering', false)
                    .set('registered', false)
                    .set('failed', true)
                    .set('token', null);

    default:
      return state;
  }
};

function setUser(token, state) {
    return state.set('token', token)
                .set('registered', true);
}
