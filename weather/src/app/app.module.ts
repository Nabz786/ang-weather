import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { DisplayWeatherComponent } from './display-weather/display-weather.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DailyInformationComponent } from './daily-information/daily-information.component';

@NgModule({
  declarations: [
    AppComponent,
    DisplayWeatherComponent,
    DailyInformationComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
