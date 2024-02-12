import React from "react";
import logo from "../images/battalkart.jpg";

const Footer = () => {
  return (
    <footer className="absolute bottom-0 left-0 w-full py-4 bg-white border-t border-gray-200 text-slate-800 font-semibold text-xs flex justify-between items-center px-10">
      <div>1.0</div>
      <div>&copy; Onur Kürkaya</div>
      <div>
        <img src={logo} className="w-auto h-6" />
      </div>
    </footer>
  );
};

export default Footer;
