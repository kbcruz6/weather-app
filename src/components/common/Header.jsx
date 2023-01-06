import React, { useState, useContext } from "react";
import { FaHome } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { ThemeContext } from "../../context/ThemeContext";

const Header = ({ text }) => {
  const { checked, onToggle } = useContext(ThemeContext);

  const location = useLocation();
  return (
    <div className="w-full z-10 fixed top-0 bg-[var(--color2)] flex justify-between items-center shadow-md shadow-red-800 dark:shadow-gray-700 text-[var(--color4)] px-4 dark:bg-gray-800 dark:text-slate-300 duration-300">
      {/*//! TITLE  */}
      <h1 className="p-4 font-bold text-2xl text-left">{text}</h1>

      {/*//! NAVBAR  */}
      <div className="flex flex-row gap-3 items-center justify-center">
        {/*//! IN /SEARCH  */}
        {location.pathname === "/search" ? (
          <div className="flex flex-row gap-3 justify-center items-center">
            <Link className="hover:text-red-600 duration-300" to="/">
              <FaHome size={25} />
            </Link>
            <button
              onClick={() => window.location.reload(false)}
              className="hover:text-red-600 duration-300"
            >
              <BsSearch size={20} />
            </button>
          </div>
        ) : (
          ""
        )}
        {/*//! IN /FORECAST  */}
        {location.pathname === "/forecast" ? (
          <div className="flex flex-row gap-3 justify-center items-center">
            <Link className="hover:text-red-600 duration-300" to="/">
              <FaHome size={25} />
            </Link>
            <Link className="hover:text-red-600 duration-300" to="/search">
              <BsSearch size={20} />
            </Link>
          </div>
        ) : (
          ""
        )}
        <div className="">
          {/*//! TOGGLE SWITCH  */}
          <div className="relative group hover:opacity-90 px-0 mx-2">
            <input
              onChange={onToggle}
              id="switch"
              type="checkbox"
              className="switch-checkbox hidden"
              checked={checked}
            />
            <label
              className={
                checked
                  ? "switch-label flex items-center bg-slate-500 w-[45px] h-[25px] rounded-full relative cursor-pointer"
                  : "switch-label flex items-center bg-[var(--color4)] w-[45px] h-[25px] rounded-full relative cursor-pointer"
              }
              htmlFor="switch"
            >
              <span
                className={
                  checked
                    ? "switch-button w-[20px] relative h-[20px] rounded-full duration-200 left-[3px] moon "
                    : "switch-button w-[20px] relative h-[20px] rounded-full duration-200 left-[3px] light "
                }
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
