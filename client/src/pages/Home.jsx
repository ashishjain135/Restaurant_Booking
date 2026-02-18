import React from "react";
import { Link } from "react-router-dom";
import { FaStar, FaConciergeBell, FaCalendarCheck } from "react-icons/fa";

export default function Home() {
  const reviews = [
    { id: 1, user: "Aarav", text: "Super easy to reserve a table online!" },
    { id: 2, user: "Riya", text: "Beautiful UI with clear booking steps." },
    { id: 3, user: "Kabir", text: "Seamless experience and responsive design!" },
  ];

  return (
    <div className="bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100">

      {/* ================= HERO SECTION ================= */}
      <section className="relative h-[70vh] w-full">
        <img
          src="/Couple.png"
          alt="MealAdda Restaurant"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
          <div className="text-center px-6 max-w-3xl">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white">
              Welcome to{" "}
              <span className="text-yellow-400">MealAdda</span>
            </h1>
            <p className="mt-4 text-lg sm:text-xl text-gray-200">
              Discover great food & reserve your table effortlessly.
            </p>

            <div className="mt-8 flex justify-center gap-4 flex-wrap">
              <Link
                to="/login"
                className="px-6 py-3 rounded-full bg-yellow-400 text-black font-semibold hover:bg-white transition"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-6 py-3 rounded-full border border-white text-white font-semibold hover:bg-white hover:text-black transition"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FEATURES ====================== */}
      <section className="py-16 px-6 max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-12">
          Why Book with <span className="text-yellow-400">MealAdda?</span>
        </h2>

        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
          {[
            {
              icon: <FaCalendarCheck />,
              title: "Instant Booking",
              desc: "Reserve your table in seconds with real-time availability.",
              color: "text-blue-500",
            },
            {
              icon: <FaConciergeBell />,
              title: "Seamless Experience",
              desc: "Smooth, user-friendly booking from any device.",
              color: "text-green-500",
            },
            {
              icon: <FaStar />,
              title: "Customer Approved",
              desc: "Trusted by diners for reliability and simplicity.",
              color: "text-yellow-400",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:-translate-y-2 transition"
            >
              <div className={`text-4xl mb-4 ${item.color}`}>
                {item.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= REVIEWS ================= */}
      <section className="bg-gray-100 dark:bg-gray-800 py-16 px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          What Our Diners Say
        </h2>

        <div className="max-w-4xl mx-auto grid gap-6 md:grid-cols-3">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow hover:shadow-xl transition"
            >
              <p className="italic text-gray-700 dark:text-gray-200 mb-4">
                “{review.text}”
              </p>
              <p className="font-semibold text-right text-yellow-400">
                – {review.user}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="bg-gradient-to-r from-[#1f1c18] to-[#8e0e00] text-white py-16 px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Ready to Book Your Table?
        </h2>
        <p className="max-w-2xl mx-auto mb-8 text-gray-200">
          Enjoy unforgettable dining moments. Reserve your table today.
        </p>
        <Link
          to="/login"
          className="inline-block px-8 py-3 rounded-full bg-yellow-400 text-black font-semibold hover:bg-white transition"
        >
          Book a Table
        </Link>
      </section>
    </div>
  );
}
