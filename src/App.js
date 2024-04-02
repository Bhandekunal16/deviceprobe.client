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
    console.log(body)
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
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
