import "./style/App.css";
import Trap from "./trap";
import Dashboard from "./dashboard";
import {
  BrowserRouter as Router,
  Routes,
  Route as RouteV6,
} from "react-router-dom";
import SpeedTest from "./SpeedTest";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <RouteV6 path="" element={<Trap />} />
          <RouteV6 path="Dashboard" element={<Dashboard />} />
          <RouteV6 path="speed" element={<SpeedTest />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
