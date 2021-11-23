import { createAction, props } from '@ngrx/store';

export const SIGNUP_START = '[SignUp] Start';
export const SIGNUP_SUCCESS = '[SignUp] Success';
export const SIGNUP_FAIL = '[SignUp] Fail';

export interface SignUpStartPayload {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export const SignUpStart = createAction(
  SIGNUP_START,
  props<SignUpStartPayload>()
);

export const SignUpSuccess = createAction(
  SIGNUP_SUCCESS,
);

export const SignUpFail = createAction(
  SIGNUP_FAIL,
);
