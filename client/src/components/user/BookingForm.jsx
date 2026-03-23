// /**
//  * BookingForm handles table reservation by collecting user inputs
//  * and sending data to backend
//  */

import React, { useState, useEffect } from "react";
import API from "../../utils/axios";

export default function BookingForm({ 
  selectedTable, 
  selectedDate, 
  selectedTime, 
  guestsCount, 
  onSuccess 
}) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    specialRequests: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser || !storedUser._id) {
      alert("User not logged in properly");
      return;
    }

    const userId = storedUser?._id;

    const payload = {
      ...formData,
      tableId: selectedTable._id,
      date: selectedDate,
      timeSlot: selectedTime,
      guests: guestsCount,
      userId: userId
    };

    try {
      const res = await API.post("/api/bookings/book", payload);
      alert("🎉 Booking Successful! Ref: " + res.data.data.reference);
      if(onSuccess) onSuccess(); // Modal close karne ya refresh ke liye
    } catch (error) {
      console.log("FULL ERROR:", error.response?.data);
      alert(error.response?.data?.message || "Booking Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg border">
      <h3 className="text-xl font-bold mb-4">Confirm Your Reservation</h3>
      <div className="mb-4 text-sm bg-blue-50 p-3 rounded">
        <p><b>Table:</b> {selectedTable.tableNumber} | <b>Date:</b> {selectedDate}</p>
        <p><b>Time:</b> {selectedTime} | <b>Guests:</b> {guestsCount}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input 
          type="text" placeholder="Full Name" required className="w-full border p-2 rounded"
          onChange={(e) => setFormData({...formData, name: e.target.value})}
        />
        <input 
          type="email" placeholder="Email Address" required className="w-full border p-2 rounded"
          onChange={(e) => setFormData({...formData, email: e.target.value})}
        />
        <input 
          type="tel" placeholder="Phone Number" required className="w-full border p-2 rounded"
          onChange={(e) => setFormData({...formData, phone: e.target.value})}
        />
        <textarea 
          placeholder="Any special requests?" className="w-full border p-2 rounded"
          onChange={(e) => setFormData({...formData, specialRequests: e.target.value})}
        />
        <button 
          disabled={loading}
          className="w-full bg-orange-500 text-white py-2 rounded font-bold hover:bg-orange-600"
        >
          {loading ? "Processing..." : "Confirm Booking"}
        </button>
      </form>
    </div>
  );
}