// src/components/Footer.jsx
import React from "react";
import { FaGithub, FaLinkedin, FaTwitter, FaHamburger } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-[#1f1c18] to-[#8e0e00] text-gray-200">
      
      {/* Top Section */}
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 border-b border-white/20">
        
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 text-2xl font-bold text-white mb-4">
            <FaHamburger className="text-yellow-400" />
            <span>
              Meal<span className="text-yellow-400">Adda</span>
            </span>
          </div>
          <p className="text-sm text-gray-300 leading-relaxed">
            MealAdda helps you discover the best restaurants and book tables
            effortlessly. Taste, comfort, and memories — all in one place.
          </p>
        </div>

        {/* Column 1 */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-yellow-400">
            Get to Know Us
          </h3>
          <ul className="space-y-2">
            {["About MealAdda", "Careers", "Blog"].map((item) => (
              <li key={item}>
                <a
                  href="#"
                  className="hover:text-yellow-400 transition"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 2 */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-yellow-400">
            Partner With Us
          </h3>
          <ul className="space-y-2">
            {[
              "Partner with MealAdda",
              "Affiliate Program",
              "Advertise Restaurant",
            ].map((item) => (
              <li key={item}>
                <a
                  href="#"
                  className="hover:text-yellow-400 transition"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-yellow-400">
            Connect With Us
          </h3>
          <div className="flex gap-4">
            <a
              href="#"
              className="p-3 rounded-full bg-white/10 hover:bg-yellow-400 hover:text-black transition"
              aria-label="GitHub"
            >
              <FaGithub />
            </a>
            <a
              href="#"
              className="p-3 rounded-full bg-white/10 hover:bg-yellow-400 hover:text-black transition"
              aria-label="LinkedIn"
            >
              <FaLinkedin />
            </a>
            <a
              href="#"
              className="p-3 rounded-full bg-white/10 hover:bg-yellow-400 hover:text-black transition"
              aria-label="Twitter"
            >
              <FaTwitter />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-black/40 py-4">
        <div className="max-w-7xl mx-auto px-6 text-center text-sm text-gray-300">
          © 2026{" "}
          <span className="font-semibold text-yellow-400">MealAdda</span>. All
          rights reserved.
        </div>
      </div>
    </footer>
  );
}
