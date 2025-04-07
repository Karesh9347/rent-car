import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem("user"); // Clear user data
    navigate("/sign-in"); // Redirect to login page
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Dashboard</h2>

        {user ? (
          <div>
            <p className="text-gray-700">
              <strong>Name:</strong> {user.user.name || "N/A"}
            </p>
            <p className="text-gray-700">
              <strong>Email:</strong> {user.user.email || "N/A"}
            </p>
            <p className="text-gray-700">
              <strong>Phone:</strong> {user.user.phoneNumber || "N/A"}
            </p>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="mt-4 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
            >
              Logout
            </button>
          </div>
        ) : (
          <p className="text-red-500">No user data found.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
