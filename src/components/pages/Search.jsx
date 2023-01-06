import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Footer from "../common/Footer";
import Header from "../common/Header";
import { WeatherContext } from "../../context/WeatherContext";
import Spinner from "../common/Spinner";

const Search = () => {
  //! VARIABLES
  const { weather, setWeather, unit } = useContext(WeatherContext);

  const [queryType, setQueryType] = useState("");
  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");
  const [loading, setLoading] = useState(false);
  const [city, setCity] = useState({ city1: "", city2: "" });
  const PUBLIC_WEATHER_KEY = "708abcef5861171a96f64c0a61fd7cc2";

  const navigate = useNavigate();
  const [aux, setAux] = useState(false);
  const [auxTwo, setAuxTwo] = useState(false);

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.city1}&appid=${PUBLIC_WEATHER_KEY}&units=${unit}`;

  const [urlCity, setUrlCity] = useState(
    `https://api.openweathermap.org/data/2.5/weather?q=${city.city2}&appid=${PUBLIC_WEATHER_KEY}&units=${unit}`
  );
  const urlLat = `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&appid=${PUBLIC_WEATHER_KEY}`;

  //! FUNCTIONS
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

  const getCity = async (e) => {
    try {
      e.preventDefault();
      // setLoading(true);
      const response = await axios.get(urlLat);
      setCity({ city2: response.data[0].name });
      setAux(!aux);
      console.log("RESPONSE: ", response);
      console.log("NAME: ", response.data[0].name);
    } catch (error) {
      console.log(error);
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
      const changeUrl = () => {
        setUrlCity(
          `https://api.openweathermap.org/data/2.5/weather?q=${city.city2}&appid=${PUBLIC_WEATHER_KEY}&units=${unit}`
        );
        setAuxTwo(!auxTwo);
      };
      changeUrl();
      console.log("URLCITY", urlCity);
    }
  }, [aux]);

  useEffect(() => {
    if (auxTwo === false) {
      return;
    } else {
      const fetchWeatherLat = async (e) => {
        try {
          e.preventDefault();
          const response = await axios.get(urlCity);
          setWeather(response.data);
          // setLoading(false);
          navigate("/forecast");
        } catch (error) {
          console.log("ERROR RESPONSE", error.response);
          return Swal.fire({
            title: "Error! City not found",
            text: "Please enter valid cordinates",
            icon: "error",
            confirmButtonText: ` <a href="/">OK</a>`,
          });
        }
      };
      fetchWeatherLat();
    }
  }, [auxTwo]);

  // useEffect(() => {
  //   const fetchWeatherLat = async (e) => {
  //     try {
  //       e.preventDefault();
  //       setUrlCity(
  //         `https://api.openweathermap.org/data/2.5/weather?q=${response.data[0].name
  //           .split(" ")
  //           .join("")}&appid=${PUBLIC_WEATHER_KEY}&units=${unit}`
  //       );
  //       console.log("URLCITY", urlCity);
  //       const response = await axios.get(urlCity);
  //       setWeather(response.data);
  //       navigate("/forecast");
  //     } catch (error) {
  //       console.log(error.response);
  //     }
  //   };
  //   fetchWeatherLat();
  // }, [city]);

  // 51.5098
  // -0.1180

  if (loading) {
    return <Spinner />;
  } else {
    return (
      <div className="flex flex-col h-screen w-full justify-between items-center">
        {/*//! HEADER  */}
        <Header text={"Search zone!"} />

        {/*//! BODY  */}
        <div className="flex-col flex gap-4 justify-center items-center">
          <h1
            data-aos="fade"
            data-aos-duration="1000"
            data-aos-delay="200"
            className="font-bold text-2xl"
          >
            Make your query here:
          </h1>
          {/*//! OPTIONS */}
          <div className="flex flex-row gap-6">
            <div
              className={
                queryType === ""
                  ? "flex flex-row justify-center items-center text-center gap-4 p-2 font-bold text-xl"
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
                  className="bg-[var(--color2)] text-[var(--color4)] rounded-3xl shadow-lg shadow-red-800 px-6 py-2 hover:bg-[var(--color4)] hover:text-[var(--color2)] duration-300"
                >
                  By City
                </button>
              </div>

              <div
                data-aos="fade-left"
                data-aos-duration="1000"
                data-aos-delay="600"
              >
                <button
                  onClick={() => setQueryType("lat")}
                  className="bg-[var(--color2)] text-[var(--color4)] rounded-3xl shadow-lg shadow-red-800 px-6 py-2 hover:bg-[var(--color4)] hover:text-[var(--color2)] duration-300"
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
                  className="flex flex-col justify-center items-center text-center bg-[var(--color2)] text-[var(--color4)] w-[300px] h-[200px] rounded-3xl shadow-lg shadow-red-800 gap-4 p-2"
                >
                  <input
                    required
                    onChange={(e) => setCity({ city1: e.target.value })}
                    value={city.city1}
                    type="text"
                    placeholder="City name"
                    className=" rounded-3xl bg-[var(--color4)] text-[var(--color2)] px-3 py-1 outline-none shadow-lg shadow-red-800"
                  ></input>
                  <button className="font-bold rounded-3xl bg-[var(--color4)] text-[var(--color2)] px-3 py-1 hover:bg-red-600 duration-300 shadow-lg shadow-red-800">
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
                className="flex flex-col justify-center items-center text-center bg-[var(--color2)] text-[var(--color4)] w-[300px] h-[200px] rounded-3xl shadow-lg shadow-red-800 gap-4 p-2"
              >
                <div>
                  <input
                    required
                    onChange={(e) => setLat(e.target.value)}
                    value={lat}
                    type="text"
                    placeholder="Latitude"
                    className=" rounded-3xl bg-[var(--color4)] text-[var(--color2)] px-3 py-1 outline-none shadow-lg shadow-red-800 mb-3"
                  ></input>
                  <input
                    required
                    onChange={(e) => setLon(e.target.value)}
                    value={lon}
                    type="text"
                    placeholder="Longitude"
                    className=" rounded-3xl bg-[var(--color4)] text-[var(--color2)] px-3 py-1 outline-none shadow-lg shadow-red-800"
                  ></input>
                </div>
                <button className="font-bold rounded-3xl bg-[var(--color4)] text-[var(--color2)] px-3 py-1 hover:bg-red-600 duration-300 shadow-lg shadow-red-800">
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

{
  /* 
    const handleChange = (e) => {
    setQueryType(e.target.value);
  };
  <form
          onSubmit={fetchWeatherCity}
          className="flex flex-col justify-center items-center text-center bg-[var(--color2)] text-[var(--color4)] w-[300px] h-[200px] rounded-3xl shadow-lg shadow-red-800 gap-4 p-2"
        >
          <select
            required
            name="querytype"
            onChange={handleChange}
            className="outline-none bg-[var(--color4)] text-[var(--color2)] rounded-3xl px-2 py-1 shadow-lg shadow-red-800"
          >
            <option value="">Choose the searching type</option>
            <option value="city">By city name</option>
            <option value="lat">By latitude & longitude</option>
          </select>
          {queryType === "city" ? (
            <input
              required
              onChange={(e) => setCity(e.target.value)}
              value={city}
              type="text"
              placeholder="City name"
              className=" rounded-3xl bg-[var(--color4)] text-[var(--color2)] px-3 py-1 outline-none shadow-lg shadow-red-800"
            ></input>
          ) : queryType === "lat" ? (
            <div>
              <input
                required
                onChange={(e) => setLat(e.target.value)}
                value={lat}
                type="text"
                placeholder="Latitude"
                className=" rounded-3xl bg-[var(--color4)] text-[var(--color2)] px-3 py-1 outline-none shadow-lg shadow-red-800 mb-3"
              ></input>
              <input
                required
                onChange={(e) => setLon(e.target.value)}
                value={lon}
                type="text"
                placeholder="Longitude"
                className=" rounded-3xl bg-[var(--color4)] text-[var(--color2)] px-3 py-1 outline-none shadow-lg shadow-red-800"
              ></input>
            </div>
          ) : (
            <div></div>
          )}

          <button
            className={
              queryType === ""
                ? "hidden"
                : "font-bold rounded-3xl bg-[var(--color4)] text-[var(--color2)] px-3 py-1 hover:bg-red-600 duration-300 shadow-lg shadow-red-800"
            }
          >
            <div className="justify-between items-center flex flex-row gap-3">
              Search <BsSearch size={15} />
            </div>
          </button>
        </form> */
}

// const [zip, setZip] = useState("");
// const url = `https://api.openweathermap.org/data/2.5/weather?zip=${zip}&appid=${process.env.PUBLIC_WEATHER_KEY}`;

//   [
//     queryType === "zip" ? (
//       <input
//         required
//         onChange={(e) => setZip(e.target.value)}
//         value={zip}
//         type="number"
//         placeholder="Zip Code"
//         className=" rounded-3xl bg-[var(--color4)] text-[var(--color2)] px-3 py-1 outline-none shadow-lg shadow-red-800"
//       ></input>
