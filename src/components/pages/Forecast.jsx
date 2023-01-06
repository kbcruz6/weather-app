import React, { useContext } from "react";
import Footer from "../common/Footer";
import Header from "../common/Header";
import { WeatherContext } from "../../context/WeatherContext";

const Forecast = () => {
  const { userData, weather, unit } = useContext(WeatherContext);
  console.log(weather);

  return (
    <div className="flex flex-col h-screen w-full justify-between items-center">
      <Header text={`${weather.name.toUpperCase()}, ${weather.sys.country}`} />
      {/*//! CURRENT WEATHER  */}
      <div className="items-center justify-center flex flex-col">
        {/*//! TEMPERATURE & ICON */}
        <div className=" font-bold text-7xl text-center flex flex-col justify-center items-center">
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt="/"
            width={150}
            height={150}
            className=""
          />
          <div>
            {weather.main.temp.toFixed(0)}
            {unit === "metric" ? "°C" : [unit === "imperial" ? "°F" : "°K"]}
          </div>
        </div>

        {/*//! MIN & MAX TEMP  */}
        <div className="flex flex-row text-2xl w-[270px] items-center justify-between text-center my-6">
          <p>Min: {weather.main.temp_min.toFixed(0)}°C</p>
          <p>Max: {weather.main.temp_max.toFixed(0)}°C</p>
        </div>

        {/*//! BOX  */}
        <div className="flex flex-row justify-between p-6 bg-[var(--color2)] text-[var(--color4)] rounded-3xl shadow-lg shadow-red-800 px-5 py-4 gap-4 mb-4">
          {/*//! HUMIDITY  */}
          <div className="  text-center">
            <h3 className="font-bold">Humidity</h3>
            <div>{weather.main.humidity} %</div>
          </div>
          {/*//! DESCRIPTION  */}
          <div className="  text-center">
            <h3 className="font-bold">Sky conditions</h3>
            <div>
              {weather.weather[0].description.charAt(0).toUpperCase() +
                weather.weather[0].description.slice(1)}
            </div>
          </div>
          {/*//! WIND SPEED  */}
          <div className="  text-center">
            <h3 className="font-bold">Wind speed</h3>
            <div>{weather.wind.speed.toFixed(0)} km/h</div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Forecast;
