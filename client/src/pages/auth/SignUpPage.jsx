/**
 * Form data flow and handling 
 * 1.POST /api/auth/signup
 * 2.validate fields
→ 3.if role === Admin:
     verify adminSecret
→ 4.hash password (bcrypt)
→ 5.save user in DB (unverified)
→ 6.generate OTP
→ 7.send email

 * 

*Signup supports both users and admins with role-based validation.
*Admin registration is secured using a secret key and OTP-based email verification
*User accounts are activated only after successful email verification
 */



import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate, Link } from 'react-router-dom';
import API from '../../utils/axios';


const SignupForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',         
    password: '',
    confirmPassword: '',
    firstName: '',
    middleName: '',
    lastName: '',
    age: '',     
    gender: '',
    countryCode: '+91',
    phoneNumber: '',
    address: '',
    role: '',
    adminSecret: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const {
      email,
      password,
      confirmPassword,
      firstName,
      lastName,
      phoneNumber,
      address,
      age,
      gender,
      role,
      adminSecret,
    } = formData;

    // ✅ Validate required fields before sending
    if (
      !email || !password || !confirmPassword || !firstName || !lastName ||
      !phoneNumber || !address || !age || !gender || !role
    ) {
      toast.error('Please fill all required fields.');
      setIsSubmitting(false);
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Passwords do not match.');
      setIsSubmitting(false);
      return;
    }

    if (role === 'Admin' && !adminSecret) {
      toast.error('Admin secret key is required for admin role');
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await API.post("/api/auth/signup", formData, {
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.data.success) {
        toast.success('OTP sent to your email');
        navigate(`/verify-email?email=${encodeURIComponent(formData.email)}`);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Signup failed');
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
  <div className="min-h-screen w-full overflow-x-hidden bg-gradient-to-br from-[#1f1c18] to-[#8e0e00] flex flex-col justify-center py-12 px-4 relative">

    {/* Soft Glow Background */}
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-yellow-300/10 rounded-full blur-3xl"></div>
    </div>

    <div className="w-full max-w-5xl mx-auto relative z-10">

      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-400 rounded-full mb-6 shadow-lg">
          <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
        </div>

        <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">
          Create Your <span className="text-yellow-400">MealAdda</span> Account
        </h2>

        <p className="text-base sm:text-lg text-gray-200 max-w-2xl mx-auto">
          Join MealAdda and enjoy seamless restaurant bookings.
        </p>
      </div>

      {/* Card */}
      <div className="bg-white/95 backdrop-blur-md shadow-2xl rounded-3xl overflow-hidden">
        <div className="p-6 sm:p-10">
          <form onSubmit={handleSubmit} className="space-y-10">

            {/* Profile */}
            <SectionCard title="Profile Information">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {["firstName", "middleName", "lastName"].map((name, i) => (
                  <InputField
                    key={i}
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                    placeholder={name.replace(/([A-Z])/g, " $1").trim()}
                  />
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <InputField name="age" type="number" value={formData.age} onChange={handleChange} placeholder="Age" />
                <SelectField name="gender" value={formData.gender} onChange={handleChange} options={["Male", "Female", "Other"]} />
              </div>
            </SectionCard>

            {/* Contact */}
            <SectionCard title="Contact Information">
              <div className="space-y-6">
                <InputField name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Email Address" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputField name="countryCode" value={formData.countryCode} onChange={handleChange} placeholder="Country Code" />
                  <InputField name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} placeholder="Phone Number" />
                </div>
                <TextAreaField name="address" value={formData.address} onChange={handleChange} placeholder="Full Address" />
              </div>
            </SectionCard>

            {/* Security */}
            <SectionCard title="Security">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField name="password" type="password" value={formData.password} onChange={handleChange} placeholder="Password" />
                <InputField name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleChange} placeholder="Confirm Password" />
              </div>
            </SectionCard>

            {/* Role */}
            <SectionCard title="Role Selection">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <SelectField name="role" value={formData.role} onChange={handleChange} options={["user", "admin"]} />
                {formData.role === "admin" && (
                  <InputField
                    name="adminSecret"
                    type="password"
                    value={formData.adminSecret}
                    onChange={handleChange}
                    placeholder="Admin Secret Key"
                  />
                )}
              </div>
            </SectionCard>

            {/* Footer */}
            <div className="flex flex-col sm:flex-row items-center justify-between pt-8 gap-4">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <Link to="/login" className="font-semibold text-yellow-600 hover:text-yellow-500">
                  Sign in
                </Link>
              </p>

              <button
                type="submit"
                disabled={isSubmitting}
                className="px-10 py-4 text-lg font-semibold rounded-full bg-yellow-400 text-black hover:bg-yellow-300 transition shadow-xl disabled:opacity-60"
              >
                
                {isSubmitting ? "Creating Account..." : "Create Account"}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  </div>
);

};

// === Reusable Components ===
// const SectionCard = ({ title, color, iconColor, children }) => (
//   <div className={`bg-gradient-to-r ${color} p-6 sm:p-8 rounded-2xl border border-indigo-100/50 transform hover:scale-[1.01] transition-all duration-300`}>
//     <div className="flex items-center mb-6">
//       <div className={`w-10 h-10 bg-gradient-to-r ${iconColor} rounded-xl flex items-center justify-center mr-4 shadow-lg`}>
//         <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
//         </svg>
//       </div>
//       <h3 className="text-xl sm:text-2xl font-bold text-gray-800">{title}</h3>
//     </div>
//     {children}
//   </div>
// );
const SectionCard = ({ title, children }) => (
  <div className="bg-gray-50 p-6 sm:p-8 rounded-2xl border border-gray-200">
    <h3 className="text-xl font-bold text-gray-800 mb-6">{title}</h3>
    {children}
  </div>
);

// const InputField = ({ name, value, onChange, placeholder, type = "text" }) => (
//   <div className="group">
//     <label className="block text-sm font-semibold text-gray-700 mb-2 capitalize">{name.replace(/([A-Z])/g, ' $1')}</label>
//     <input
//       name={name}
//       type={type}
//       value={value}
//       onChange={onChange}
//       className="block w-full px-4 py-3 rounded-xl border-2 border-gray-200 shadow-sm focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-300"
//       placeholder={placeholder}
//     />
//   </div>
// );
const InputField = ({ name, value, onChange, placeholder, type = "text" }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
      {name.replace(/([A-Z])/g, " $1")}
    </label>
    <input
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none"
    />
  </div>
);

// const SelectField = ({ name, value, onChange, options }) => (
//   <div className="group">
//     <label className="block text-sm font-semibold text-gray-700 mb-2 capitalize">{name}</label>
//     <select
//       name={name}
//       value={value}
//       onChange={onChange}
//       className="block w-full px-4 py-3 rounded-xl border-2 border-gray-200 shadow-sm focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-300 appearance-none bg-white"
//     >
//       <option value="">Select {name}</option>
//       {options.map(opt => (
//         <option key={opt} value={opt}>{opt}</option>
//       ))}
//     </select>
//   </div>
// );
const SelectField = ({ name, value, onChange, options }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
      {name}
    </label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none bg-white"
    >
      <option value="">Select {name}</option>
      {options.map(opt => (
        <option key={opt} value={opt}>{opt}</option>
      ))}
    </select>
  </div>
);

// const TextAreaField = ({ name, value, onChange, placeholder }) => (
//   <div className="group">
//     <label className="block text-sm font-semibold text-gray-700 mb-2 capitalize">{name}</label>
//     <textarea
//       name={name}
//       rows="4"
//       value={value}
//       onChange={onChange}
//       className="block w-full px-4 py-3 rounded-xl border-2 border-gray-200 shadow-sm focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 resize-none"
//       placeholder={placeholder}
//     />
//   </div>
// );
const TextAreaField = ({ name, value, onChange, placeholder }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
      {name}
    </label>
    <textarea
      name={name}
      rows="4"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none resize-none"
    />
  </div>
);

export default SignupForm;
