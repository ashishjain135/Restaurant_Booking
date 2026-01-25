const UserSidebar = ({ active, setActive }) => {

  const Item = ({ id, label }) => (
    <button
      onClick={() => setActive(id)}
      className={`w-full flex items-center px-4 py-3 rounded-xl transition-all font-medium
        ${
          active === id
            ? "bg-yellow-400 text-black shadow"
            : "text-gray-300 hover:bg-white/10 hover:text-white"
        }`}
    >
      {label}
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
          User Panel
        </p>
      </div>

      {/* OVERVIEW */}
      <p className="text-xs text-gray-500 uppercase mb-2">Overview</p>
      <div className="space-y-1 mb-6">
        <Item id="dashboard" label="Dashboard" />
        <Item id="profile" label="My Profile" />
      </div>

      {/* BOOKINGS */}
      <p className="text-xs text-gray-500 uppercase mb-2">Bookings</p>
      <div className="space-y-1 mb-6">
        <Item id="book" label="Book a Table" />
        <Item id="history" label="My Bookings" />
      </div>

      {/* ACCOUNT */}
      <p className="text-xs text-gray-500 uppercase mb-2">Account</p>
      <button
        onClick={() => {
          localStorage.clear();
          window.location.href = "/home";
        }}
        className="w-full text-left px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 hover:text-red-300 transition"
      >
        Logout
      </button>

      {/* Footer */}
      <div className="mt-auto pt-6 text-xs text-gray-400">
        Logged in as: <span className="text-yellow-400 font-medium">User</span>
      </div>
    </aside>
  );
};

export default UserSidebar;
