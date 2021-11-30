import { createReducer, on } from '@ngrx/store';
import * as SingUpActions from './sign-up.actions';

export interface SignUpState {
  isInProgress: boolean;
  hasError: boolean;
  email: string;
}

const initialState: SignUpState = {
  isInProgress: false,
  hasError: false,
  email: '',
};

export const signUpReducer = createReducer(
  initialState,
  on(
    SingUpActions.SignUpStart,
    (state: SignUpState, action: SingUpActions.SignUpStartPayload) => ({
      ...state,
      isInProgress: true,
      hasError: false,
      email: action.email,
    })
  ),
  on(
    SingUpActions.SignUpSuccess,
    (state: SignUpState) => ({
      ...state,
      isInProgress: false,
      hasError: false,
    })
  ),
  on(
    SingUpActions.SignUpFail,
    (state: SignUpState) => ({
      ...state,
      isInProgress: false,
      hasError: true,
    })
  )
);
