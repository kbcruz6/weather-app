import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import Search from "./components/pages/Search";
import Forecast from "./components/pages/Forecast";
import AOS from "aos";
import "aos/dist/aos.css";
import WeatherContextProvider from "./context/WeatherContext";
AOS.init();

function App() {
  setTimeout(() => {
    AOS.refresh();
  }, 500);

  return (
    <div className="App ">
      <BrowserRouter>
        <WeatherContextProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/forecast" element={<Forecast />} />
          </Routes>
        </WeatherContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
