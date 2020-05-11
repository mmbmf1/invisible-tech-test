require("dotenv").config();
const config = require("../config");
const fetch = require("node-fetch");

//format weather API query
const formatWeatherParams = (weatherParams) => {
  const queryItems = Object.keys(weatherParams).map(
    (key) =>
      `${encodeURIComponent(key)}=${encodeURIComponent(weatherParams[key])}`
  );
  return queryItems.join("&");
};

//get weather for lat/long
const searchWeather = async (lat, long) => {
  const weatherUrl = config.WEATHER_URL;
  const weatherParams = {
    lat: lat.toString(),
    lon: long.toString(),
    key: config.WEATHER_KEY,
  };

  const weatherString = formatWeatherParams(weatherParams);
  const wUrl = weatherUrl + "?" + weatherString;

  const weather = await fetch(wUrl).then((response) => response.json());

  return weather;
};

module.exports = {
  searchWeather,
};
