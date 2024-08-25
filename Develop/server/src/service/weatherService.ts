import dotenv from 'dotenv';
dotenv.config();

// TODO: Define an interface for the Coordinates object
interface Coordinates { // what this is telling me is that I will get back an object with the following properties from the api
  name: string;
  lat: number;
  country: string;
  state: string;
  lon: number;
}

// TODO: Define a class for the Weather object. This class will show the properties of the weather object that will be returned from the api and will be used to display the weather data on the client side
class Weather {
  name: string;
  date: string;
  tempF: number;
  windSpeed: number;
  humidity: number;
  icon: string;
  iconDescription: string;



  constructor(name: string, date: string,tempF: number, windSpeed: number, humidity: number, icon: string, iconDescription: string) {
    this.name = name;
    this.date = date;
    this.tempF = tempF;
    this.windSpeed = windSpeed;
    this.humidity = humidity;
    this.icon = icon;
    this.iconDescription = iconDescription;
  }
}


// TODO: Complete the WeatherService class
class WeatherService {
  // TODO: Define the baseURL, API key, and city name properties
  private baseURL: string; // this is the base url for the api
  private apiKey: string;
  private cityName: string;

constructor() {
  this.baseURL = process.env.WEATHER_API_BASE_URL || '';
  this.apiKey = process.env.API_KEY || '';
  this.cityName = '';
  
}

}
  
  // TODO: Create fetchLocationData method
  // private async fetchLocationData(query: string)  // THIS WILL CALL THE API COORDINATES
 

  
//   // TODO: Create destructureLocationData method
//   private destructureLocationData(locationData: Coordinates): Coordinates {}
//   // TODO: Create buildGeocodeQuery method
//   private buildGeocodeQuery(): string {}
//   // TODO: Create buildWeatherQuery method
//   private buildWeatherQuery(coordinates: Coordinates): string {}
//   // TODO: Create fetchAndDestructureLocationData method
//   private async fetchAndDestructureLocationData() {}
//   // TODO: Create fetchWeatherData method
//   private async fetchWeatherData(coordinates: Coordinates) {}
//   // TODO: Build parseCurrentWeather method
//   private parseCurrentWeather(response: any) {}
//   // TODO: Complete buildForecastArray method
//   private buildForecastArray(currentWeather: Weather, weatherData: any[]) {}
//   // TODO: Complete getWeatherForCity method
//   async getWeatherForCity(city: string) {}
// }

export default new WeatherService();
