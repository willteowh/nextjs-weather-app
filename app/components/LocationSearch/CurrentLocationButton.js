import React, { useState } from "react";
import { FaSpinner, FaLocationArrow } from "react-icons/fa";

export default function CurrentLocationButton({ onGetLocation }) {
  const [loading, setLoading] = useState(false);

  const handleGeolocationClick = () => {
    if (navigator.geolocation) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLoading(false);
          onGetLocation(position);
        },
        (error) => {
          setLoading(false);
          alert("Error fetching geolocation: " + error.message);
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  return (
    <button
      className="bg-white/30 rounded-full p-4 text-purple-500 dark:text-white hover:bg-white/50"
      onClick={handleGeolocationClick}
      disabled={loading}
    >
      {loading ? <FaSpinner className="animate-spin" /> : <FaLocationArrow />}
    </button>
  );
}
