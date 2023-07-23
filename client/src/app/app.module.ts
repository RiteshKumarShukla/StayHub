import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PropertiesComponent } from './properties/properties.component';
import { PropertyService } from './property.service';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';
import { BookingsComponent } from './bookings/bookings.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HostsComponent } from './hosts/hosts.component';
import { HostService } from './host.service';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    PropertiesComponent,
    FooterComponent,
    BookingsComponent,
    LoginComponent,
    RegisterComponent,
    HostsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    AppRoutingModule,
  ],
  providers: [PropertyService,HostService],
  bootstrap: [AppComponent]
})
export class AppModule {}
