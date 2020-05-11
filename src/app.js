const location = require("./location/location");

let getInfo = async (address) => {
  try {
    const resp = await location.searchLocation(address);

    return resp;
  } catch (error) {
    return "Location not found";
  }
};

getInfo("New York")
  .then((data) => console.log(data))
  .catch((error) => console.log(error));
