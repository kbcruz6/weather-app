import "./App.css";
import { useContext, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import Search from "./components/pages/Search";
import Forecast from "./components/pages/Forecast";
import AOS from "aos";
import "aos/dist/aos.css";
import WeatherContextProvider from "./context/WeatherContext";
import { ThemeContext } from "./context/ThemeContext";
AOS.init();

function App() {
  setTimeout(() => {
    AOS.refresh();
  }, 500);
  const { isDarkTheme } = useContext(ThemeContext);

  return (
    <div className={isDarkTheme ? "dark" : ""}>
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
