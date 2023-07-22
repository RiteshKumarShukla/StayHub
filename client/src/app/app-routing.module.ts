// app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BookingsComponent } from './bookings/bookings.component';
import { PropertiesComponent } from './properties/properties.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HostsComponent } from './hosts/hosts.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'bookings', component: BookingsComponent },
  { path: 'properties', component: PropertiesComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {path:'hosts', component:HostsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
