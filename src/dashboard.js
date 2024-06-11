import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import "./dashboard.css";

const Dashboard = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    main();
  }, []);

  async function main() {
    const res = await axios.get(`https://device-probe.vercel.app/get`);

    const Enodata = await axios.post(
      `https://device-probe.vercel.app/decrypt`,
      {
        key: "robotic.js",
        data: res.data.encrypted,
      }
    );

    setData(Enodata.data.data);
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
