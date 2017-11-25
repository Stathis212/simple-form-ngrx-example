import { Action } from '@ngrx/store';
import {fromJS} from 'immutable';

function toPayload(action: Action): any {
    return (action as any).payload;
  }

const initialState = fromJS({
    weather: null,
    fetching: false,
    fetced: false,
    failed: false,
});

export const NgrxReducer = (state: any = initialState, action: Action) => {
  switch (action.type) {

    case 'WEATHER_FETCHING':
        return state.set('fetching', true)
                    .set('failed', false);

    case 'WEATHER_FETCH_SUCCESSFUL':
        return state.set('fetching', false)
                    .set('fetched', true)
                    .set('failed', false)
                    .set('weather', toPayload(action));

    case 'WEATHER_FETCH_FAIL':
        return state.set('fetching', false)
                    .set('fetched', false)
                    .set('failed', true)
                    .set('weather', null);

    default:
      return state;
  }
};
