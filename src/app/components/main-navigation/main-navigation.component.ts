import { Component } from '@angular/core';

@Component({
  selector: 'main-navigation',
  templateUrl: './main-navigation.component.html',
  styleUrls: ['./main-navigation.component.css']
})
export class MainNavigationComponent {

  constructor() {}

  isLoggedIn () {
    return true;
  }

  logout () {}

}
