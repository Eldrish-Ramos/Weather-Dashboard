import dotenv from 'dotenv';
import fetch from 'node-fetch';
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
  private apiKey: string;
  private cityName: string;

  constructor() {
    this.baseURL = `https://api.openweathermap.org/data/2.5`;
    this.apiKey = `${process.env.WEATHER_API_KEY}`;
    this.cityName = '';
  }
  // TODO: Create fetchLocationData method with error handling
  private async fetchLocationData(query: string) {
    try {
      const response = await fetch(this.buildGeocodeQuery(query));
      if (!response.ok) {
        throw new Error(`Error fetching location data: ${response.statusText}`);
      }
      const data = await response.json();
      if (data.length === 0) {
        throw new Error('No location data found');
      }
      return {
        lat: data[0].lat,
        lon: data[0].lon,
      };
    } catch (error) {
      console.error('Error fetching location data:', error);
      throw error;
    }
  }
  // TODO: Create destructureLocationData method
  private destructureLocationData(locationData: Coordinates): Coordinates {
    return {
      lat: locationData.lat,
      lon: locationData.lon,
    };
  }
  // TODO: Create buildGeocodeQuery method
   private buildGeocodeQuery(query: string): string {
    return `http://api.openweathermap.org/geo/1.0/direct?q=${query}&appid=${this.apiKey}`;
   }
  // TODO: Create buildWeatherQuery method
  private buildWeatherQuery(coordinates: Coordinates): string {
    return `${this.baseURL}/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude=minutely,hourly&appid=${this.apiKey}`;
  }
  // TODO: Create fetchAndDestructureLocationData method
  private async fetchAndDestructureLocationData(query: string) {
    const locationData = await this.fetchLocationData(query);
    return this.destructureLocationData(locationData);
  }
  // TODO: Create fetchWeatherData method with error handling
  private async fetchWeatherData(coordinates: Coordinates) {
    try {
      const response = await fetch(this.buildWeatherQuery(coordinates));
      if (!response.ok) {
        throw new Error(`Error fetching weather data: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching weather data:', error);
      throw error;
    }
  }
  // TODO: Build parseCurrentWeather method
  private parseCurrentWeather(response: any) {
      response.daily[0].weather[0].description,
      response.daily[0].temp.day,
      response.daily[0].humidity,
      response.daily[0].wind_speed,
      response.daily[0].weather[0].icon
      response.current.humidity,
      response.current.wind_speed,
      response.current.weather[0].icon
    );
  }
  // TODO: Complete buildForecastArray method
  private buildForecastArray(currentWeather: Weather, weatherData: any[]) {
    const forecast = [];
    for (let i = 1; i < 6; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      forecast.push({
        city: currentWeather.city,
        date: date.toLocaleDateString(),
        description: weatherData[i].weather[0].description,
        temp: weatherData[i].temp.day,
        humidity: weatherData[i].humidity,
        wind: weatherData[i].wind_speed,
        icon: weatherData[i].weather[0].icon,
      });
    }
    return forecast;
  }
  // TODO: Complete getWeatherForCity method
  async getWeatherForCity(city: string) {
    this.cityName = city;
    const coordinates = await this.fetchAndDestructureLocationData(this.cityName);
    const weatherData = await this.fetchWeatherData(coordinates);
    const currentWeather = this.parseCurrentWeather(weatherData);
    const forecast = this.buildForecastArray(currentWeather, weatherData.daily);
    return { currentWeather, forecast };
  }
}

export default new WeatherService();
