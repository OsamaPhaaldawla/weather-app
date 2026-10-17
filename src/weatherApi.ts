import type { ForecastResponse, GeocodingResponse, GeocodingResult } from "./types";

export async function searchCity(
  name: string,
): Promise<GeocodingResult> {
  const response = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(name)}&count=1`,
  );
  if (!response.ok) throw new Error("Something went wrong");
  const data: GeocodingResponse = await response.json();
  if (!data.results || data.results.length === 0) throw new Error("City not found");
  return data.results[0];
}

export async function fetchForecast(
  latitude: number,
  longitude: number,
): Promise<ForecastResponse> {
  const response = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,apparent_temperature,relative_humidity_2m,precipitation,wind_speed_10m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto`,
  );
  if (!response.ok) throw new Error("Something went wrong");
  return response.json()
}
