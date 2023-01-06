import React from "react";
import { FaHome } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { BsSearch } from "react-icons/bs";

const Navbar = ({ text }) => {
  const location = useLocation();
  return (
    <div className="w-full z-10 fixed top-0 bg-[var(--color2)] flex justify-between items-center shadow-lg shadow-red-800 text-[var(--color4)] px-4 ">
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
        <div className="">🌎</div>
      </div>
    </div>
  );
};

export default Navbar;
