import { Router, type Request, type Response } from 'express';
const router = Router();

import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';

// TODO: POST Request with city name to retrieve weather data
router.post('/', (req: Request, res: Response) => {
  // TODO: GET weather data from city name
  const city = req.body.city;
  WeatherService.getWeatherForCity(city)
    .then((data) => {
      res.json(data);
      HistoryService.addCity(city);
    })
    .catch((error) => {
      res.status(404).json({ message: error.message });
    });
  // TODO: save city to search history
});

// TODO: GET search history
router.get('/history', async (_req: Request, res: Response) => {
  const data = await HistoryService.getCities();
  res.json(data);
});

// * BONUS TODO: DELETE city from search history
router.delete('/history/:id', async (req: Request, res: Response) => {
  const id = req.params.id;
  await HistoryService.removeCity(id);
  res.json({ message: 'City removed' });
});

export default router;
