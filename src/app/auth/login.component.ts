import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { UserValidators } from 'src/app/auth/validators/user.validator';
import { LoginData } from '../types';
import { AuthenticationService } from './authentication.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public hasRequestError: boolean = false;
  public isInProgress: boolean = false;

  form = new FormGroup({
    password: new FormControl('', Validators.required),
    email: new FormControl('', [
      UserValidators.correctEmail,
      Validators.required,
    ]),
  });

  constructor(
    private authService: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  public ngOnInit() {
    if (this.authService.isLoggedIn) {
      this.router.navigate(['/']);
    }
  }

  public get email() {
    return this.form.get('email');
  }

  public get password() {
    return this.form.get('password');
  }

  public login() {
    if (this.form.invalid) {
      return;
    }
    this.hasRequestError = false;
    this.isInProgress = true;
    this.authService
      .login(this.form.value as LoginData)
      .pipe(
        finalize(() => {
          this.isInProgress = false;
        })
      )
      .subscribe(
        (isAuthenticated) => {
          if (isAuthenticated) {
            this.form.setErrors(null);
            const targetUrl =
              this.route.snapshot.queryParamMap.get('targetUrl');
            this.router.navigate([targetUrl || '/']);
          } else {
            this.form.setErrors({ loginFailed: true });
          }
        },
        () => {
          this.hasRequestError = true;
        }
      );
  }
}
