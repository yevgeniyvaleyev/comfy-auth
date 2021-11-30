import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, tap } from "rxjs/operators";
import { SignUpData } from "src/app/types";
import * as SingUpActions from "./sign-up.actions";
import { AuthenticationService } from "../authentication.service";
import { Router } from "@angular/router";
import { of } from "rxjs";


@Injectable()
export class SignUpEffects {
  authSignupStart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SingUpActions.SignUpStart),
      mergeMap((action: any) =>
        this.authenticationService
          .signUp(action as SignUpData)
          .pipe(
            map(() => SingUpActions.SignUpSuccess()),
            catchError(() => of(SingUpActions.SignUpFail()))
          )
      ),
    )
  );

  constructor(
    private actions$: Actions,
    private authenticationService: AuthenticationService,
    private router: Router,
  ) {}
}
