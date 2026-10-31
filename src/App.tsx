// App.tsx
import useWeather from "./useWeather";

function App() {
  const { location, weather, loading, error } = useWeather("Khartoum");

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <h1>Weather App</h1>
      <p>{location?.name}, {location?.country}</p>
      <p>{weather?.current.temperature_2m}°</p>
    </>
  );
}

export default App;
