import { useState } from "react";
import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminDashboard from "../../components/admin/AdminDashboard";
import AdminMenu from "../../components/admin/AdminMenu";
import OrdersSection from "../../components/admin/OrderSection";
import Revenue from "../../components/admin/Revenue";
import TableBooking from "../../components/admin/TableBooking";
import UserTable from "../../components/admin/UserTable";

const AdminPanel = () => {
  const [activeSection, setActiveSection] = useState("dashboard");

  const renderSection = () => {
    switch (activeSection) {
      case "dashboard":
        return <AdminDashboard setActiveSection={setActiveSection} />;
      case "items":
        return <AdminMenu />;
      case "orders":
        return <OrdersSection />;
      case "revenue":
        return <Revenue />;
      case "table_booking":
        return <TableBooking />;
      case "users":
        return <UserTable />;
      default:
        return null;
    }
  };
return (
  <div className="min-h-screen flex bg-gradient-to-br from-[#1f1c18] to-[#8e0e00]">

    {/* Sidebar */}
    <AdminSidebar
      activeSection={activeSection}
      setActiveSection={setActiveSection}
    />

    {/* Main Content */}
    <main className="flex-1 p-6 md:p-10 bg-gray-100 rounded-l-3xl shadow-2xl overflow-y-auto">

      {/* Page Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-extrabold capitalize text-gray-800">
          {activeSection.replace("_", " ")}
        </h1>

        {/* Optional admin badge */}
        <span className="px-4 py-1 rounded-full bg-yellow-400 text-black text-sm font-semibold shadow">
          Admin Panel
        </span>
      </div>

      {/* Section Content */}
      <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
        {renderSection()}
      </div>

    </main>
  </div>
);

};

export default AdminPanel;








