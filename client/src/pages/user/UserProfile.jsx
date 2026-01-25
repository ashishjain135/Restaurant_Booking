
// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const UserProfile = () => {
//   const [user, setUser] = useState(null);
//   const [editing, setEditing] = useState(false);
//   const [changingPassword, setChangingPassword] = useState(false);
//   const [form, setForm] = useState({});
//   const [passwordData, setPasswordData] = useState({
//     currentPassword: "",
//     newPassword: "",
//     confirmPassword: "",
//   });

//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const res = await axios.get("/api/user/profile", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setUser(res.data.user);
//         setForm(res.data); // pre-fill edit form
//       } catch (err) {
//         console.error("Error fetching user:", err.response?.data || err.message);
//       }
//     };

//     fetchUser();
//   }, [token,userId]);

//   const handleProfileChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSaveChanges = async () => {
//     try {
//       const res = await axios.put("/api/user/profile", form, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setUser(res.data);
//       setEditing(false);
//     } catch (err) {
//       console.error("Error updating profile:", err.response?.data || err.message);
//     }
//   };

//   const handlePasswordChange = async () => {
//     const { currentPassword, newPassword, confirmPassword } = passwordData;

//     if (newPassword !== confirmPassword) {
//       alert("New passwords do not match!");
//       return;
//     }

//     try {
//       await axios.put(
//         "/api/user/change-password",
//         { currentPassword, newPassword },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       alert("Password changed successfully.");
//       setChangingPassword(false);
//       setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
//     } catch (err) {
//       alert(err.response?.data?.message || "Error changing password.");
//     }
//   };

//   if (!user) return <p className="text-center mt-10">Loading profile...</p>;

//   return (
//     <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-md rounded-xl">
//       <h2 className="text-2xl font-bold mb-4 text-center">User Profile</h2>

//       <div className="space-y-2">
//         <div><strong>Full Name:</strong> {user.firstName} {user.lastName}</div>
//         <div><strong>Email:</strong> {user.email}</div>
//         <div><strong>Phone:</strong> {user.phone}</div>
//         <div><strong>Gender:</strong> {user.gender}</div>
//         <div><strong>Age:</strong> {user.age}</div>
//         <div><strong>Role:</strong> {user.role}</div>
//       </div>

//       <div className="flex justify-center gap-4 mt-6">
//         <button
//           className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//           onClick={() => setEditing(true)}
//         >
//           Edit Profile
//         </button>
//         <button
//           className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
//           onClick={() => setChangingPassword(true)}
//         >
//           Change Password
//         </button>
//       </div>

//       {/* Edit Profile Modal */}
//       {editing && (
//         <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
//           <div className="bg-white p-6 rounded-md w-96 space-y-4 shadow-xl">
//             <h3 className="text-xl font-semibold mb-2">Edit Profile</h3>
//             {["firstName", "lastName", "phone", "gender", "age"].map((field) => (
//               <input
//                 key={field}
//                 name={field}
//                 value={form[field] || ""}
//                 onChange={handleProfileChange}
//                 placeholder={field}
//                 className="w-full border p-2 rounded"
//               />
//             ))}
//             <div className="flex justify-end gap-2">
//               <button onClick={() => setEditing(false)} className="px-4 py-2 bg-gray-400 text-white rounded">
//                 Cancel
//               </button>
//               <button onClick={handleSaveChanges} className="px-4 py-2 bg-blue-600 text-white rounded">
//                 Save
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Change Password Modal */}
//       {changingPassword && (
//         <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
//           <div className="bg-white p-6 rounded-md w-96 space-y-4 shadow-xl">
//             <h3 className="text-xl font-semibold mb-2">Change Password</h3>
//             <input
//               type="password"
//               name="currentPassword"
//               placeholder="Current Password"
//               className="w-full border p-2 rounded"
//               value={passwordData.currentPassword}
//               onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
//             />
//             <input
//               type="password"
//               name="newPassword"
//               placeholder="New Password"
//               className="w-full border p-2 rounded"
//               value={passwordData.newPassword}
//               onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
//             />
//             <input
//               type="password"
//               name="confirmPassword"
//               placeholder="Confirm New Password"
//               className="w-full border p-2 rounded"
//               value={passwordData.confirmPassword}
//               onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
//             />
//             <div className="flex justify-end gap-2">
//               <button onClick={() => setChangingPassword(false)} className="px-4 py-2 bg-gray-400 text-white rounded">
//                 Cancel
//               </button>
//               <button onClick={handlePasswordChange} className="px-4 py-2 bg-green-600 text-white rounded">
//                 Update
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default UserProfile;
































import React, { useState, useEffect } from "react";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";

