import axios from "axios";
import React, { useState } from "react";
import "./App.css";

function App() {
  let apiKey = `f454de7ad255eb19e11038486bc33498`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Kyiv&appid=${apiKey}&units=metric`;
  const [temperature, setTemperature] = useState(null);
  function showTemperature(response) {
    setTemperature(Math.round(response.data.main.temp));
  }
  axios.get(apiUrl).then(showTemperature);
  return (
    <div className="App">
      Current temperature in Kyiv is {temperature} degrees
    </div>
  );
}

export default App;
