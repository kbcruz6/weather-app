import "./App.css";
import { useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeContext } from "./context/ThemeContext";
import WeatherContextProvider from "./context/WeatherContext";

//! Pages
import Home from "./components/pages/Home";
import Search from "./components/pages/Search";
import Forecast from "./components/pages/Forecast";

//! AOS
import AOS from "aos";
import "aos/dist/aos.css";
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
