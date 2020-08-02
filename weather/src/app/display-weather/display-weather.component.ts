import { Observable } from 'rxjs';
import { WeatherService } from '../shared/services/weather.service';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { WeatherCondition } from '../shared/models/classes/weather-condition.model';
import { switchMap, tap } from 'rxjs/operators';


@Component({
  selector: 'app-display-weather',
  templateUrl: './display-weather.component.html',
  styleUrls: ['./display-weather.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DisplayWeatherComponent {

	public weatherDataToDisplay: WeatherCondition = new WeatherCondition();
  	public weatherConditionsRetrieved$: Observable<WeatherCondition>;
  	userSpecifiedLocation = new FormControl('', [Validators.required]);

  	constructor(private weatherService: WeatherService) { }

  	onFetchWeather(): void {
    	if (!this.userSpecifiedLocation.valid) {
    		return;
		}

		const specifiedLocationPieces = this.userSpecifiedLocation.value.split(',');
		const city = specifiedLocationPieces[0];
		const countryCode = specifiedLocationPieces[1];

		this.weatherConditionsRetrieved$ = this.weatherService
			.getLatitudeAndLongitudeByLocation(city, countryCode)
			.pipe(
				switchMap(
					queriedLocationLatLng => {
						return this.weatherService.getWeatherByZipcode(queriedLocationLatLng);
					}
				),
				tap(
					weatherData => {
						this.weatherDataToDisplay.temperatureData = 
							weatherData.temperatureData;
						this.weatherDataToDisplay.outsideWeatherCondition = 
							weatherData.outsideWeatherCondition;
					}
				)
			)
		}
}
