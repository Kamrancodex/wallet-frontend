// src/pages/NotAuthorized.jsx
import React from "react";
import { Link } from "react-router-dom";

const NotAuthorized = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full text-center">
        <h1 className="text-3xl font-bold text-red-500 mb-4">Not Authorized</h1>
        <p className="text-gray-700 mb-6">
          You do not have permission to access this page. Please login or sign
          up to continue.
        </p>
        <div className="flex justify-center space-x-4">
          <Link
            to="/signin"
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition duration-300"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotAuthorized;
