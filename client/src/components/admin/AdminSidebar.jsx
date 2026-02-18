/**
 * Admin side bar 
 * dashboard default
 * registerd user
 * item 
 * revenue
 */


const AdminSidebar = ({ activeSection, setActiveSection }) => {

  const navBtn = (key, label) => (
    <button
      key={key}
      onClick={() => setActiveSection(key)}
      className={`w-full flex items-center px-4 py-3 rounded-xl mb-2 font-medium transition-all
        ${
          activeSection === key
            ? "bg-yellow-400 text-black shadow"
            : "text-gray-300 hover:bg-white/10 hover:text-white"
        }`}
    >
      <span className="ml-1">{label}</span>
    </button>
  );

  return (
    <aside className="w-64 min-h-screen bg-[#1f1c18] text-white p-6 flex flex-col shadow-2xl">

      {/* Brand */}
      <div className="mb-10">
        <h2 className="text-2xl font-extrabold tracking-wide">
          Meal<span className="text-yellow-400">Adda</span>
        </h2>
        <p className="text-xs text-gray-400 mt-1 uppercase tracking-wider">
          Admin Panel
        </p>
      </div>

      {/* Navigation */}
      <div className="flex-1 space-y-1">
        <p className="text-xs text-gray-500 uppercase mb-2">Dashboard</p>
        {navBtn("dashboard", "Dashboard")}
        {navBtn("users", "Registered Users")}

        <p className="text-xs text-gray-500 uppercase mt-6 mb-2">Management</p>
        {navBtn("items", "Items")}
        {navBtn("orders", "Orders")}
        {navBtn("revenue", "Revenue")}
        {navBtn("table_booking", "Table Booking")}
      </div>

      {/* Logout */}
      <button
        onClick={() => {
          localStorage.clear();
          window.location.href = "/home";
        }}
        className="mt-8 px-4 py-3 rounded-xl text-left text-red-400 hover:bg-red-500/10 hover:text-red-300 transition"
      >
        Logout
      </button>
    </aside>
  );
};

export default AdminSidebar;
