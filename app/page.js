"use client";

import { useEffect } from "react";
import LocationSearch from "@/components/LocationSearch";
import ErrorMessage from "@/components/Weather/ErrorMessage";
import WeatherDisplay from "@/components/Weather/WeatherDisplay";
import SearchHistory from "@/components/SearchHistory";
import useWeather from "@/hooks/useWeather";
import { useSearchHistory } from "@/hooks/useSearchHistory";
import ThemeToggleButton from "./components/Theme/ThemeToggleButton";

export default function Home() {
  const { weather, error, fetchWeather } = useWeather();
  const { searchHistory, addSearchHistory, deleteSearchHistory } =
    useSearchHistory();

  const getWeatherInfo = (location) => {
    fetchWeather(location.lat, location.lon);
  };

  const getWeather = (weather) => {
    fetchWeather(weather.coord.lat, weather.coord.lon);
  };

  useEffect(() => {
    if (weather) {
      addSearchHistory(weather);
    }
  }, [weather]);

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-center p-4 md:p-24`}
    >
      <h1 className="text-4xl font-bold mb-8">Weather App</h1>
      <LocationSearch onLocationSelected={getWeatherInfo} />

      {weather && (
        <div className="rounded-3xl border-white border-solid border-2 max-w-lg w-full p-4 md:p-8 mt-4 bg-white/20  dark:bg-slate-700/20 shadow-md">
          {weather && <WeatherDisplay weather={weather} />}
          {error && <ErrorMessage message={error} />}

          <SearchHistory
            searchHistory={searchHistory}
            onDelete={deleteSearchHistory}
            onQuery={getWeather}
          ></SearchHistory>
        </div>
      )}

      <div className="fixed bottom-4 right-4">
        <ThemeToggleButton></ThemeToggleButton>
      </div>
    </main>
  );
}
