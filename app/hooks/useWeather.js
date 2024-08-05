import { useState } from 'react';
import { fetchWeatherData } from '../services/weatherService';

export default function useWeather() {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  const fetchWeather = async (lat, lon) => {
    try {
      setWeather(null);
      setError(null);
      const data = await fetchWeatherData(lat, lon);
      setWeather(data);
    } catch (err) {
      setError('Error fetching weather data. Please try again.');
    }
  };

  return { weather, error, fetchWeather };
}