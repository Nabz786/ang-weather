import { WeatherService } from './../services/weather.service';
import { Component } from '@angular/core';


@Component({
  selector: 'app-display-weather',
  templateUrl: './display-weather.component.html',
  styleUrls: ['./display-weather.component.css']
})
export class DisplayWeatherComponent {

  public userZipcode = '';
  public displayData = '';

  constructor(private weatherService: WeatherService) { }

  onFetchWeather():void {
    if (!this.userZipcode) {
      this.displayData = '';
      return;
    }

    this.weatherService.getWeatherByZipcode(this.userZipcode)
      .subscribe(weatherData => {
        this.displayData = weatherData.weather[0].description;
      });
  }
}
