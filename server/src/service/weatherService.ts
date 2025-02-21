import dotenv from 'dotenv';
dotenv.config();

// TODO: Define an interface for the Coordinates object
 interface Coordinates {
   lat: number;
   lon: number;
 }

// TODO: Define a class for the Weather object
class Weather {
  city: string;
  date: string;
  description: string;
  temp: number;
  humidity: number;
  wind: number;
  icon: string;

  constructor(city: string, date: string, description: string, temp: number, humidity: number, wind: number, icon: string) {
    this.city = city;
    this.date = date;
    this.description = description;
    this.temp = temp;
    this.humidity = humidity;
    this.wind = wind;
    this.icon = icon;
  }
}

// TODO: Complete the WeatherService class
class WeatherService {
  // TODO: Define the baseURL, API key, and city name properties
  private baseURL: string;
  private apiKey: string = `${process.env.WEATHER_API_KEY}`;
  private cityName: string;

  constructor() {
    this.baseURL = 'https://api.openweathermap.org/data/2.5/weather';
    this.apiKey;
    this.cityName = '';
  }
  // TODO: Create fetchLocationData method
  fetchLocationData(query: string) {
    return fetch(`https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${this.apiKey}`)
      .then((response) => response.json())
      .then((data) => {
        return {
          lat: data.coord.lat,
          lon: data.coord.lon,
        };
      });
  }
  private async fetchLocationData(query: string) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${this.apiKey}`);
    const data = await response.json();
    return {
      lat: data.coord.lat,
      lon: data.coord.lon,
    };
  }
  // TODO: Create destructureLocationData method
  destructureLocationData(locationData: Coordinates) {
    return {
      lat: locationData.lat,
      lon: locationData.lon,
    };
  }
  // private destructureLocationData(locationData: Coordinates): Coordinates {}
  // TODO: Create buildGeocodeQuery method
  // private buildGeocodeQuery(): string {}
  // TODO: Create buildWeatherQuery method
  // private buildWeatherQuery(coordinates: Coordinates): string {}
  // TODO: Create fetchAndDestructureLocationData method
  // private async fetchAndDestructureLocationData() {}
  // TODO: Create fetchWeatherData method
  // private async fetchWeatherData(coordinates: Coordinates) {}
  // TODO: Build parseCurrentWeather method
  // private parseCurrentWeather(response: any) {}
  // TODO: Complete buildForecastArray method
  // private buildForecastArray(currentWeather: Weather, weatherData: any[]) {}
  // TODO: Complete getWeatherForCity method
  // async getWeatherForCity(city: string) {}
}

export default new WeatherService();
