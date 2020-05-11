const location = require("./location/location");
const weather = require("./weather/weather");

let getInfo = async (address) => {
  try {
    const geoLocation = await location.searchLocation(address);

    const findWeather = weather.searchWeather(
      geoLocation.coords.latitude,
      geoLocation.coords.longitude
    );

    return findWeather;
  } catch (error) {
    return "Location not found";
  }
};

getInfo("New York")
  .then((data) => {
    const temp = Math.round(data.data[0].temp * (9 / 5) + 32);
    const today = new Date();
    const time = today.getHours() + ":" + today.getMinutes();
    console.log(`Time: ${time}, Temp: ${temp} \xB0F`);
  })
  .catch((error) => console.log(error));
