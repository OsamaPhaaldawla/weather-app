// App.tsx
import { useState } from "react";
import SearchBox from "./SearchBox";
import useWeather from "./useWeather";

function App() {
  const [city, setCity] = useState('Berlin');
  const { location, weather, loading, error } = useWeather(city);

  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>{error}</p>;

  return (
  <>
    <SearchBox search={city} onSearch={setCity} />
    {loading && <p>Loading...</p>}
    {error && <p>{error}</p>}
    {!loading && !error && weather && (
      <p>{location?.name}: {weather.current.temperature_2m}°</p>
    )}
  </>
);
}

export default App;
