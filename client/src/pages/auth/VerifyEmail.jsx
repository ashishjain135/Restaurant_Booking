/**
 * This component verifies user email using an OTP before activating the account.
 * 
 */

import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Mail,
  KeyRound,
  ArrowRight,
  CheckCircle,
  RefreshCw,
} from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";
// import api from "../apiUrl/api"


function VerifyEmailPage() {
  const navigate = useNavigate();
  const location = useLocation(); //current URL info
  const [verificationCode, setVerificationCode] = useState("");
  const  email = new URLSearchParams(location.search).get("email");
  
  const PORT=import.meta.env.VITE_APP_API_URL 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${PORT}/api/auth/verify-email`,
        { email, verificationCode }
      ); //email varification
      toast.success("Email verified successfully!");
      setTimeout(() => {
        navigate("/login");
      }, 2000); //after 2 sec redirect to login pages
    } catch (error) {
      toast.error(error,"Invalid or expired verification code");
    }
  };
  return (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1f1c18] to-[#8e0e00] px-4 py-12">

    <div className="max-w-md w-full">

      {/* Header */}
      <div className="text-center mb-8">
        <div className="mx-auto h-16 w-16 rounded-full bg-yellow-400 flex items-center justify-center shadow-lg">
          <Mail className="h-8 w-8 text-black" />
        </div>

        <h2 className="mt-6 text-3xl font-extrabold text-white">
          Verify Your Email
        </h2>

        <p className="mt-3 text-gray-200 text-sm">
          We sent a verification code to{" "}
          <span className="font-semibold text-yellow-400">
            {email}
          </span>
        </p>
      </div>

      {/* Form Card */}
      <form onSubmit={handleSubmit}>
        <div className="bg-white rounded-3xl shadow-2xl p-8">

          <div className="space-y-6">
            {/* OTP Input */}
            <div>
              <label
                htmlFor="verification-code"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Verification Code
              </label>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <KeyRound className="h-5 w-5 text-gray-400" />
                </div>

                <input
                  id="verification-code"
                  type="text"
                  required
                  maxLength="6"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  placeholder="••••••"
                  className="w-full pl-11 pr-4 py-3 text-lg tracking-widest rounded-xl border border-gray-300 focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none"
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-3 rounded-full bg-yellow-400 text-black font-semibold hover:bg-yellow-300 transition shadow flex items-center justify-center gap-2"
            >
              <CheckCircle className="h-5 w-5" />
              Verify Email
              <ArrowRight className="h-5 w-5" />
            </button>

            {/* Resend */}
            <div className="text-center">
              <button
                type="button"
                className="inline-flex items-center text-sm text-yellow-600 hover:text-yellow-500 font-medium"
              >
                <RefreshCw className="h-4 w-4 mr-1.5" />
                Resend verification code
              </button>
            </div>
          </div>

        </div>
      </form>

      {/* Footer */}
      <p className="mt-6 text-center text-xs text-gray-300">
        Check your spam folder if you don’t see the email in your inbox.
      </p>
    </div>
  </div>
);

}

export default VerifyEmailPage;