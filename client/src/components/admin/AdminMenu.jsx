
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AdminMenu() {
  const [menuItems, setMenuItems] = useState([]);
  const [form, setForm] = useState({
    dishName: '',
    category: '',
    isTodaySpecial: false
  });
  const [editId, setEditId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
const [stats, setStats] = useState({
  totalCategories: 0,
  totalItems: 0,
  todaysSpecials: 0,
});

// ✅ Add this function outside useEffect so it's accessible in handleSubmit & handleDelete
const fetchStats = async () => {
  try {
    const res = await axios.get("http://localhost:5000/api/menu/stats/dashboard");
    setStats(res.data);
      localStorage.setItem("dashboardStats", JSON.stringify(res.data));
  } catch (err) {
    console.error("Error fetching dashboard stats:", err);
  }
};

useEffect(() => {
  const cachedStats = localStorage.getItem("dashboardStats");
  if (cachedStats) {
    setStats(JSON.parse(cachedStats)); // 🌟 Load cached stats
  }

  fetchMenu();
  fetchStats(); // Also refresh once in background

  const interval = setInterval(fetchStats, 60000); // every 1 min
  return () => clearInterval(interval);
}, []);



  const fetchMenu = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/menu');
      setMenuItems(res.data);
    } catch (err) {
      console.error('Error fetching menu:', err);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    if (editId) {
      await axios.put(`http://localhost:5000/api/menu/${editId}`, form);
    } else {
      await axios.post('http://localhost:5000/api/menu', form);
    }

    await fetchMenu();
    fetchStats(); // ✅ Refresh dashboard stats immediately

    setForm({ dishName: '', category: '', isTodaySpecial: false });
    setEditId(null);
  } catch (err) {
    console.error('Error adding dish:', err);
    alert("Failed to add dish. See console for error.");
  }
};


  const handleEdit = (item) => {
    setForm({
      dishName: item.dishName,
      category: item.category,
      isTodaySpecial: item.isTodaySpecial
    });
    setEditId(item._id);
  };

const handleDelete = async (id) => {
  try {
    await axios.delete(`http://localhost:5000/api/menu/${id}`);
    await fetchMenu();
    fetchStats(); // ✅ Refresh dashboard stats after deletion
  } catch (err) {
    console.error('Error deleting dish:', err);
  }
};


  const categories = ['All', ...new Set(menuItems.map(item => item.category))];

  const filteredItems = menuItems.filter(item =>
    (item.dishName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (categoryFilter === 'All' || item.category === categoryFilter)
  );
  return (
  <div className="max-w-6xl mx-auto px-4 py-10 space-y-10">

    {/* ================= Header ================= */}
    <div className="text-center">
      <h2 className="text-4xl font-extrabold text-gray-800">
        🍽 Menu Panel
      </h2>
      <p className="text-gray-500 mt-2">
        Manage dishes and today’s specials
      </p>
    </div>

    {/* ================= Search & Filter ================= */}
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div className="flex gap-3 w-full md:w-auto">
        <input
          type="text"
          placeholder="Search dishes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-56 px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-yellow-400 outline-none"
        />
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="w-full md:w-44 px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-yellow-400 outline-none bg-white"
        >
          {categories.map((cat, idx) => (
            <option key={idx}>{cat}</option>
          ))}
        </select>
      </div>
    </div>

    {/* ================= Add / Edit Form ================= */}
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 space-y-6"
    >
      <h3 className="text-2xl font-bold text-gray-800">
        {editId ? "Edit Dish" : "Add New Dish"}
      </h3>

      <input
        type="text"
        name="dishName"
        value={form.dishName}
        onChange={handleChange}
        placeholder="Dish Name"
        required
        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-yellow-400 outline-none"
      />

      <input
        type="text"
        name="category"
        value={form.category}
        onChange={handleChange}
        placeholder="Category (Starter, Main Course, Drink...)"
        required
        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-yellow-400 outline-none"
      />

      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          name="isTodaySpecial"
          checked={form.isTodaySpecial}
          onChange={handleChange}
          className="w-5 h-5 accent-yellow-400"
        />
        <label className="text-gray-700 font-medium">
          Mark as Today’s Special ⭐
        </label>
      </div>

      <div className="text-right">
        <button
          type="submit"
          className="px-8 py-3 rounded-full bg-yellow-400 text-black font-semibold hover:bg-yellow-300 transition shadow"
        >
          {editId ? "Update Dish" : "Add Dish"}
        </button>
      </div>
    </form>

    {/* ================= Menu Table ================= */}
    <div>
      <h3 className="text-2xl font-bold mb-4 text-gray-800">
        📋 Current Menu
      </h3>

      {filteredItems.length > 0 ? (
        <div className="bg-white rounded-2xl shadow-lg overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100">
              <tr className="text-left text-gray-600 uppercase tracking-wider">
                <th className="px-6 py-4">Dish Name</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4 text-center">Today’s Special</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredItems.map((item) => (
                <tr
                  key={item._id}
                  className={`border-t hover:bg-gray-50 transition ${
                    item.isTodaySpecial ? "bg-yellow-50 font-semibold" : ""
                  }`}
                >
                  <td className="px-6 py-4">{item.dishName}</td>
                  <td className="px-6 py-4">{item.category}</td>
                  <td className="px-6 py-4 text-center text-lg">
                    {item.isTodaySpecial ? "⭐" : "—"}
                  </td>
                  <td className="px-6 py-4 text-center space-x-3">
                    <button
                      onClick={() => handleEdit(item)}
                      className="px-4 py-1 rounded-full bg-yellow-400 text-black hover:bg-yellow-300 transition text-sm font-medium"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="px-4 py-1 rounded-full bg-red-500 text-white hover:bg-red-600 transition text-sm font-medium"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-500 mt-6 text-center">
          No dishes found.
        </p>
      )}
    </div>
  </div>
);

}

export default AdminMenu;
