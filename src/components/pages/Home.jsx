import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Header from "../common/Header";
import Footer from "../common/Footer";
import weatherPic from "../../assets/weather.png";

const Home = () => {
  return (
    <div className="flex flex-col h-screen w-full justify-between">
      {/*//! HEADER  */}
      <Header text={"Welcome to the ultimate Weather Forecast App!"} />

      {/*//! BODY  */}
      <div className="justify-center items-center flex flex-col w-full gap-10">
        <div className="flex sm:flex-row flex-col sm:justify-evenly justify-center items-center sm:p-4 mt-2">
          <img
            data-aos="fade-right"
            data-aos-duration="1000"
            data-aos-delay="200"
            src={weatherPic}
            className="sm:w-[300px] w-[200px]"
            alt="weather"
          />
          <div
            data-aos="fade-left"
            data-aos-duration="1000"
            data-aos-delay="700"
            className="sm:text-6xl text-4xl sm:text-right text-center sm:w-[50%] p-4"
          >
            We provide the BEST Real-Time weather forecast for you!
          </div>
        </div>
        <div
          data-aos="fade-right"
          data-aos-duration="1000"
          data-aos-delay="1000"
        >
          <button className="font-bold rounded-3xl px-3 py-2 mb-4 text-2xl bg-[var(--color2)] text-[var(--color4)] hover:bg-[var(--color4)] hover:text-[var(--color2)] duration-300 shadow-lg shadow-red-800">
            <Link to="/search">Click here to make your query</Link>
          </button>
        </div>
      </div>

      {/*//! FOOTER  */}
      <Footer />
    </div>
  );
};

export default Home;
