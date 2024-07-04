import React, { useState } from "react";
import axios from "axios";
import "./style/speedTest.css";

const SpeedTest = () => {
  const [downloadSpeed, setDownloadSpeed] = useState(null);
  const [loading, setLoading] = useState(false);

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

      if (response) {
        setInterval(() => {
          testDownloadSpeed();
        }, 60000);
      }
    } catch (error) {
      console.error("Error during download speed test:", error);
      setDownloadSpeed("Error");
    }
    setLoading(false);
  };

  return (
    <div>
      <div className="speed-container">
        <div className="speed-container-checker">
          <button onClick={testDownloadSpeed} disabled={loading}>
            Test Download Speed
          </button>

          <div>
            {loading && <p>Testing...</p>}
            {downloadSpeed !== null && (
              <p>
                Download Speed:{" "}
                {downloadSpeed === "Error" ? "Error" : `${downloadSpeed} Mbps`}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpeedTest;
