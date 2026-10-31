// useWeather.ts
import { useEffect, useState } from "react";
import type { GeocodingResult, ForecastResponse } from "./types";
import { fetchForecast, searchCity } from "./weatherApi";

interface UseWeatherResult {
  location: GeocodingResult | null;
  weather: ForecastResponse | null;
  loading: boolean;
  error: string;
}

export default function useWeather(city: string): UseWeatherResult {
  const [location, setLocation] = useState<GeocodingResult | null>(null);
  const [weather, setWeather] = useState<ForecastResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let ignore = false; // "this order is still wanted"

    async function fetchData() {
      try {
        setError("");
        setLoading(true);

        const place = await searchCity(city);
        if (ignore) return; // cancelled while waiting? stop here

        setLocation(place);
        const forecast = await fetchForecast(place.latitude, place.longitude);
        if (ignore) return; // cancelled again? stop here

        setWeather(forecast);
      } catch (err) {
        if (ignore) return;
        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    fetchData();

    return () => {
      ignore = true; // runs when `city` changes: "cancel the old order"
    };
  }, [city]);

  return { location, weather, loading, error };
}
