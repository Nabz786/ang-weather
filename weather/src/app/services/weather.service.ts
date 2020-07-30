import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class WeatherService {
    private apiKey = '';
    private baseUrl = "http://api.openweathermap.org/data/2.5/weather?zip=";
    
    constructor(private httpClient: HttpClient) {}

    getWeatherByZipcode(userZipcode: string): Observable<any> {
        this.baseUrl += `${userZipcode},us&appid=${this.apiKey}`;
        return this.httpClient.get(this.baseUrl);
    }
}