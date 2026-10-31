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
  const [calledCity, setCalledCity] = useState<GeocodingResult | null>(null);
  const [data, setData] = useState<ForecastResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        setError("");
        setLoading(true);
        const cityResponse = await searchCity(city);
        setCalledCity(cityResponse);
        const weather = await fetchForecast(
          cityResponse.latitude,
          cityResponse.longitude,
        );
        setData(weather);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [city]);

  return { location: calledCity, weather: data, loading, error };
}
