// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PropertiesComponent } from './properties/properties.component';
import { PropertyService } from './property.service';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';
import { BookingsComponent } from './bookings/bookings.component';
import { LoginSignupComponent } from './login-signup/login-signup.component';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    PropertiesComponent,
    FooterComponent,
    BookingsComponent,
    LoginSignupComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    CommonModule,
    AppRoutingModule
  ],
  providers: [PropertyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