const ProfileSection = () => {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [passwordData, setPasswordData] = useState({ oldPassword: "", newPassword: "" });
const [showOldPassword, setShowOldPassword] = useState(false);
const [showNewPassword, setShowNewPassword] = useState(false);

  const token = localStorage.getItem("token");

useEffect(() => {
  const fetchUser = async () => {
    if (!token) {
      console.error("No token found in localStorage.");
      return;
    }

    try {
      const res = await axios.get("http://localhost:5000/api/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(res.data);
    } catch (err) {
      console.error("Error fetching profile:", err);
    }
  };

  fetchUser();
}, []);


const handleInputChange = (e) => {
  if (!user) return; // Prevent null error
  setUser({ ...user, [e.target.name]: e.target.value });
};


  const handleProfileUpdate = async () => {
    try {
      const res = await axios.put(`/api/user`, user, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data);
      setEditMode(false);
      alert("Profile updated successfully");
    } catch (err) {
      console.error("Update error:", err);
    }
  };

  const handlePasswordChange = async () => {
    try {
      await axios.put(`/api/user/password`, passwordData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPasswordData({ oldPassword: "", newPassword: "" });
      alert("Password updated successfully");
    } catch (err) {
      console.error("Password error:", err);
      alert("Incorrect current password");
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete your account?")) {
      try {
        await axios.delete(`/api/user`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert("Account deleted");
        localStorage.clear();
        window.location.href = "/";
      } catch (err) {
        console.error("Delete error:", err);
      }
    }
  };

  if (!user) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-lg mt-8 font-sans">
      <h2 className="text-2xl font-semibold text-center mb-6">My Profile</h2>

      {editMode ? (
        <div className="space-y-4">
          <input
            name="firstName"
            value={user.firstName}
            onChange={handleInputChange}
            placeholder="First Name"
            className="w-full border border-gray-300 p-2 rounded"
          />
          <input
            name="middleName"
            value={user.middleName}
            onChange={handleInputChange}
            placeholder="Middle Name"
            className="w-full border border-gray-300 p-2 rounded"
          />
          <input
            name="lastName"
            value={user.lastName}
            onChange={handleInputChange}
            placeholder="Last Name"
            className="w-full border border-gray-300 p-2 rounded"
          />
          <input
            name="age"
            value={user.age}
            onChange={handleInputChange}
            placeholder="Age"
            type="number"
            className="w-full border border-gray-300 p-2 rounded"
          />
          <select
            name="gender"
            value={user.gender}
            onChange={handleInputChange}
            className="w-full border border-gray-300 p-2 rounded"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          <input
            name="phoneNumber"
            value={user.phoneNumber}
            onChange={handleInputChange}
            placeholder="Phone"
            className="w-full border border-gray-300 p-2 rounded"
          />
          <input
            name="address"
            value={user.address}
            onChange={handleInputChange}
            placeholder="Address"
            className="w-full border border-gray-300 p-2 rounded"
          />
          <div className="flex gap-3">
            <button
              onClick={handleProfileUpdate}
              className="!bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              💾 Save
            </button>
            <button
              onClick={() => setEditMode(false)}
              className="!bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              ❌ Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          <p><strong>Name:</strong> {user.firstName} {user.middleName} {user.lastName}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Phone:</strong> {user.countryCode}-{user.phoneNumber}</p>
          <p><strong>Gender:</strong> {user.gender}</p>
          <p><strong>Age:</strong> {user.age}</p>
          <p><strong>Address:</strong> {user.address}</p>
          <button
            onClick={() => setEditMode(true)}
            className="!bg-yellow-500 text-white px-4 py-2 rounded mt-2 hover:bg-yellow-600"
          >
            ✏️ Edit Profile
          </button>
        </div>
      )}

      <h3 className="mt-8 mb-2 font-semibold text-lg">🔐 Change Password</h3>
      {/* <input
        type="password"
        placeholder="Current Password"
        value={passwordData.oldPassword}
        onChange={(e) => setPasswordData({ ...passwordData, oldPassword: e.target.value })}
        className="w-full border border-gray-300 p-2 rounded mb-2"
      /> */}

       <div className="relative mb-2">
        <input
          type={showOldPassword ? "text" : "password"}
          placeholder="Current Password"
          value={passwordData.oldPassword}
          onChange={(e) =>
            setPasswordData({ ...passwordData, oldPassword: e.target.value })
          }
          className="w-full border border-gray-300 p-2 rounded pr-10"
        />
        <span
          onClick={() => setShowOldPassword((prev) => !prev)}
          className="absolute right-3 top-3 cursor-pointer text-gray-500 hover:scale-110 transition-transform"

        >
          {showOldPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </span>
      </div>


      {/* <input
        type="password"
        placeholder="New Password"
        value={passwordData.newPassword}
        onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
        className="w-full border border-gray-300 p-2 rounded mb-2"
      /> */}

      <div className="relative mb-4">
        <input
          type={showNewPassword ? "text" : "password"}
          placeholder="New Password"
          value={passwordData.newPassword}
          onChange={(e) =>
            setPasswordData({ ...passwordData, newPassword: e.target.value })
          }
          className="w-full border border-gray-300 p-2 rounded pr-10"
        />
        <span
          onClick={() => setShowNewPassword((prev) => !prev)}
          className="absolute right-3 top-3 cursor-pointer text-gray-500"
        >
          {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </span>
      </div>


      <button
        onClick={handlePasswordChange}
        className="!bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Update Password
      </button>

      <h3 className="mt-8 mb-2 font-semibold text-lg text-red-600">⚠️ Danger Zone</h3>
      <button
        onClick={handleDelete}
        className="!bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
      >
        🗑️ Delete Account
      </button>
    </div>
  );
};

export default ProfileSection;
