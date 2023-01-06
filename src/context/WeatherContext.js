import { createContext, useState } from "react";

export const WeatherContext = createContext();

const WeatherContextProvider = ({ children }) => {
  const [userData, setUserData] = useState({ name: "", lastName: "" });
  const [weather, setWeather] = useState({});
  const [unit, setUnit] = useState("metric");

  const data = {
    userData,
    setUserData,
    weather,
    setWeather,
    unit,
    setUnit,
  };
  return (
    <WeatherContext.Provider value={data}>{children}</WeatherContext.Provider>
  );
};

export default WeatherContextProvider;
