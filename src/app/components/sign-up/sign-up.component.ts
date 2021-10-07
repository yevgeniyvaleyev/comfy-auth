import { InputModalityDetector } from '@angular/cdk/a11y';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserValidators } from 'src/app/validators/user.validator';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  public isInProgress: boolean = false;
  public hasRequestError: boolean = false;

  public form = new FormGroup({
    firstName: new FormControl('', [
      Validators.minLength(2),
      UserValidators.correctName,
      Validators.required
    ]),
    lastName: new FormControl('', [
      Validators.minLength(2),
      UserValidators.correctName,
      Validators.required
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      UserValidators.isComplexPassword,
    ]),
    email: new FormControl('', [
      UserValidators.correctEmail,
      Validators.required
    ], this.validators.isUniqueEmail())
  }, {
    validators: UserValidators.preventUserNamesInPassword,
  });

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private validators: UserValidators
  ) { }

  public ngOnInit() {
    if (this.authService.isLoggedIn) {
      this.router.navigate(['/']);
    }
  }

  public get firstName (): AbstractControl | null {
    return this.form.get('firstName');
  }

  public get lastName (): AbstractControl | null {
    return this.form.get('lastName');
  }

  public get password (): AbstractControl | null {
    return this.form.get('password');
  }

  public get email (): AbstractControl | null {
    return this.form.get('email');
  }

  public signUp(event: Event) {
    event.preventDefault();
    this.hasRequestError = false;
    this.isInProgress = true;
    this.authService.signUp(this.form.value).subscribe(() => {
      this.isInProgress = false;
      this.router.navigate(['/login']);
    }, () => {
      this.hasRequestError = true;
      this.isInProgress = false;
    });

  }

}
