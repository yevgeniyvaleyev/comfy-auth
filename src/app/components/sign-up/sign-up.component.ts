import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FromEventTarget } from 'rxjs/internal/observable/fromEvent';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { signUpData } from 'src/app/types';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {

  constructor(private authService: AuthenticationService, private router: Router) { }

  signUp(event: Event) {
    event.preventDefault();
    const signUpData: signUpData = {
      firstName: 'df',
      lastName: 'fdf',
      email: 'dfd@dfd.comn',
      password: 'dfd',
    }
    this.authService.signUp(signUpData).subscribe((d) => {
      this.router.navigate(['/login']);
    });
  }

}
