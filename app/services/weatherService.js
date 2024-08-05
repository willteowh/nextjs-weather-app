const OPENWEATHER_API_URL = 'https://api.openweathermap.org/data/2.5/weather';
const GEOCODING_API_URL = 'https://api.openweathermap.org/geo/1.0/direct';

export async function fetchWeatherData(lat, lon) {
  const response = await fetch(`/api/weather?lat=${lat}&lon=${lon}`);
  if (!response.ok) {
    throw new Error('Failed to fetch weather data');
  }
  return response.json();
}

export async function fetchCitySuggestions(query) {
  const response = await fetch(`/api/geocoding?query=${query}`);
  if (!response.ok) {
    throw new Error('Failed to fetch city suggestions');
  }
  return response.json();
}