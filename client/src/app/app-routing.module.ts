// app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
// import { HostsComponent } from './hosts/hosts.component';
import { GuestsComponent } from './guests/guests.component';
import { BookingsComponent } from './bookings/bookings.component';
import { PropertiesComponent } from './properties/properties.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  // { path: 'hosts', component: HostsComponent },
  { path: 'guests', component: GuestsComponent },
  { path: 'bookings', component: BookingsComponent },
  { path: 'properties', component: PropertiesComponent }
  // Add more routes here if needed
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
