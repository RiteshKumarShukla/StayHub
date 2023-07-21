// app.component.ts
import { Component, AfterViewInit } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  isNavbarActive: boolean = false;

  ngAfterViewInit(): void {
    this.initializeCarousel();
  }

  toggleNavbar() {
    this.isNavbarActive = !this.isNavbarActive;
  }

  initializeCarousel(): void {
    $('#carouselExampleIndicators').carousel({
      interval: 1500, // Set the interval to 3 seconds (adjust as needed)
      pause: 'hover' // Pause on hover
    });
  }
}
