import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { NgrxReducer } from './ngrx/ngrx.reducer';
import { RegisterReducer } from './register/register.reducer';

export const APP_STORE = [
  StoreModule.forRoot({
    NgrxReducer,
    RegisterReducer,
  }),
  StoreDevtoolsModule.instrument({
    maxAge: 25, //  Retains last 25 states
  }),
];
