export interface IWeatherCondition {
    outsideWeatherCondition: [{ [key: string]: string }];
    temperatureData: [{ [key: string]: string }];
}