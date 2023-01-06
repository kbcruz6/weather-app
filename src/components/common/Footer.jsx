import React from "react";
import { FaBars, FaTimes, FaGithub, FaLinkedin } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { FiPaperclip } from "react-icons/fi";
import { Link } from "react-scroll";

const Footer = () => {
  return (
    <div className="bg-[var(--color2)] text-[var(--color4)] w-full text-center p-2 bottom-0 fixed dark:bg-gray-800 dark:text-slate-400 duration-300">
      <div className="flex flex-col justify-center items-center gap-0 text-sm">
        {/*//! CONTACT  */}
        <div className="flex gap-2 ">
          <a
            href="https://www.linkedin.com/in/agustin-frontend-react/"
            target="_blank"
            className="hover:text-red-600 duration-300"
          >
            <FaLinkedin size={20} />
          </a>
          <a
            href="https://github.com/kbcruz6"
            target="_blank"
            className="hover:text-red-600 duration-300"
          >
            <FaGithub size={20} />
          </a>
          <a
            href="mailto:agustin.tcw@gmail.com"
            target="_blank"
            className="hover:text-red-600 duration-300"
          >
            <HiOutlineMail size={20} />
          </a>
        </div>

        {/*//! COPY  */}
        <div>
          © 2023 | Created by{" "}
          <a
            className="font-bold hover:text-red-600 duration-300"
            href="https://portfolio-agustincruz.vercel.app/"
          >
            Agustin Cruz
          </a>
        </div>
        <div>All rights reserved</div>
      </div>
    </div>
  );
};

export default Footer;
