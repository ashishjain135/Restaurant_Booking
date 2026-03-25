import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';


import AuthProvider from './context/AuthContext';

import LoginPage from "./pages/auth/LoginPage";
import SignUpPage from "./pages/auth/SignUpPage";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ProtectRoute from "./pages/routes/ProtectedRoute";
import Home from "./pages/Home";
import VerifyEmailPage from "./pages/auth/VerifyEmail";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import UserProfile from "./components/user/UserProfile";
import AdminPanel from "./pages/admin/AdminPanel";
import UserPanel from "./pages/user/UserPanel";
import Menu from "./pages/user/Menu";
import About from "./pages/About";
import Contact from "./pages/Contact";
import TableLayout from "./pages/user/TableLayout";
import BookingHistory from "../src/components/user/BookingHistory";
const token = localStorage.getItem("token");
// console.log(token);

const userId = localStorage.getItem("userId");
// console.log(userId);

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/verify-email" element={<VerifyEmailPage />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/admin-panel" element={<AdminPanel />} />
        <Route path="/book-table" element={<TableLayout />} />
        <Route path="/User/*" element={<UserPanel />} />
        <Route path="/history" element={<BookingHistory />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
