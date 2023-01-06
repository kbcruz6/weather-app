import React from "react";
import { FaHome } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { BsSearch } from "react-icons/bs";

const Navbar = ({ text }) => {
  const location = useLocation();
  console.log(location);
  return (
    <div className="w-full">
      <div className="bg-[var(--color2)] flex justify-between items-center shadow-lg shadow-red-800 text-[var(--color4)] px-4 ">
        <h1 className="p-4 font-bold text-2xl text-left">{text}</h1>
        <div className="flex flex-row gap-3 items-center justify-center">
          {location.pathname !== "/" ? (
            <Link className="hover:text-red-600 duration-300" to="/">
              <FaHome size={25} />
            </Link>
          ) : (
            ""
          )}
          {location.pathname === "/forecast" ? (
            <Link className="hover:text-red-600 duration-300" to="/search">
              <BsSearch size={20} />
            </Link>
          ) : (
            ""
          )}
          <div className="">🌎</div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
