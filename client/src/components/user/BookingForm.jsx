
/**
 * BookingForm handles table reservation by collecting user inputs
 * and sending data to backend
 */

import React, { useState } from "react";
import API from "../../utils/axios";

export default function BookingForm({ user = {}, tableNumber = "" }) {

  const [formData, setFormData] = useState({
    name: user.name || "",
    email: user.email || "",
    phone: user.phone || "",
    date: "",
    time: "",
    guests: 2,
    tableType: "indoor",
    specialRequests: "",
    addons: [],
    allergies: "",
    tableNumber: tableNumber
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [bookingRef, setBookingRef] = useState(null);
  const [confirmedDetails, setConfirmedDetails] = useState(null);

  const storedUser = JSON.parse(localStorage.getItem("user"));
  const userId = storedUser?._id || localStorage.getItem("userId");

  // ================= HANDLE INPUT CHANGE =================

  const handleChange = (e) => {

    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {

      setFormData((prev) => ({
        ...prev,
        addons: checked
          ? [...prev.addons, value]
          : prev.addons.filter((a) => a !== value)
      }));

    } else {

      setFormData((prev) => ({
        ...prev,
        [name]: value
      }));

    }
  };


  // ================= HANDLE BOOKING =================

  const handleSubmit = async (e) => {

    e.preventDefault();

    setIsSubmitting(true);
    // console.log("Submitting booking with data:", ...formData, userId);
    try {

      const response = await API.post("/api/bookings", {
        ...formData,
        userId
      });

      const data = response.data;

      setBookingRef(data.reference);
      setConfirmedDetails(data);
      setShowConfirmation(true);

      // reset form

      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        date: "",
        time: "",
        guests: 2,
        tableType: "indoor",
        specialRequests: "",
        addons: [],
        allergies: "",
        tableNumber: tableNumber
      });

    } catch (error) {

      console.error("Booking failed:", error);

      alert(
        error.response?.data?.message ||
        "Booking failed. Please try again."
      );

    } finally {

      setIsSubmitting(false);

    }
  };


  // ================= CANCEL CONFIRMATION =================

  const handleCancel = () => {

    setConfirmedDetails(null);
    setShowConfirmation(false);
    setBookingRef(null);

  };


  return (

    <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow-md">

      <h2 className="text-2xl font-bold mb-4">
        Reserve a Table
      </h2>

      <form onSubmit={handleSubmit}>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            className="border p-2 rounded"
            required
          />

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="border p-2 rounded"
            required
          />

          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone"
            className="border p-2 rounded"
            required
          />

          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            min={new Date().toISOString().split("T")[0]}
            className="border p-2 rounded"
            required
          />

          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />

          <select
            name="guests"
            value={formData.guests}
            onChange={handleChange}
            className="border p-2 rounded"
          >

            {Array.from({ length: 20 }, (_, i) => (
              <option key={i} value={i + 1}>
                {i + 1} Guests
              </option>
            ))}

          </select>

          <select
            name="tableType"
            value={formData.tableType}
            onChange={handleChange}
            className="border p-2 rounded"
          >

            <option value="Regular">Regular</option>
            <option value="Family">Family</option>
            <option value="Private">Private</option>

          </select>

          <input
            type="text"
            name="tableNumber"
            value={formData.tableNumber}
            readOnly
            className="border p-2 rounded"
          />

        </div>


        {/* Special Requests */}

        <textarea
          name="specialRequests"
          value={formData.specialRequests}
          onChange={handleChange}
          placeholder="Special Requests"
          className="border p-2 rounded mt-4 w-full"
          rows="3"
        />


        {/* Allergies */}

        <textarea
          name="allergies"
          value={formData.allergies}
          onChange={handleChange}
          placeholder="Food Allergies or Pre-orders"
          className="border p-2 rounded mt-2 w-full"
          rows="2"
        />


        {/* Addons */}

        <div className="mt-4">

          <label className="font-medium">
            Add-ons:
          </label>

          <div className="flex gap-4 mt-2">

            <label>

              <input
                type="checkbox"
                value="birthday"
                checked={formData.addons.includes("birthday")}
                onChange={handleChange}
              />

              {" "}Birthday Setup

            </label>

            <label>

              <input
                type="checkbox"
                value="anniversary"
                checked={formData.addons.includes("anniversary")}
                onChange={handleChange}
              />

              {" "}Anniversary Decor

            </label>

          </div>

        </div>


        {/* Submit */}

        <div className="flex gap-4 mt-6">

          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >

            {isSubmitting ? "Booking..." : "Confirm Booking"}

          </button>

        </div>

      </form>


      {/* Confirmation */}

      {showConfirmation && confirmedDetails && (

        <div className="mt-6 bg-green-100 p-4 rounded">

          <h3 className="text-green-800 font-semibold mb-2">
            🎉 Booking Confirmed!
          </h3>

          <p>
            Reference: <strong>{bookingRef}</strong>
          </p>

          <p>
            Date: {new Date(confirmedDetails.date).toLocaleDateString()}
          </p>

          <p>
            Time: {confirmedDetails.time}
          </p>

          <p>
            Guests: {confirmedDetails.guests}
          </p>

          <p>
            Table Type: {confirmedDetails.tableType}
          </p>

          {confirmedDetails.tableNumber && (

            <p>
              Table No: {confirmedDetails.tableNumber}
            </p>

          )}

          {confirmedDetails.addons?.length > 0 && (

            <p>
              Add-ons: {confirmedDetails.addons.join(", ")}
            </p>

          )}

          {confirmedDetails.specialRequests && (

            <p>
              Note: {confirmedDetails.specialRequests}
            </p>

          )}

          <button
            type="button"
            onClick={handleCancel}
            className="bg-red-500 text-white px-6 py-2 rounded mt-4"
          >
            Close
          </button>

        </div>

      )}

    </div>
  );
}