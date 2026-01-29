import React from "react";
import { useNavigate } from "react-router-dom";

const Footer = () => {
      const navigate = useNavigate()

  return (
    <footer className="bg-black text-white py-10 px-6 md:px-20">
      <div className="max-w-6xl mx-auto  flex justify-around text-sm md:text-base">
        
        {/* Logo + About */}
        <div>
          <h3 className="text-xl font-bold bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 bg-clip-text text-transparent mb-2">
            SR Photography
          </h3>
          <p className="text-gray-400">
            Crafting Timeless Memories Through Every Click.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-semibold text-[#c7ad7f] mb-2">Quick Links</h4>
          <ul className="space-y-1 text-gray-300">
            <li className="hover:text-[#c7ad7f] cursor-pointer" onClick={()=>{navigate("/");window.scrollTo(0, 0)}}>Home</li>
            <li className="hover:text-[#c7ad7f] cursor-pointer" onClick={()=>{navigate("/gallery");window.scrollTo(0, 0)}}>Gallery</li>
            <li className="hover:text-[#c7ad7f] cursor-pointer" onClick={()=>{navigate("/services");window.scrollTo(0, 0)}}>Services</li>
            <li className="hover:text-[#c7ad7f] cursor-pointer" onClick={()=>{navigate("/contact");window.scrollTo(0, 0)}}>Contact</li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-gray-500 text-xs mt-8">
        © 2025 SR Photography. All rights reserved.
         <p className="mt-1">
    Created by |
    <a
      href="https://jenisha-portfolio.vercel.app/"
      className="text-blue-400 hover:underline ml-1"
    >
      Jenisha
    </a>
  </p>
      </div>
    </footer>
  );
};

export default Footer;
