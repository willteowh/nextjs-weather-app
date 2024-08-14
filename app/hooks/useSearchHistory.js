import { useState, useEffect } from "react";
import dayjs from "dayjs";
import { MAX_SEARCH_HISTORY_LENGTH } from "../lib/constant";


export const useSearchHistory = () => {
  const [searchHistory, setSearchHistory] = useState([]);

  const addSearchHistory = (weather) => {
    const updatedList = [
      { weather, timestamp: dayjs() },
      ...searchHistory,
    ].slice(0, MAX_SEARCH_HISTORY_LENGTH);
    setSearchHistory(updatedList);
  };

  const deleteSearchHistory = (index) => {
    const updatedHistory = [...searchHistory];
    updatedHistory.splice(index, 1);
    setSearchHistory(updatedHistory);
  };

  return { searchHistory, addSearchHistory, deleteSearchHistory };
};