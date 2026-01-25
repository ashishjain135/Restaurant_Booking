const accentMap = {
  blue: "from-blue-500 to-blue-600",
  indigo: "from-indigo-500 to-indigo-600",
  purple: "from-purple-500 to-purple-600",
  green: "from-green-500 to-green-600",
  emerald: "from-emerald-500 to-emerald-600",
  yellow: "from-yellow-400 to-yellow-500",
  red: "from-red-500 to-red-600",
};

const DashboardCard = ({ title, value, onView, accent = "blue" }) => {
  return (
    <div className="relative overflow-hidden rounded-xl bg-white shadow hover:shadow-xl transition">
      <div
        className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${
          accentMap[accent]
        }`}
      />

      <div className="p-5">
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-3xl font-bold mt-2 text-gray-800">{value}</p>

        {onView && (
          <button
            onClick={onView}
            className="mt-4 text-sm font-medium text-blue-600 hover:underline"
          >
            View Details →
          </button>
        )}
      </div>
    </div>
  );
};

export default DashboardCard;
