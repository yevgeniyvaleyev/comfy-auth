import { ActionReducerMap } from '@ngrx/store';

import * as fromAuth from '../auth/store/auth.reducer';

export interface AppState {
  signUp: fromAuth.SignUpState;
}

export const appReducer: ActionReducerMap<AppState> = {
  signUp: fromAuth.signUpReducer,
};
