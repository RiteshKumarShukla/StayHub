// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Import FormsModule

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { HomeComponent } from './home/home.component';
import { HostsComponent } from './hosts/hosts.component';
import { HomeComponent } from './home/home.component';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component'; // Import HostsComponent
// import { GuestsComponent } from './guests/guests.component';
// import { BookingsComponent } from './bookings/bookings.component';

@NgModule({
  declarations: [
    AppComponent,
    // HomeComponent,
    HostsComponent,
    HomeComponent,
    NavComponent,
    FooterComponent, // Add HostsComponent to declarations array
    // GuestsComponent,
    // BookingsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule, // Add FormsModule to imports array
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

