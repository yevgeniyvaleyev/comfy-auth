import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserValidators } from 'src/app/validators/user.validator';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {

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
    this.authService.signUp(this.form.value).subscribe((d) => {
      this.router.navigate(['/login']);
    });
  }

}
