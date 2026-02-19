import { useEffect, useState } from "react";
import axios from "axios";
import { ChevronDown } from "lucide-react";
import DashboardCard from "./DashboardCard";
import API from "../../utils/axios";
const AdminDashboard = ({ setActiveSection }) => {
  const [open, setOpen] = useState({
    orders: true,
    menu: true,
    tables: true,
    revenue: true,
  });

  const [menuStats, setMenuStats] = useState({
    totalCategories: 0,
    totalItems: 0,
    todaysSpecials: 0,
  });

  const [orders, setOrders] = useState([]);
  const [tables, setTables] = useState([]);

  /* ================= FETCH ================= */
  useEffect(() => {
    fetchMenuStats();
    fetchOrders();
    fetchTables();
  }, []);

  const fetchMenuStats = async () => {
    try{
      const res = await API.get(
      "/api/menu/stats/dashboard");
    setMenuStats(res.data);
    } catch (err) {
    console.error("Error fetching menu stats:", err);
    }
  };

  const fetchOrders = async () => {
    try{
      const res = await API.get("/api/orders");
      setOrders(res.data);
      console.log("Fetched orders:", res.data);
    }catch(err){
      console.error("Error fetching orders:", err);
    }
  };

  const fetchTables = async () => {
    try{
      const res = await API.get("/api/tables");
      setTables(res.data);
      console.log("Fetched tables:", res.data);
    }catch(err){
      console.error("Error fetching tables:", err);
    }
  };

  /* ================= DATE FILTERS ================= */
  const today = new Date();
  const todayStr = today.toLocaleDateString();
  const month = today.getMonth();
  const year = today.getFullYear();

  const todayOrders = orders.filter(
    (o) => new Date(o.createdAt).toLocaleDateString() === todayStr
  );

  const monthOrders = orders.filter((o) => {
    const d = new Date(o.createdAt);
    return d.getMonth() === month && d.getFullYear() === year;
  });

  const yearOrders = orders.filter(
    (o) => new Date(o.createdAt).getFullYear() === year
  );

  /* ================= REVENUE ================= */
  const calcRevenue = (list) =>
    list.reduce(
      (sum, o) => (o.status === "Completed" ? sum + o.totalAmount : sum),
      0
    );

  const revenueToday = calcRevenue(todayOrders);
  const revenueMonth = calcRevenue(monthOrders);
  const revenueYear = calcRevenue(yearOrders);

  const tableCount = (status) =>
    tables.filter((t) => t.status === status).length;

  const Section = ({ title, keyName, children }) => (
    <>
      <div
        onClick={() => setOpen({ ...open, [keyName]: !open[keyName] })}
        className="flex justify-between items-center bg-white p-4 rounded-xl shadow cursor-pointer mb-4"
      >
        <h2 className="font-semibold text-gray-800">{title}</h2>
        <ChevronDown
          className={`transition ${
            open[keyName] ? "rotate-180" : ""
          }`}
        />
      </div>
      {open[keyName] && children}
    </>
  );

  return (
    <>
      {/* ================= ORDERS ================= */}
      <Section title="📦 Order Statistics" keyName="orders">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <DashboardCard
            title="Today's Orders"
            value={todayOrders.length}
            accent="blue"
            onView={() => setActiveSection("orders")}
          />
          <DashboardCard
            title="Monthly Orders"
            value={monthOrders.length}
            accent="indigo"
            onView={() => setActiveSection("orders")}
          />
          <DashboardCard
            title="Yearly Orders"
            value={yearOrders.length}
            accent="purple"
            onView={() => setActiveSection("orders")}
          />
        </div>
      </Section>

      {/* ================= MENU ================= */}
      <Section title="🍽️ Menu Overview" keyName="menu">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <DashboardCard
            title="Categories"
            value={menuStats.totalCategories}
            accent="green"
            onView={() => setActiveSection("items")}
          />
          <DashboardCard
            title="Items"
            value={menuStats.totalItems}
            accent="emerald"
            onView={() => setActiveSection("items")}
          />
          <DashboardCard
            title="Today's Special"
            value={menuStats.todaysSpecials}
            accent="yellow"
            onView={() => setActiveSection("items")}
          />
        </div>
      </Section>

      {/* ================= TABLES ================= */}
      <Section title="🪑 Table Booking Summary" keyName="tables">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <DashboardCard title="Available" value={tableCount("available")} accent="green" />
          <DashboardCard title="Reserved" value={tableCount("reserved")} accent="yellow" />
          <DashboardCard title="Occupied" value={tableCount("occupied")} accent="red" />
        </div>
      </Section>

      {/* ================= REVENUE ================= */}
      <Section title="💰 Revenue Report" keyName="revenue">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <DashboardCard
            title="Today's Revenue"
            value={`₹${revenueToday}`}
            accent="blue"
            onView={() => setActiveSection("revenue")}
          />
          <DashboardCard
            title="Monthly Revenue"
            value={`₹${revenueMonth}`}
            accent="indigo"
            onView={() => setActiveSection("revenue")}
          />
          <DashboardCard
            title="Yearly Revenue"
            value={`₹${revenueYear}`}
            accent="purple"
            onView={() => setActiveSection("revenue")}
          />
        </div>
      </Section>
    </>
  );
};

export default AdminDashboard;
