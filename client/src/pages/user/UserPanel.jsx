import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import UserSidebar from "../../components/user/UserSidebar";
import Dashboard from "../../components/user/Dashboard";
const UserPanel = () => {
  const [active, setActive] = useState("dashboard");
  const navigate = useNavigate();
  const renderContent = () => {
    switch (active) {
      case "dashboard":
        return (
          <Dashboard
            onBookTableClick={() => setActive("book")}
            onBookingHistoryClick={() => setActive("history")}
            onProfileClick={() => setActive("profile")}
          />
        );
      case "book":
        navigate("/book-table");
        break;
      case "history":
        navigate("/history");
        break;
      case "profile":
        navigate("/profile");
        break;
      default:
        return null;
    }
  };

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <UserSidebar active={active} setActive={setActive} />

      <main className="flex-1 p-8">{renderContent()}</main>
    </div>
  );
};

export default UserPanel;
