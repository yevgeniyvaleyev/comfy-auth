import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { switchMap } from "rxjs/operators";
import { SignUpData } from "src/app/types";
import * as SingUpActions from "./sign-up.actions";
import { AuthenticationService } from "../authentication.service";
import { Router } from "@angular/router";


@Injectable()
export class SignUpEffects {
  authSignup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SingUpActions.SignUpStart),
      // switchMap((signupAction: SingUpActions.SignUpStart) => {
      //   return this.authenticationService
      //     .signUp(
      //       signupAction.payload as SignUpData
      //     )
      //     .pipe(
      //       map(() => {

      //       }),
      //       catchError(errorRes => {

      //       })
      //     );
      // }),
    )
  );

  constructor(
    private actions$: Actions,
    private authenticationService: AuthenticationService,
    private router: Router,
  ) {}
}
