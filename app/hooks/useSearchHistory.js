import { useState, useEffect } from "react";
import dayjs from "dayjs";

const MAX_HISTORY_LENGTH = 7;

export const useSearchHistory = () => {
  const [searchHistory, setSearchHistory] = useState([]);

  const getSearchHistory = (weather) => {
    const updatedList = [
      { weather, timestamp: dayjs() },
      ...searchHistory,
    ].slice(0, MAX_HISTORY_LENGTH);
    setSearchHistory(updatedList);
  };

  const deleteSearchHistory = (index) => {
    const updatedHistory = [...searchHistory];
    updatedHistory.splice(index, 1);
    setSearchHistory(updatedHistory);
  };

  return { searchHistory, getSearchHistory, deleteSearchHistory };
};