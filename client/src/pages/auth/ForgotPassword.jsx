/**
 * Forget password flow
 * 1.Email Enter ->> OTP send
 * 2.OTP varify (with timer)
 * 3.New password reset 
 */


import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Mail, Lock, KeyRound, ArrowLeft } from "lucide-react";
import API from "../../utils/axios";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [step, setStep] = useState(1);
  const [timer, setTimer] = useState(600); // validity  10 minutes
  const navigate = useNavigate();


  useEffect(() => {
    let interval;
    if (step === 2 && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [step, timer]);


  //count Down show on UI mm:ss
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

const handleSendOTP = async (e) => {
  e.preventDefault();
  try {
    await API.post("/api/auth/forgot-password", {
      email,
    });
    toast.success("OTP sent to your email!");
    setStep(2);
    setTimer(600); // Reset timer to 10 minutes (600 sec)
  } catch (error) {
    toast.error(
      error.response?.data?.message || "Failed to send OTP"
    );
    console.error(error);
  }
};


const handleVerifyOTP = async (e) => {
  e.preventDefault();

  if (timer === 0) {
    toast.error("OTP has expired. Please request a new one.");
    return;
  }

  try {
    await API.post("/api/auth/verify-otp", {
      email,
      otp,
    });

    toast.success("OTP verified successfully!");
    setStep(3);

  } catch (error) {
    toast.error(
      error.response?.data?.message || "Invalid OTP"
    );
    console.error(error);
  }
};

const handleResetPassword = async (e) => {
  e.preventDefault();

  if (newPassword !== confirmPassword) {
    toast.error("Passwords do not match!");
    return;
  }

  try {
    await API.post("/api/auth/reset-password", {
      email,
      otp,
      newPassword,
    });

    toast.success("Password reset successfully!");

    setTimeout(() => {
      navigate("/login");
    }, 2000);

  } catch (error) {
    toast.error(
      error.response?.data?.message ||
      "Failed to reset password"
    );
    console.error(error);
  }
};

const handleResendOTP = async () => {
  try {
    await API.post("/api/auth/resend-otp", {
      email,
    });

    toast.success("New OTP sent successfully!");
    setTimer(600); // Reset timer to 10 minutes (600 sec)

  } catch (error) {
    toast.error(
      error.response?.data?.message ||
      "Failed to resend OTP"
    );
    console.error(error);
  }
};





  return (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1f1c18] to-[#8e0e00] px-4 py-12">

    <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 space-y-8">

      {/* Back */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-sm font-medium text-yellow-600 hover:text-yellow-500"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back
      </button>

      {/* Header */}
      <div className="text-center">
        <div className="mx-auto w-14 h-14 flex items-center justify-center rounded-full bg-yellow-400 mb-4">
          <KeyRound className="h-7 w-7 text-black" />
        </div>

        <h2 className="text-3xl font-extrabold text-gray-900">
          {step === 1 && "Forgot Password"}
          {step === 2 && "Verify OTP"}
          {step === 3 && "Reset Password"}
        </h2>

        <p className="mt-2 text-sm text-gray-600">
          {step === 1 && "Enter your email to receive a one-time password"}
          {step === 2 && "Enter the OTP sent to your email"}
          {step === 3 && "Create a new secure password"}
        </p>
      </div>

      {/* STEP 1 */}
      {step === 1 && (
        <form onSubmit={handleSendOTP} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-yellow-400 outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-full bg-yellow-400 text-black font-semibold hover:bg-yellow-300 transition shadow"
          >
            Send OTP
          </button>
        </form>
      )}

      {/* STEP 2 */}
      {step === 2 && (
        <form onSubmit={handleVerifyOTP} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              OTP
            </label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-yellow-400 outline-none"
            />

            <div className="mt-2 flex justify-between items-center text-xs text-gray-500">
              <span>Time remaining: {formatTime(timer)}</span>
              {timer === 0 && (
                <button
                  type="button"
                  onClick={handleResendOTP}
                  className="text-yellow-600 hover:text-yellow-500 font-medium"
                >
                  Resend OTP
                </button>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-full bg-yellow-400 text-black font-semibold hover:bg-yellow-300 transition shadow"
          >
            Verify OTP
          </button>
        </form>
      )}

      {/* STEP 3 */}
      {step === 3 && (
        <form onSubmit={handleResetPassword} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              New Password
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-yellow-400 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-yellow-400 outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-full bg-yellow-400 text-black font-semibold hover:bg-yellow-300 transition shadow"
          >
            Reset Password
          </button>
        </form>
      )}
    </div>
  </div>
);


}

export default ForgotPassword;
