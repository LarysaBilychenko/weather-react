import axios from "axios";
import React, { useState } from "react";
import "./App.css";

export default function App() {
  const [city, setCity] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [weather, setWeather] = useState({});

  function showForecast(response) {
    setLoaded(true);
    setWeather({
      temperature: response.data.main.temp,
      wind: response.data.wind.speed,
      humidity: response.data.main.humidity,
      icon: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
      description: response.data.weather[0].description,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    let apiKey = `f454de7ad255eb19e11038486bc33498`;
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(showForecast);
  }
  function updateCity(event) {
    setCity(event.target.value);
  }
  let form = (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        onChange={updateCity}
        placeholder="Type your city..."
        autoComplete="off"
      />
      <input type="submit" value="Search" />
    </form>
  );
  if (loaded) {
    return (
      <div>
        {form}
        <ul className="Forecast">
          <li>
            Temperature: {Math.round(weather.temperature)} degrees Celsius;
          </li>
          <li>Description: {weather.description}</li>
          <li>Wind: {Math.round(weather.wind)}km/h</li>
          <li>Humidity: {Math.round(weather.humidity)}%</li>
          <li>
            <img src={weather.icon} alt="weather icon" />
          </li>
        </ul>
      </div>
    );
  } else {
    return form;
  }
}
