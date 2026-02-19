import { useState } from "react";
import UserSidebar from "../../components/user/UserSidebar";
import Dashboard from "../../components/user/Dashboard";
import BookingForm from "../../components/user/BookingForm";
import BookingHistory from "../../components/user/BookingHistory";
import UserProfile from "../../components/user/UserProfile";

const UserPanel = () => {
  const [active, setActive] = useState("dashboard");

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
        return <BookingForm />;
      case "history":
        return <BookingHistory />;
      case "profile":
        return <UserProfile />;
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
