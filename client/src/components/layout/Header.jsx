import React, { useState } from "react";
import { FaHamburger, FaBars, FaTimes } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import BookingModal from "../user/BookingModal";


export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  //handle booking table if not login ->> login
  //otherwise open calender
  const handleBookTable = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      navigate("book-table");
    }
  };
  return (
    <>
      <header className="sticky top-0 z-50 bg-gradient-to-r from-[#1f1c18] to-[#8e0e00] shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 text-2xl font-bold text-white"
            onClick={() => setMenuOpen(false)}
          >
            <FaHamburger className="text-yellow-400" />
            <span>
              Meal<span className="text-yellow-400">Adda</span>
            </span>
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center gap-8">
            {["Home", "Menu", "About", "Contact"].map((item) => (
              <Link
                key={item}
                to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                className="relative text-white font-medium hover:text-yellow-400 transition after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-[2px] after:bg-yellow-400 hover:after:w-full after:transition-all"
              >
                {item}
              </Link>
            ))}

            {/* Book Table Button */}
            <button
              // to="/book-table"
              onClick={handleBookTable}
              className="ml-4 px-5 py-2 rounded-full bg-yellow-400 text-black font-semibold hover:bg-white transition"
            >
              Book Table
            </button>
          </nav>

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-white"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-[#1f1c18] border-t border-gray-700">
            <nav className="flex flex-col gap-4 px-6 py-6 text-white">
              {["Home", "Menu", "About", "Contact"].map((item) => (
                <Link
                  key={item}
                  to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                  onClick={() => setMenuOpen(false)}
                  className="hover:text-yellow-400 transition"
                >
                  {item}
                </Link>
              ))}

              <button
                onClick={() => setMenuOpen(false)}
                className="mt-2 text-center px-4 py-2 rounded-full bg-yellow-400 text-black font-semibold"
              >
                Book Table
              </button>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
