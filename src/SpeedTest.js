/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./style/speedTest.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SpeedTest = () => {
  const [downloadSpeed, setDownloadSpeed] = useState(null);
  const [loading, setLoading] = useState(false);
  const [flag, setFlag] = useState(false);
  const [intervalId, setIntervalId] = useState(null);

  const testDownloadSpeed = async () => {
    setLoading(true);

    const imageUrls = [];
    for (let index = 0; index < 100; index++) {
      imageUrls.push(`https://picsum.photos/1920/1080?random=${index}`);
    }

    const startTime = new Date().getTime();
    let totalSize = 0;

    try {
      const responses = await Promise.all(
        imageUrls.map((imageUrl) =>
          axios.get(imageUrl, { responseType: "blob" })
        )
      );

      const endTime = new Date().getTime();
      const totalDuration = (endTime - startTime) / 1000;

      responses.forEach((response) => {
        const fileSize = response.headers["content-length"];
        totalSize += parseInt(fileSize, 10);
      });

      const averageSpeedMbps = (totalSize * 8) / (totalDuration * 1024 * 1024);
      setDownloadSpeed(averageSpeedMbps.toFixed(2));
    } catch (error) {
      toast.error("An error occurred while testing download speed.");
      setDownloadSpeed("Error");
    } finally {
      setLoading(false);
    }
  };

  const startSpeedTest = () => {
    testDownloadSpeed();
    if (!intervalId) {
      const id = setInterval(testDownloadSpeed, 30000);
      setIntervalId(id);
    }
  };

  const stopSpeedTest = () => {
    clearInterval(intervalId);
    setIntervalId(null);
    setFlag(false);
    toast.warn("Speed testing process stopped.");
  };

  useEffect(() => {
    if (flag) {
      startSpeedTest();
    } else {
      stopSpeedTest();
    }
  }, [flag]);

  const toggleFlag = () => {
    setFlag(!flag);
  };

  return (
    <div>
      <div className="speed-container">
        <ToastContainer />
        <div className="speed-container-checker">
          <button onClick={toggleFlag} disabled={loading}>
            {flag ? "Testing..." : "Test Download Speed"}
          </button>
          <button onClick={stopSpeedTest} disabled={!flag || loading}>
            Stop Testing
          </button>
          <div>
            {loading && <p>Testing...</p>}
            {downloadSpeed !== null && (
              <h2>
                Download Speed:{" "}
                {downloadSpeed === "Error" ? "Error" : `${downloadSpeed} Mbps`}
              </h2>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpeedTest;
