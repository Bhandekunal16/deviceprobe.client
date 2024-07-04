import React from "react";
import { useEffect, useState } from "react";
import "./style/dashboard.css";

const Dashboard = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    main();
  }, []);

  async function main() {
    try {
      const res = await fetch(`https://device-probe.vercel.app/get`);
      if (!res.ok) {
        throw new Error("Failed to fetch data from the first endpoint");
      }
      const data = await res.json();
      const encryptedData = data.encrypted;
      const EnodataRes = await fetch(
        `https://device-probe.vercel.app/decrypt`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            key: "robotic.js",
            data: encryptedData,
          }),
        }
      );
      if (!EnodataRes.ok) {
        throw new Error("Failed to fetch data from the second endpoint");
      }
      const Enodata = await EnodataRes.json();
      setData(Enodata.data);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }

  return (
    <div className="project-list-container">
      {data.length > 0 && (
        <table className="project-table">
          <thead>
            <tr>
              <th style={{ backgroundColor: "darkgreen" }}>ip</th>
              <th style={{ backgroundColor: "darkgreen" }}>device Latitude</th>
              <th style={{ backgroundColor: "darkgreen" }}>device Longitude</th>
              <th style={{ backgroundColor: "darkgreen" }}>network</th>
              <th style={{ backgroundColor: "darkgreen" }}>Network provider</th>
              <th style={{ backgroundColor: "darkgreen" }}>device Name</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.ip}>
                <td>{item.ip}</td>
                <td>{item.deviceLatitude}</td>
                <td>{item.deviceLongitude}</td>
                <td>{item.network}</td>
                <td>{item.org}</td>
                <td>{item.deviceName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Dashboard;
