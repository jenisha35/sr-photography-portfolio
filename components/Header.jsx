import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const navItems = [
    { item: "Home", route: "/" },
    { item: "Gallery", route: "/gallery" },
    { item: "Services", route: "/services" },
    { item: "Client Testimonials", route: "/client-testimonials" },
    { item: "Contact", route: "/contact" }
  ];

  return (
<header className="fixed top-0 left-0 z-50 w-screen bg-black/20 backdrop-blur-sm ">
      <div className="flex items-center justify-between h-[70px] ">
        <img src="/profile.jpg" alt="profile" className="h-12 lg:h-16 pl-4" />

        <button
          className="md:hidden text-[#5C4929] pr-4"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Desktop Nav */}
        <ul className="hidden md:flex md:items-center md:gap-6 pr-10">
          {navItems.map((items, index) => (
            <li
              key={index}
              className="hover:scale-110 transition-transform duration-300 bg-gradient-to-r from-[#775A32] via-[#902428] to-[#5C4929] bg-clip-text text-transparent text-base font-medium cursor-pointer"
              onClick={() => {
                navigate(items.route);
                window.scrollTo(0, 0)
              }}
            >
              {items.item}
            </li>
          ))}
        </ul>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <ul className="absolute top-[70px] left-0 w-full bg-black/50 flex flex-col items-center gap-4 py-4 z-50 md:hidden">
          {navItems.map((items, index) => (
            <li
              key={index}
              className="hover:scale-110 transition-transform duration-300 bg-gradient-to-r from-[#775A32] via-[#902428] to-[#5C4929] bg-clip-text text-transparent text-sm font-medium cursor-pointer"
              onClick={() => {
                navigate(items.route);
                setIsOpen(false); 
                window.scrollTo(0, 0)
              }}
            >
              {items.item}
            </li>
          ))}
        </ul>
      )}
    </header>
  );
};

export default Header;
