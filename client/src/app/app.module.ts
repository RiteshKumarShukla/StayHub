// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PropertiesComponent } from './properties/properties.component'; // Import PropertiesComponent
import { PropertyService } from './property.service'; // Import PropertyService
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    PropertiesComponent,
    FooterComponent
    // Add PropertiesComponent to declarations
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule, // Add HttpClientModule
    AppRoutingModule
  ],
  providers: [PropertyService], // Add PropertyService to providers
  bootstrap: [AppComponent]
})
export class AppModule { }
