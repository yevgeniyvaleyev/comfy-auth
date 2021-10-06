import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserValidators } from 'src/app/validators/user.validator';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form = new FormGroup({
    password: new FormControl('', Validators.required),
    email: new FormControl('', [
      UserValidators.correctEmail,
      Validators.required
    ])
  })

  constructor(
    private authService: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  public ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/']);
    }
  }

  public get email () {
    return this.form.get('email');
  }

  public get password () {
    return this.form.get('password');
  }

  public login () {
    this.authService.login(this.form.value).subscribe((isAuthenticated) => {
      if (isAuthenticated) {
        this.form.setErrors(null);
        const targetUrl = this.route.snapshot.queryParamMap.get('targetUrl');
        this.router.navigate([targetUrl || '/']);
      } else {
        this.form.setErrors({ loginFailed: true });
      }
    })
  }
}
