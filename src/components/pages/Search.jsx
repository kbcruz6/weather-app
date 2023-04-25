import React, { useState, useContext, useEffect } from "react";
import { WeatherContext } from "../../context/WeatherContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Footer from "../common/Footer";
import Header from "../common/Header";

import Spinner from "../common/Spinner";
import { BsSearch } from "react-icons/bs";
import Swal from "sweetalert2";

const Search = () => {
  //! VARIABLES
  const { setWeather, unit } = useContext(WeatherContext);

  const [queryType, setQueryType] = useState("");
  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");
  const [loading, setLoading] = useState(false);
  const [city, setCity] = useState("");
  const { REACT_APP_WEATHER_KEY } = process.env;

  const navigate = useNavigate();
  const [aux, setAux] = useState(false);
  const [auxTwo, setAuxTwo] = useState(false);

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${REACT_APP_WEATHER_KEY}&units=${unit}`;

  const [urlCity, setUrlCity] = useState(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${REACT_APP_WEATHER_KEY}&units=${unit}`
  );

  const urlLat = `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&appid=${REACT_APP_WEATHER_KEY}`;

  //! FUNCTIONS
  //! Fetch with city name
  const fetchWeatherCity = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      const response = await axios.get(url);
      setWeather(response.data);
      setLoading(false);
      navigate("/forecast");
    } catch (error) {
      console.log(error.response);
      return Swal.fire({
        title: "Error! City not found",
        text: "Please enter a valid city",
        icon: "error",
        confirmButtonText: ` <a href="/">OK</a>`,
      });
    }
  };

  //! Getting City name with coordinates
  const getCity = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.get(urlLat);
      setCity(response.data[0].name);
      setAux(!aux);
      console.log("City NAME: ", response.data[0].name);
    } catch (error) {
      console.log("ERROR EN GETCITY", error);
      return Swal.fire({
        title: "Error! City not found",
        text: "Please enter valid cordinates",
        icon: "error",
        confirmButtonText: ` <a href="/">OK</a>`,
      });
    }
  };

  useEffect(() => {
    if (aux === false) {
      return;
    } else {
      setUrlCity(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${REACT_APP_WEATHER_KEY}&units=${unit}`
      );
      setAuxTwo(!auxTwo);
    }
  }, [aux]);

  useEffect(() => {
    if (auxTwo === false) {
      return;
    } else {
      const fetchWeatherLat = async (e) => {
        try {
          setLoading(true);
          const response = await axios.get(url);
          setWeather(response.data);
          setLoading(false);
          navigate("/forecast");
        } catch (error) {
          return Swal.fire({
            title: "Error! City not found",
            text: "Please enter a valid city",
            icon: "error",
            confirmButtonText: ` <a href="/">OK</a>`,
          });
        }
      };
      fetchWeatherLat();
    }
  }, [auxTwo]);

  //? 51.5098
  //? -0.1180

  if (loading) {
    return <Spinner />;
  } else {
    return (
      <div className="flex flex-col h-screen w-full justify-between items-center dark:bg-gray-900 duration-300">
        {/*//! HEADER  */}
        <Header text={"Search zone!"} />

        {/*//! BODY  */}
        <div className="flex-col flex gap-4 justify-center items-center h-full">
          <h1
            data-aos="fade"
            data-aos-duration="1000"
            data-aos-delay="200"
            className="font-bold text-2xl text-center"
          >
            {queryType === ""
              ? "Type of query..."
              : [
                  queryType === "city"
                    ? "Query by City Name"
                    : "Query by Coordinates",
                ]}
          </h1>
          {/*//! OPTIONS */}
          <div className="flex sm:flex-row flex-col gap-6">
            <div
              className={
                queryType === ""
                  ? "flex sm:flex-row flex-col justify-center items-center text-center gap-4 p-2 font-bold text-xl"
                  : "hidden"
              }
            >
              <div
                data-aos="fade-right"
                data-aos-duration="1000"
                data-aos-delay="200"
              >
                <button
                  onClick={() => setQueryType("city")}
                  className="bg-[var(--color2)] text-[var(--color4)] rounded-3xl shadow-red-800 px-6 py-2 hover:bg-[var(--color4)] hover:text-[var(--color2)] dark:bg-slate-300 dark:text-slate-700 dark:shadow-slate-600 dark:hover:bg-slate-900 dark:hover:text-slate-300 duration-300 shadow-md"
                >
                  By City Name
                </button>
              </div>

              <div
                data-aos="fade-left"
                data-aos-duration="1000"
                data-aos-delay="600"
              >
                <button
                  onClick={() => setQueryType("lat")}
                  className="bg-[var(--color2)] text-[var(--color4)] rounded-3xl shadow-red-800 px-6 py-2 hover:bg-[var(--color4)] hover:text-[var(--color2)] dark:bg-slate-300 dark:text-slate-700 dark:shadow-slate-600 dark:hover:bg-slate-900 dark:hover:text-slate-300 duration-300 shadow-md"
                >
                  By Latitude & Longitude
                </button>
              </div>
            </div>
            {/*//! BY CITY  */}
            <div className={queryType === "city" ? "" : "hidden"}>
              <div className="">
                <form
                  onSubmit={fetchWeatherCity}
                  className="flex flex-col justify-center items-center text-center bg-[var(--color2)] text-[var(--color4)] w-[300px] h-[200px] rounded-3xl shadow-red-800 gap-4 p-2 dark:bg-gray-800 dark:text-slate-300 dark:shadow-slate-700  duration-300 shadow-md"
                >
                  <p className="font-bold">Examples: Tokyo, Madrid</p>
                  <input
                    required
                    onChange={(e) => setCity(e.target.value)}
                    value={city}
                    type="text"
                    placeholder="City name"
                    className=" rounded-3xl bg-[var(--color4)] text-[var(--color2)] px-3 py-1 outline-none shadow-red-800 dark:bg-slate-600 dark:text-slate-300 dark:shadow-slate-600 dark:hover:bg-slate-900 duration-300 shadow-md"
                  ></input>
                  <button className="font-bold rounded-3xl bg-[var(--color4)] text-[var(--color2)] px-3 py-1 hover:bg-red-600 shadow-red-800 dark:bg-slate-600 dark:text-slate-300 dark:shadow-slate-600 dark:hover:bg-slate-900 dark:hover:text-slate-300 duration-300 shadow-md">
                    <div className="justify-between items-center flex flex-row gap-3">
                      Search <BsSearch size={15} />
                    </div>
                  </button>
                </form>
              </div>
            </div>

            {/*//! BY LAT & LONG  */}
            <div className={queryType === "lat" ? "" : "hidden"}>
              <form
                onSubmit={getCity}
                className="flex flex-col justify-center items-center text-center bg-[var(--color2)] text-[var(--color4)] w-[300px] h-[250px] rounded-3xl shadow-red-800 gap-3 p-2 dark:bg-gray-800 dark:text-slate-300 dark:shadow-slate-700  duration-300 shadow-md"
              >
                <p className="font-bold">Madrid example:</p>
                <p className="font-bold"> Lat: 40.4165, Lon: -3.70256</p>
                <div>
                  <input
                    required
                    onChange={(e) => setLat(e.target.value)}
                    value={lat}
                    type="text"
                    placeholder="Latitude"
                    className=" rounded-3xl bg-[var(--color4)] text-[var(--color2)] px-3 py-1 outline-none shadow-red-800 mb-3 dark:bg-slate-600 dark:text-slate-300 dark:shadow-slate-600 dark:hover:bg-slate-900 duration-300 shadow-md"
                  ></input>
                  <input
                    required
                    onChange={(e) => setLon(e.target.value)}
                    value={lon}
                    type="text"
                    placeholder="Longitude"
                    className=" rounded-3xl bg-[var(--color4)] text-[var(--color2)] px-3 py-1 outline-none shadow-red-800 dark:bg-slate-600 dark:text-slate-300 dark:shadow-slate-600 dark:hover:bg-slate-900 duration-300 shadow-md"
                  ></input>
                </div>
                <button className="font-bold rounded-3xl bg-[var(--color4)] text-[var(--color2)] px-3 py-1 hover:bg-red-600 shadow-red-800 dark:bg-slate-600 dark:text-slate-300 dark:shadow-slate-600 dark:hover:bg-slate-900 dark:hover:text-slate-300 duration-300 shadow-md">
                  <div className="justify-between items-center flex flex-row gap-3">
                    Search <BsSearch size={15} />
                  </div>
                </button>
              </form>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
};

export default Search;
