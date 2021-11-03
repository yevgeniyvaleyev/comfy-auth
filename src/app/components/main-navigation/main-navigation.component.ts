import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/auth/authentication.service';

@Component({
  selector: 'main-navigation',
  templateUrl: './main-navigation.component.html',
  styleUrls: ['./main-navigation.component.scss']
})
export class MainNavigationComponent {

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  isLoggedIn () {
    return this.authService.isLoggedIn;
  }

  logout () {
    this.authService.logout().subscribe((isLoggedOut) => {
      if (isLoggedOut) {
        this.router.navigate(['/auth/login']);
      }
    });
  }

}
