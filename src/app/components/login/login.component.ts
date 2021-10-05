import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private authService: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/']);
    }
  }

  login () {
    this.authService.login().subscribe((isAuthenticated) => {
      if (isAuthenticated) {
        const targetUrl = this.route.snapshot.queryParamMap.get('targetUrl');
        this.router.navigate([targetUrl || '/']);
      }
    })
  }
}
