import React, { useState, useEffect } from "react";
import "./styles.css";

function useSearchParams() {
  const [searchParams, setSearchParams] = useState(
    new URLSearchParams(window.location.search)
  );

  const updateSearchParams = (params) => {
    const newSearchParams = new URLSearchParams(params);
    setSearchParams(newSearchParams);
    window.history.pushState({}, "", "?" + newSearchParams.toString());
  };

  return [searchParams, updateSearchParams];
}

function Home() {
  const [humidity, setHumidity] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const [cityName, setCityName] = useState("");

  const fetchHumidity = async () => {
    if (!cityName) return; // Exit early if cityName is empty

    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=1aa7ff41ca9e4ec0b87103105241706&q=${cityName}&aqi=no`
    );
    const data = await response.json();

    const humidity = data.current?.humidity;
    if (humidity !== undefined) {
      setHumidity(humidity);
    } else {
      console.error("Humidity data not available");
    }
  };

  const handleCityNameChange = (e) => {
    setCityName(e.target.value);
    setSearchParams({ cityName: e.target.value });
  };

  return (
    <div classname="Weather">
      <h1>Check Humidity</h1>

      <input placeholder="Enter city name" onChange={handleCityNameChange} />
      <button onClick={fetchHumidity}>Result</button>

      <h1>
        {searchParams.get("cityName")} humidity: {humidity}
      </h1>
    </div>
  );
}

export default Home;
