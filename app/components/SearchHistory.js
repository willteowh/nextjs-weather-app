import React from "react";
import { FaTrash, FaSearch } from "react-icons/fa";

export default function SearchHistory({searchHistory, onQuery, onDelete}) {


  return (
    <div className="rounded-3xl border-white border-solid border-2 max-w-lg w-full p-4 mt-4 bg-white/20  dark:bg-slate-700/20 shadow-md">
      <h4 className="text-xl font-bold">Search History</h4>
      <ul className="mt-4">
        {searchHistory.map((search, index) => (
          <li
            key={search.timestamp.valueOf()}
            className="flex items-center p-2 bg-white/20 dark:bg-black/20 rounded-xl mt-2"
          >
            <div className="grow">
              <span>{search.weather.name}</span>
            </div>
            <div className="flex gap-2 items-center">
              <span className="text-xs opacity-50">
                {search.timestamp.format("YYYY-MM-DD HH:mm:ss")}
              </span>
              <button className="rounded-full p-2 bg-white/30 hover:bg-white/70 transition-colors duration-200 dark:bg-black/30 dark:hover:bg-black/70" onClick={() => onQuery(search.weather)}>
                <FaSearch></FaSearch>
              </button>
              <button className="rounded-full p-2 bg-white/30 hover:bg-white/70 transition-colors duration-200 dark:bg-black/30 dark:hover:bg-black/70" onClick={() => onDelete(index)}>
                <FaTrash></FaTrash>
              </button>
            </div>
          </li>
        ))}
        <li></li>
      </ul>
    </div>
  );
}
