export default function WeatherDisplay({ weather }) {
  return (
    <div className=" ">
      <h2 className="text-2xl font-semibold mb-4">{weather.name}</h2>
      <p className="mb-2 text-6xl text-purple-700 dark:text-white">{weather.main.temp}°C</p>
      <p className="mb-2">Description: {weather.weather[0].description}</p>
      <p className="mb-2">Humidity: {weather.main.humidity}%</p>
      <p>Wind Speed: {weather.wind.speed} m/s</p>
    </div>
  );
}