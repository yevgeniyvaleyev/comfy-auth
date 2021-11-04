import {
  emailPattern,
  namePattern,
  capitalLettersPattern,
  smallLettersPattern,
} from './patterns';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthenticationService } from '../authentication.service';

@Injectable()
export class UserValidators {
  constructor(private authService: AuthenticationService) {}

  public static correctEmail(
    control: AbstractControl
  ): ValidationErrors | null {
    if (emailPattern.test(control.value)) {
      return null;
    }
    return {
      correctEmail: true,
    };
  }

  public static upperAndLowerCase(
    control: AbstractControl
  ): ValidationErrors | null {
    if (!capitalLettersPattern.test(control.value)) {
      return {
        capitalLetters: true,
      };
    }
    if (!smallLettersPattern.test(control.value)) {
      return {
        smallLetters: true,
      };
    }
    return null;
  }

  public static preventUserNamesInPassword(
    control: AbstractControl
  ): ValidationErrors | null {
    const firstName = control.get('firstName')?.value;
    const lastName = control.get('lastName')?.value;
    const password = control.get('password')?.value;

    if (password.includes(firstName)) {
      control.get('password')?.setErrors({
        containsFirstName: true,
      });
    }
    if (password.includes(lastName)) {
      control.get('password')?.setErrors({
        containsLastName: true,
      });
    }
    return null;
  }

  public static correctName(control: AbstractControl): ValidationErrors | null {
    if (namePattern.test(control.value)) {
      return null;
    }
    return {
      correctName: true,
    };
  }

  public isUniqueEmail() {
    return (control: AbstractControl): Observable<null | { isUniqueEmail: boolean }> =>
      this.authService
        .checkEmailUniqueness(control.value)
        .pipe(
          map((isUnique: boolean) =>
            isUnique ? null : { isUniqueEmail: true }
          )
        );
  }
}
