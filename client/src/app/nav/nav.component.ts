// nav.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  isNavbarActive: boolean = false;

  toggleNavbar() {
    this.isNavbarActive = !this.isNavbarActive;
  }
}
