import { LatLong } from './../models/classes/latitude-longitude.model';
import { WeatherCondition } from './../models/classes/weather-condition.model';
import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class WeatherService {
	private baseOpenWeatherUrl = "http://api.openweathermap.org/data/2.5/onecall?lat=";
	private geoCoderUrl = "https://api.opencagedata.com/geocode/v1/json?";
    
    constructor(private httpClient: HttpClient) { }

	getLatitudeAndLongitudeByLocation(city: string, countryCode: string): Observable<LatLong> {
		const completeUrl = this.geoCoderUrl + `q=${city}&countrycode=${countryCode}&key=${environment.geoCoderApiKey}`;
			return this.httpClient.get(completeUrl)
				.pipe(
					map(geoCoderResponse => {
						let latLong = new LatLong();
						latLong.latitude = geoCoderResponse['results']['0']['geometry']['lat'];
						latLong.longitude = geoCoderResponse['results']['0']['geometry']['lng'];
						return latLong;
					}),
					catchError(this.handleError<LatLong>("getLatLongByCityAndCountry", new LatLong()))
				);
	}

    getWeatherByZipcode(latLong: LatLong): Observable<WeatherCondition> {
		const completeUrl = this.baseOpenWeatherUrl + 
			`${latLong.latitude}&lon=${latLong.longitude}&exclude=hourly,minutely&units=imperial&appid=${environment.weatherApiKey}`;
			return this.httpClient.get(completeUrl)
				.pipe(
						map(weatherApiResponse => {
						let weatherConditions = new WeatherCondition();
						weatherConditions.outsideWeatherCondition = weatherApiResponse['current']['weather'];
						weatherConditions.temperatureData = weatherApiResponse['current'];
						return weatherConditions;
					}),
					catchError(this.handleError<WeatherCondition>("getWeatherByZipCode", new WeatherCondition()))
				);
	}
		
	private handleError<T>(operation = "operation", result?: T) {
		return (error: any): Observable<T> => {
			console.log(error);
			console.log(`${operation} failed: ${error.message}`);

			return of(result as T);
		}
	}
}