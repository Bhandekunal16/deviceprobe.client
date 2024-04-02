/* eslint-disable react/jsx-no-undef */
import "./App.css";
import Trap from "./trap";
import {
  BrowserRouter as Router,
  Routes,
  Route as RouteV6,
} from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <RouteV6 path="" element={<Trap />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
