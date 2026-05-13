export interface Location {
  name: string;
  nx: number;
  ny: number;
  lat: number;
  lng: number;
}

export interface CurrentWeather {
  temperature: number;
  humidity: number;
  windSpeed: number;
  windDirection: number;
  precipitation: number;
  precipitationType: number;
  skyCondition: number;
  observedAt: string;
}

export interface HourlyForecast {
  time: string;
  temperature: number;
  skyCondition: number;
  precipitationProbability: number;
  precipitation: number;
}

export interface DailyForecast {
  date: string;
  maxTemp: number;
  minTemp: number;
  amSky: number;
  pmSky: number;
  amPrecipitation: number;
  pmPrecipitation: number;
}

export type WeatherCondition =
  | "sunny"
  | "cloudy"
  | "overcast"
  | "rain"
  | "snow"
  | "shower"
  | "thunder";

export interface Favorite {
  id: string;
  location: Location;
  order: number;
}
