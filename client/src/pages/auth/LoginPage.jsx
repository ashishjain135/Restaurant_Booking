import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import { Lock, Mail, Eye, EyeOff, ArrowRight } from "lucide-react";

const LoginForm = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const PORT = import.meta.env.VITE_APP_API_URL;

  const handleLogin = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post(`${PORT}/api/auth/login`, values);

      if (response.data.token) {
        localStorage.setItem("userId", response.data.userId);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", response.data.role);

        toast.success("Login successful");

        if (response.data.role.toLowerCase() === "admin") {
          navigate("/Admin-Panel");
        } else {
          navigate("/User");
        }
      } else {
        toast.error("Invalid credentials");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1f1c18] to-[#8e0e00] px-4">
      
      {/* Card */}
      <div className="w-full max-w-md bg-white/95 rounded-2xl shadow-2xl p-8">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Welcome Back
          </h2>
          <p className="text-gray-600 mt-2">
            Sign in to{" "}
            <span className="font-semibold text-yellow-500">
              MealAdda Restaurant
            </span>
          </p>
        </div>

        {/* Form */}
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={handleLogin}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-6">

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                  <Field
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                  <Field
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-10 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Forgot */}
              <div className="text-right">
                <Link
                  to="/forgot-password"
                  className="text-sm font-medium text-yellow-600 hover:text-yellow-500 inline-flex items-center"
                >
                  Forgot password?
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>

              {/* Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 rounded-full bg-yellow-400 text-black font-semibold hover:bg-yellow-300 transition disabled:opacity-60"
              >
                {isSubmitting ? "Signing in..." : "Sign In"}
              </button>

              {/* Signup */}
              <p className="text-center text-sm text-gray-600 pt-4 border-t">
                Don’t have an account?{" "}
                <Link
                  to="/signup"
                  className="font-semibold text-yellow-600 hover:text-yellow-500"
                >
                  Sign up
                </Link>
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </main>
  );
};

export default LoginForm;
