import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { UserValidators } from 'src/app/auth/validators/user.validator';
import { AuthenticationService } from './authentication.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  public isInProgress: boolean = false;
  public hasRequestError: boolean = false;

  public form = new FormGroup(
    {
      firstName: new FormControl('', [
        Validators.minLength(2),
        UserValidators.correctName,
        Validators.required,
      ]),
      lastName: new FormControl('', [
        Validators.minLength(2),
        UserValidators.correctName,
        Validators.required,
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        UserValidators.upperAndLowerCase,
      ]),
      email: new FormControl(
        '',
        [UserValidators.correctEmail, Validators.required],
        this.validators.isUniqueEmail()
      ),
    },
    {
      validators: UserValidators.preventUserNamesInPassword,
    }
  );

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private validators: UserValidators,
    private route: ActivatedRoute
  ) {}

  public ngOnInit() {
    if (this.authService.isLoggedIn) {
      this.router.navigate(['/']);
    }
  }

  public get firstName(): AbstractControl | null {
    return this.form.get('firstName');
  }

  public get lastName(): AbstractControl | null {
    return this.form.get('lastName');
  }

  public get password(): AbstractControl | null {
    return this.form.get('password');
  }

  public get email(): AbstractControl | null {
    return this.form.get('email');
  }

  public signUp() {
    if (this.form.invalid) {
      return;
    }
    this.hasRequestError = false;
    this.isInProgress = true;
    this.authService
      .signUp(this.form.value)
      .pipe(
        finalize(() => {
          this.isInProgress = false;
        })
      )
      .subscribe(
        () => {
          this.router.navigate(['../login'], { relativeTo: this.route });
        },
        () => {
          this.hasRequestError = true;
        }
      );
  }
}
