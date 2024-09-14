import { Router, type Request, type Response } from 'express';
import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';

const router = Router();



// TODO: POST Request with city name to retrieve weather data


router.post('/', async (req: Request, res: Response) => {
  try {
    // Get cityName from request body
    const { cityName } = req.body;
    // Fetch weather data using WeatherService
    const weatherData = await WeatherService.getWeatherForCity(cityName);

    
    console.log('Weather successfully retrieved for city:', cityName);
    console.log('===============================================');


    // Save city to search history
    await HistoryService.addCity(cityName);

    // Send the weather data back to the client
    res.json(weatherData);
  } catch (error) {
    console.error('Error retrieving weather:', error);
    res.status(500).json({ msg: 'An error occurred', }); // Improved error message


  }
});











// // TODO: save city to search history
// router.post('/history', async (req: Request, res: Response) =>{
//   const city = req.body.cityName;
//   const savedCity = await HistoryService.addCity(city);
//   res.json(savedCity);

// });






// TODO: GET search history
router.get("/history", async (_req: Request, res: Response) => {
  try {
    const savedCities = await HistoryService.getCities();
    res.json(savedCities);
    console.log("Cities successfully retrieved from search history");
    console.log("===============================================");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// delete city from search history
router.delete("/history/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedCity = await HistoryService.removeCity(id);
    res.json(deletedCity);
    console.log("City successfully deleted from search history");
    console.log("===============================================");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

export default router;




