export interface Weather {
  coord: Coord;
  weather: WeatherEntity[];
  base: string;
  main: Main;
  wind: Wind;
  clouds: Clouds;
  dt: number;
  timezone: number;
  sys: Sys;
  id: number;
  name: string;
  cod: string | number;
  message?: string;
}

export interface Coord {
  lon: number;
  lat: number;
}

export interface WeatherEntity {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface Main {
  temp: number;
  pressure: number;
  humidity: number;
  temp_min: number;
  temp_max: number;
  feels_like: number;
}

export interface Wind {
  speed: number;
  deg: number;
}

export interface Clouds {
  all: number;
}

export interface Sys {
  type: number;
  id: number;
  message: number;
  country: string;
  sunrise: number;
  sunset: number;
}
