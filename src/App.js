import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import { useEffect } from "react";


function App() {
  useEffect(() => {
    main();
  }, []);

  function main() {
    return axios
      .get(`https://device-probe.vercel.app/`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return { res: error, status: false, statusCode: 500, error: "error" };
      });
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
