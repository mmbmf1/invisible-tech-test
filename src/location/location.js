require("dotenv").config();
const config = require("../config");
const fetch = require("node-fetch");

//format the location API query
const formatParams = (params) => {
  const queryItems = Object.keys(params).map(
    (key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
  );
  return queryItems.join("&");
};


//fetch location lat/lon
const searchLocation = async (location) => {
  const geoKey = config.LOCATION_KEY;
  const geoUrl = config.LOCATION_URL;

  const geoParams = {
    key: geoKey,
    location: location,
  };

  const geoString = formatParams(geoParams);
  const gUrl = geoUrl + "?" + geoString;

  const coords = await fetch(gUrl)
    .then((response) => response.json())
    .then((locationCoords) => {
      const position = {
        coords: {
          latitude: locationCoords.results[0].locations[0].displayLatLng.lat,
          longitude: locationCoords.results[0].locations[0].displayLatLng.lng,
        },
      };

      return position;
    });

  return coords;
};

module.exports = {
  searchLocation,
};
