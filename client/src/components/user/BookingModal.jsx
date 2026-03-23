import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";

const BookingModal = ({ show, onClose }) => {
  const [date, setDate] = useState(null);
  const [time, setTime] = useState("");

  const navigate = useNavigate();

  if (!show) return null;

  const handleContinue = () => {
    if (!date || !time) {
      alert("Please select both date and time");
      return;
    }

    // Format date → YYYY-MM-DD (important for backend)
    const formattedDate = date.toISOString().split("T")[0];

    navigate("/book-table", {
      state: {
        date: formattedDate,
        time: time
      }
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">

      <div className="bg-white p-8 rounded-2xl shadow-xl w-96 text-center">

        <h2 className="text-2xl font-bold mb-4">
          Select Date & Time
        </h2>

        {/* Date Picker */}
        <DatePicker
          selected={date}
          onChange={(selectedDate) => setDate(selectedDate)}
          minDate={new Date()}
          inline
        />

        {/* Time Slot */}
        <select
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="mt-4 w-full border p-2 rounded"
        >
          <option value="">Select Time Slot</option>
          <option value="12:00-14:00">12:00 - 14:00</option>
          <option value="14:00-16:00">14:00 - 16:00</option>
          <option value="18:00-20:00">18:00 - 20:00</option>
          <option value="20:00-22:00">20:00 - 22:00</option>
        </select>

        {/* Buttons */}
        <div className="flex gap-4 mt-6">
          <button
            onClick={handleContinue}
            className="flex-1 bg-green-500 text-white py-2 rounded font-bold hover:bg-green-600"
          >
            Continue
          </button>

          <button
            onClick={onClose}
            className="flex-1 bg-red-400 py-2 rounded font-bold"
          >
            Close
          </button>
        </div>

      </div>

    </div>
  );
};

export default BookingModal;