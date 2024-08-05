"use client";

import ThemeLayout from "./components/ThemeLayout";
import WeatherForm from "./components/WeatherForm";
import WeatherDisplay from "./components/WeatherDisplay";
import ErrorMessage from "./components/ErrorMessage";
import useWeather from "./hooks/useWeather";
import { useState } from "react";
import { FaTrash, FaSearch } from "react-icons/fa";
import dayjs from "dayjs";

export default function Home() {
  const { weather, error, fetchWeather } = useWeather();
  const [searchHistory, setSearchHistory] = useState([]);

  const handleWeatherSubmit = (location) => {
    fetchWeather(location.lat, location.lon);

    recordSearchHistory(location);
  };

  const recordSearchHistory = (location) => {
    searchHistory.push({ location, timestamp: dayjs() });
  };

  return (
    <ThemeLayout>
      <main
        className={`flex min-h-screen flex-col items-center justify-center p-24`}
      >
        <h1 className="text-4xl font-bold mb-8">Weather App</h1>
        <WeatherForm onSubmit={handleWeatherSubmit} />

        <div className="rounded-3xl border-white border-solid border-2 max-w-lg w-full p-8 mt-4 bg-white/20  dark:bg-slate-700/20 shadow-md">
          {weather && <WeatherDisplay weather={weather} />}
          {error && <ErrorMessage message={error} />}

          {/* search history display */}
          {searchHistory.length > 0 && (
            <div className="rounded-3xl border-white border-solid border-2 max-w-lg w-full p-4 mt-4 bg-white/20  dark:bg-slate-700/20 shadow-md">
              <h4 className="text-xl font-bold">Search History</h4>
              <ul className="mt-4">
                {searchHistory.map((search) => (
                  <li className="flex items-center p-2 bg-white/20 dark:bg-black/20 rounded-xl mt-2">
                    <div className="grow">
                      <span>{search.location.name}, {search.location.country}</span>
                    </div>
                    <div className="flex gap-2 items-center">
                      <span>
                        {search.timestamp.format("YYYY-MM-DD HH:mm:ss")}
                      </span>
                      {/* to be implemented */}
                      {/* <button className="rounded-full p-2 bg-white/30 hover:bg-white/70 transition-colors duration-200 dark:bg-black/30 dark:hover:bg-black/70">
                        <FaSearch></FaSearch>
                      </button> */}
                      {/* <button className="rounded-full p-2 bg-white/30 hover:bg-white/70 transition-colors duration-200 dark:bg-black/30 dark:hover:bg-black/70">
                        <FaTrash></FaTrash>
                      </button> */}
                    </div>
                  </li>
                ))}
                <li></li>
              </ul>
            </div>
          )}
        </div>
      </main>
    </ThemeLayout>
  );
}
