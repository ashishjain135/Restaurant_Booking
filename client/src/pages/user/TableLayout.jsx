import React, { useEffect, useState } from "react";
import API from "../../utils/axios";
import BookingForm from "../../components/user/BookingForm";

export default function TableLayout() {
  const [tables, setTables] = useState([]);
  const [selectedTable, setSelectedTable] = useState(null);
  
  // New States for Filter
  const [filter, setFilter] = useState({
    date: "",
    timeSlot: "",
    guests: 1
  });

  const [loading, setLoading] = useState(false);

  // Sirf tab fetch karo jab date aur time select ho jaye
  const fetchAvailableTables = async () => {
    if (!filter.date || !filter.timeSlot) return;
    
    setLoading(true);
    try {
      // Humne jo backend banaya tha `/available` wala, use hit karo
      const res = await API.get("/api/bookings/available", {
        params: { 
          date: filter.date, 
          timeSlot: filter.timeSlot, 
          guests: filter.guests 
        }
      });
      console.log("API Response:", res.data); // Yahan check karo data: [] aa raha hai ya nahi

      setTables(res.data.data); // Available tables list
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Jab bhi filter change ho, data reload ho
  useEffect(() => {
    fetchAvailableTables();
  }, [filter.date, filter.timeSlot]);

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <h2 className="text-3xl font-bold text-center mb-8">Book Your Table</h2>

      {/* --- FILTER SECTION --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10 bg-gray-50 p-6 rounded-xl shadow-sm">
        <div>
          <label className="block text-sm font-medium mb-1">Select Date</label>
          <input 
            type="date" 
            className="w-full border p-2 rounded"
            min={new Date().toISOString().split("T")[0]} // Past dates disable
            onChange={(e) => setFilter({...filter, date: e.target.value})}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Select Time Slot</label>
          <select 
            className="w-full border p-2 rounded"
            onChange={(e) => setFilter({...filter, timeSlot: e.target.value})}
          >
            <option value="">-- Choose Slot --</option>
            <option value="12:00-14:00">Lunch (12 PM - 2 PM)</option>
            <option value="19:00-21:00">Dinner (7 PM - 9 PM)</option>
            <option value="21:00-23:00">Late Night (9 PM - 11 PM)</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Guests</label>
          <input 
            type="number" 
            min="1" 
            className="w-full border p-2 rounded"
            value={filter.guests}
            onChange={(e) => setFilter({...filter, guests: e.target.value})}
          />
        </div>
      </div>

      {/* --- TABLES GRID --- */}
      {!filter.date || !filter.timeSlot ? (
        <p className="text-center text-gray-500">Please select Date and Time to see available tables.</p>
      ) : loading ? (
        <p className="text-center">Checking availability...</p>
      ) : (
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
          {tables.map((table) => (
            <div
              key={table._id}
              className={`border-4 rounded-xl p-4 shadow cursor-pointer transition-all ${
                selectedTable?._id === table._id ? "border-blue-600 scale-105" : "border-green-400"
              }`}
              onClick={() => setSelectedTable(table)}
            >
              <img src={table.image} alt="table" className="w-full h-32 object-cover rounded mb-2" />
              <h3 className="font-bold">Table {table.tableNumber}</h3>
              <p className="text-sm text-gray-600">Capacity: {table.capacity} Seats</p>
              <p className="text-xs font-semibold text-green-600 mt-2">AVAILABLE for this slot</p>
            </div>
          ))}
          {tables.length === 0 && <p className="col-span-full text-center text-red-500">Bhai, is time par koi table khali nahi hai!</p>}
        </div>
      )}

      {/* --- BOOKING FORM MODAL/SECTION --- */}
      {selectedTable && (
        <div className="mt-12">
          <BookingForm
            selectedTable={selectedTable} // ID pass karna unique index ke liye zaruri hai
            selectedDate={filter.date}
            selectedTime={filter.timeSlot}
            guestsCount={filter.guests}
          />
        </div>
      )}
    </div>
  );
}