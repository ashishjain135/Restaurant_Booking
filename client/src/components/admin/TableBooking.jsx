/**
 * Admin added table also add table booked reserved etc
 */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

const TableBooking = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingTable, setEditingTable] = useState(null);
  const [tables, setTables] = useState([]);
  const [newTable, setNewTable] = useState({
    tableNumber: "",
    capacity: "",
    status: "available",
    bookingTime: "",
  });

  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/bookings");
      setBookings(res.data);
    } catch (err) {
      console.error("Failed to fetch bookings", err);
    }
  };

  const fetchTables = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/tables");
      setTables(res.data);
    } catch (err) {
      console.error("Error fetching tables:", err);
    }
  };

  useEffect(() => {
    socket.on("connect", () => {
      console.log("✅ Socket connected:", socket.id);
    });

    socket.on("disconnect", () => {
      console.log("❌ Socket disconnected");
    });

    fetchTables();
    fetchBookings();

    socket.on("tableBooked", () => {
      fetchTables();
      fetchBookings();
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("tableBooked");
    };
  }, []);

  const handleDelete = async (tableNumber) => {
    try {
      await axios.delete(`http://localhost:5000/api/tables/by-number/${tableNumber}`);
      fetchTables();
    } catch (err) {
      console.error("Error deleting table:", err);
    }
  };

  const handleEdit = (table) => {
    setEditingTable({ ...table });
    setShowEditModal(true);
  };

  const handleSubmitAddTable = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/tables", newTable);
      setTables([...tables, res.data]);
      setShowAddModal(false);
      setNewTable({ tableNumber: "", capacity: "", status: "available", bookingTime: "" });
    } catch (err) {
      console.error("Add table error:", err);
    }
  };

  const handleSubmitEditTable = async (e) => {
    e.preventDefault();
    try {
      const { tableNumber, capacity, status, bookingTime } = editingTable;
      const dataToSend = { tableNumber, capacity, status };
      if (status !== "available" && bookingTime) {
        dataToSend.bookingTime = bookingTime;
      }

      await axios.patch(`http://localhost:5000/api/tables/by-number/${tableNumber}`, dataToSend);
      fetchTables();
      setShowEditModal(false);
      setEditingTable(null);
    } catch (err) {
      console.error("Edit table error:", err);
    }
  };
  return (
  <div className="space-y-10">

    {/* ================= Header ================= */}
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <h2 className="text-3xl font-extrabold text-gray-800">
        Table Booking
      </h2>

      <button
        onClick={() => setShowAddModal(true)}
        className="px-6 py-3 rounded-full bg-yellow-400 text-black font-semibold hover:bg-yellow-300 transition shadow"
      >
        + Add Table
      </button>
    </div>

    {/* ================= Booking Table ================= */}
    <div className="bg-white rounded-2xl shadow-lg overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-100">
          <tr className="text-left text-gray-600 uppercase tracking-wider">
            {["User", "Email", "Phone", "Table", "Date", "Time", "Status"].map(
              (h) => (
                <th key={h} className="px-6 py-4 font-semibold">
                  {h}
                </th>
              )
            )}
          </tr>
        </thead>

        <tbody>
          {bookings.length > 0 ? (
            bookings.map((booking, index) => (
              <tr
                key={index}
                className="border-t hover:bg-gray-50 transition"
              >
                <td className="px-6 py-4">{booking.name}</td>
                <td className="px-6 py-4">{booking.email}</td>
                <td className="px-6 py-4">{booking.phone}</td>
                <td className="px-6 py-4 font-semibold">
                  {booking.tableNumber}
                </td>
                <td className="px-6 py-4">
                  {new Date(booking.date).toLocaleDateString()}
                </td>
                <td className="px-6 py-4">{booking.time}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold
                      ${
                        booking.status === "confirmed"
                          ? "bg-green-100 text-green-700"
                          : booking.status === "pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : booking.status === "cancelled"
                          ? "bg-red-100 text-red-700"
                          : "bg-gray-100 text-gray-600"
                      }`}
                  >
                    {booking.status?.toUpperCase()}
                  </span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center py-10 text-gray-500">
                No bookings found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>

    {/* ================= Tables Section ================= */}
    <div>
      <h3 className="text-2xl font-bold mb-6 text-gray-800">
        Tables Overview
      </h3>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {tables.map((table) => (
          <div
            key={table._id}
            className="bg-white rounded-2xl shadow-md p-6 border hover:shadow-lg transition"
          >
            <div className="flex justify-between items-center mb-3">
              <h4 className="font-bold text-lg">
                Table {table.tableNumber}
              </h4>

              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold
                  ${
                    table.status === "available"
                      ? "bg-green-100 text-green-700"
                      : table.status === "reserved"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-700"
                  }`}
              >
                {table.status.toUpperCase()}
              </span>
            </div>

            <p className="text-sm text-gray-600">
              Capacity: <span className="font-semibold">{table.capacity}</span>
            </p>

            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={() => handleEdit(table)}
                className="text-sm font-medium text-yellow-600 hover:underline"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(table.tableNumber)}
                className="text-sm font-medium text-red-600 hover:underline"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* ================= ADD TABLE MODAL ================= */}
    {showAddModal && (
      <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6">Add Table</h2>

          <form onSubmit={handleSubmitAddTable} className="space-y-4">
            <input
              type="text"
              placeholder="Table Number"
              value={newTable.tableNumber}
              onChange={(e) =>
                setNewTable({ ...newTable, tableNumber: e.target.value })
              }
              className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-yellow-400 outline-none"
              required
            />

            <input
              type="number"
              placeholder="Capacity"
              value={newTable.capacity}
              onChange={(e) =>
                setNewTable({ ...newTable, capacity: e.target.value })
              }
              className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-yellow-400 outline-none"
              required
            />

            <select
              value={newTable.status}
              onChange={(e) =>
                setNewTable({ ...newTable, status: e.target.value })
              }
              className="w-full px-4 py-3 border rounded-xl"
            >
              <option value="available">Available</option>
              <option value="reserved">Reserved</option>
              <option value="occupied">Occupied</option>
            </select>

            <div className="flex justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="px-5 py-2 rounded-full bg-gray-200 hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-full bg-yellow-400 text-black font-semibold hover:bg-yellow-300"
              >
                Add
              </button>
            </div>
          </form>
        </div>
      </div>
    )}

    {/* ================= EDIT TABLE MODAL ================= */}
    {showEditModal && editingTable && (
      <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6">Edit Table</h2>

          <form onSubmit={handleSubmitEditTable} className="space-y-4">
            <input
              type="text"
              value={editingTable.tableNumber}
              readOnly
              className="w-full px-4 py-3 border rounded-xl bg-gray-100"
            />

            <input
              type="number"
              value={editingTable.capacity}
              onChange={(e) =>
                setEditingTable({
                  ...editingTable,
                  capacity: e.target.value,
                })
              }
              className="w-full px-4 py-3 border rounded-xl"
            />

            <select
              value={editingTable.status}
              onChange={(e) =>
                setEditingTable({
                  ...editingTable,
                  status: e.target.value,
                })
              }
              className="w-full px-4 py-3 border rounded-xl"
            >
              <option value="available">Available</option>
              <option value="reserved">Reserved</option>
              <option value="occupied">Occupied</option>
            </select>

            <div className="flex justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={() => setShowEditModal(false)}
                className="px-5 py-2 rounded-full bg-gray-200 hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-full bg-yellow-400 text-black font-semibold hover:bg-yellow-300"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    )}
  </div>
);

};

export default TableBooking;
