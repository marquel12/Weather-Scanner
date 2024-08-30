import dotenv from 'dotenv';



dotenv.config();

// TODO: Define an interface for the Coordinates object
interface Coordinates { // what this is telling me is that I will get back an object with the following properties from the api
  name: string;
  lat: number;
  country: string;
  state?: string;
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
  private baseURL: string;

  private apiKey: string;

  private cityName?: string;

  constructor() {
    this.baseURL = process.env.API_BASE_URL || '';

    this.apiKey = process.env.API_KEY as string;
  }


  
  // TODO: Create fetchLocationData method
  private async fetchLocationData() {
    
      if (!this.cityName || !this.apiKey) {
        throw new Error('City name or API key is missing');
      }
    
      const url = this.buildGeocodeQuery();
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch location data');
      }
      const data = await response.json();
      
    
      // Ensure data contains results
      if (!data || data.length === 0) {
        throw new Error('No location data found');
      }

      return data[0];
  }
// //   // TODO: Create buildGeocodeQuery method
  private buildGeocodeQuery(): string {
    return `${this.baseURL}/geo/1.0/direct?q=${this.cityName}&limit=1&appid=${this.apiKey}`;
  }
//   // TODO: Create buildWeatherQuery method
    private buildWeatherQuery(coordinates: Coordinates): string {
      return `${this.baseURL}/data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${this.apiKey}`;
    }
  //   // TODO: Create fetchAndDestructureLocationData method
    private async fetchAndDestructureLocationData() {
     
        // Fetch location data
        const data = await this.fetchLocationData();
      
        // Check if locationData is undefined or null
        if (!data) {
          throw new Error('Location data is undefined or null');
        }
      
        // Destructure the required properties
        const { name, lat, lon, country, state } = data;
        console.log(data)
      
        // Return the destructured properties
        return { name, lat, lon, country, state };


  }
  //   // TODO: Create fetchWeatherData method
    private async fetchWeatherData(coordinates: Coordinates) {
      const response = await fetch(this.buildWeatherQuery(coordinates));
      if (!response.ok) {
        throw new Error('Failed to fetch weather data');
      return await response.json();
      
    }
  }
//   // TODO: Build parseCurrentWeather method
  private parseCurrentWeather(response: any) {
    console.log(response)
    const name = response.city.name;
    const tempF = response.list[0].main.temp;
    const windSpeed = response.list[0].wind.speed;
    const humidity = response.list[0].main.humidity;
    const icon = response.list[0].weather[0].icon;
    console.log(name, tempF, windSpeed, humidity, icon)
  return new Weather(name, new Date().toLocaleDateString(), name, tempF, windSpeed, humidity, icon, );
  }
// //   // TODO: Complete buildForecastArray method
  private buildForecastArray(currentWeather: Weather, weatherData: any[]) {
    return weatherData.map((weather) => {
      const { date, tempF, windSpeed, humidity, icon, iconDescription } = weather;
      return new Weather(currentWeather.name, date, tempF, windSpeed, humidity, icon, iconDescription);
    });

  }
//   // TODO: Complete getWeatherForCity method
  async getWeatherForCity(city: string) {
    this.cityName = city;
  
    const locationData = await this.fetchAndDestructureLocationData();
    console.log(locationData)
    
    const weatherData = await this.fetchWeatherData(locationData);
console.log(weatherData)
    const currentWeather = this.parseCurrentWeather (weatherData);
    console.log(currentWeather)
    const forecast = this.buildForecastArray(currentWeather, weatherData);
    console.log(forecast) 
    return [currentWeather, ...forecast
    ];


  }
}

export default new WeatherService();
