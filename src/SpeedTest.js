/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./style/speedTest.css";

const SpeedTest = () => {
  const [downloadSpeed, setDownloadSpeed] = useState(null);
  const [loading, setLoading] = useState(false);
  const [flag, setFlag] = useState(false);
  const [intervalId, setIntervalId] = useState(null);

  const testDownloadSpeed = async () => {
    setLoading(true);
    const imageUrl = "https://picsum.photos/1920/1080";
    const startTime = new Date().getTime();
    try {
      const response = await axios.get(imageUrl, { responseType: "blob" });
      const endTime = new Date().getTime();
      const duration = (endTime - startTime) / 1000;
      const fileSize = response.headers["content-length"];
      const speedMbps = (fileSize * 8) / (duration * 1024 * 1024);
      setDownloadSpeed(speedMbps.toFixed(2));
    } catch (error) {
      console.error("Error during download speed test:", error);
      setDownloadSpeed("Error");
    }
    setLoading(false);
  };

  const startSpeedTest = () => {
    testDownloadSpeed();
    if (!intervalId) {
      const id = setInterval(testDownloadSpeed, 10000);
      setIntervalId(id);
    }
  };

  const stopSpeedTest = () => {
    clearInterval(intervalId);
    setIntervalId(null);
    setFlag(false);
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
