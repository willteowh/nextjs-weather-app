"use client";

import { useState, useEffect } from "react";
import { fetchCitySuggestions } from "@/services/weatherService";
import { useDebouncedCallback } from "use-debounce";
import { FaSearch, FaSpinner } from "react-icons/fa";
import CurrentLocationButton from "./CurrentLocationButton";

export default function LocationSearch({ onLocationSelected }) {
  const [suggestions, setSuggestions] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchSuggestions = useDebouncedCallback(async (query) => {
    if (query.length > 2) {
      try {
        setIsLoading(true);
        const data = await fetchCitySuggestions(query);
        processSuggestion(data, query);
      } catch (error) {
        setError("Error fetching suggestions");
        console.error("Error fetching suggestions:", error);
      } finally {
        setIsLoading(false);
      }
    } else {
      setSuggestions([]);
    }
  }, 300);

  const showPosition = (position) => {
    console.log(position);
    onLocationSelected({
      lat: position.coords.latitude,
      lon: position.coords.longitude,
    });
  };

  const handleSelect = (city) => {
    setSelectedCity(city);
    setSuggestions([]);
    onLocationSelected(city);
  };

  const processSuggestion = (places, query) => {
    const filteredPlaces = places.filter((place) =>
      place.name.toLowerCase().includes(query.toLowerCase())
    );
    if (filteredPlaces.length === 0) {
      setError("Cannot find any city based on the name.");
    } else {
      setError(null); // Clear previous error if there are suggestions
    }
    setSuggestions(filteredPlaces);
  };

  return (
    <>
      <div className="relative w-full max-w-lg mx-auto flex rounded-full pl-4 items-center  bg-white/50 dark:bg-black/20">
        {isLoading ? (
          <FaSpinner className="text-purple-500 mr-2 animate-spin" />
        ) : (
          <FaSearch className="text-purple-500 mr-2" />
        )}
        <input
          className="w-full px-4 py-2 bg-transparent border-none focus:outline-none"
          type="text"
          label="location"
          placeholder="Search for a location"
          onChange={(e) => {
            fetchSuggestions(e.target.value);
          }}
        />
        {suggestions.length > 0 && (
          <ul className="absolute top-full left-0 w-full backdrop-blur border border-gray-300 dark:border-gray-700 rounded-md shadow-lg max-h-60 overflow-auto z-10">
            {suggestions.map((suggestion) => (
              <li
                key={`${suggestion.lat}_${suggestion.lon}`}
                className="px-4 py-2 cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-700 hover:text-blue-800 dark:hover:text-blue-200"
                onClick={() => handleSelect(suggestion)}
              >
                {suggestion.name},{" "}
                {suggestion.state ? suggestion.state + ", " : ""}
                {suggestion.country}
              </li>
            ))}
          </ul>
        )}
        <CurrentLocationButton onGetLocation={showPosition} />
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </>
  );
}
