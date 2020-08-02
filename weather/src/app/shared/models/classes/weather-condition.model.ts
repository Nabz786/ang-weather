import { IWeatherCondition } from '../interfaces/weather-condition.interface';

export class WeatherCondition implements IWeatherCondition {
    outsideWeatherCondition: [{ [key: string]: string }];
    temperatureData: [{ [key: string]: string }];
}

