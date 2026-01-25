
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Dashboard({
  onBookTableClick,
  onBookingHistoryClick,
  onProfileClick,
}) {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const token = localStorage.getItem("token");

        const response = await axios.get(`/api/bookings/dashboard/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("Fetched dashboard data:", response.data); // 👈 debug
        setDashboardData(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch dashboard data:", err);
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const stats = dashboardData;

return (
  <div className="bg-white rounded-2xl shadow-2xl p-8 space-y-10">

    {/* ================= Welcome ================= */}
    <div>
      <h2 className="text-3xl font-extrabold text-gray-800 mb-2">
        👋 Welcome back!
      </h2>
      <p className="text-gray-600">
        Here’s a quick overview of your booking activity.
      </p>
    </div>

    {/* ================= Stats Cards ================= */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

      {/* Upcoming Booking */}
      <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5 hover:shadow-md transition">
        <p className="text-sm uppercase tracking-wide text-gray-500 mb-1">
          Upcoming Booking
        </p>
        <p className="text-lg font-semibold text-gray-800">
          {loading
            ? "Loading..."
            : dashboardData?.upcomingBooking
            ? `${dashboardData.upcomingBooking.date} • ${dashboardData.upcomingBooking.time}`
            : "No upcoming booking"}
        </p>
      </div>

      {/* Total Bookings */}
      <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5 hover:shadow-md transition">
        <p className="text-sm uppercase tracking-wide text-gray-500 mb-1">
          Total Bookings
        </p>
        <p className="text-3xl font-extrabold text-yellow-500">
          {dashboardData?.totalBookings || 0}
        </p>
      </div>

      {/* Last Visit */}
      <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5 hover:shadow-md transition">
        <p className="text-sm uppercase tracking-wide text-gray-500 mb-1">
          Last Visit
        </p>
        <p className="text-lg font-semibold text-gray-800">
          {loading
            ? "Loading..."
            : dashboardData?.lastVisit || "No visits yet"}
        </p>
      </div>

      {/* Profile Status */}
      <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5 hover:shadow-md transition">
        <p className="text-sm uppercase tracking-wide text-gray-500 mb-1">
          Profile Status
        </p>
        <p
          className={`text-lg font-semibold ${
            dashboardData?.profileStatus === "Complete"
              ? "text-green-600"
              : "text-red-500"
          }`}
        >
          {dashboardData?.profileStatus || "Incomplete"}
        </p>
      </div>
    </div>

    {/* ================= Quick Actions ================= */}
    <div className="flex flex-wrap gap-4">
      <button
        onClick={onBookTableClick}
        className="px-6 py-3 rounded-full bg-yellow-400 text-black font-semibold hover:bg-yellow-300 transition shadow"
      >
        ➕ Book a Table
      </button>
      <button
        onClick={onBookingHistoryClick}
        className="px-6 py-3 rounded-full bg-gray-800 text-white font-semibold hover:bg-gray-700 transition shadow"
      >
        📅 My Bookings
      </button>
      <button
        onClick={onProfileClick}
        className="px-6 py-3 rounded-full border border-yellow-400 text-yellow-600 font-semibold hover:bg-yellow-400 hover:text-black transition shadow"
      >
        ✏️ Update Profile
      </button>
    </div>

    {/* ================= Recent Bookings ================= */}
    <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4">
        📌 Recent Bookings
      </h3>

      <ul className="space-y-2 text-gray-700">
        {stats?.recentBookings && stats.recentBookings.length > 0 ? (
          stats.recentBookings.map((booking, index) => (
            <li
              key={index}
              className="flex items-center gap-2 text-sm"
            >
              <span>
                {booking.status === "cancelled" ? "❌" : "✅"}
              </span>
              <span>
                {booking.date} – Table for {booking.guests}
              </span>
            </li>
          ))
        ) : (
          <li className="italic text-gray-500">No recent bookings</li>
        )}
      </ul>
    </div>
  </div>
);

}
