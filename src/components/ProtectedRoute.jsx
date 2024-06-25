// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element, isAuthenticated }) => {
  if (isAuthenticated === null) {
    // You can add a loader here if you want to show a loading state
    return <div>Loading...</div>;
  }
  return isAuthenticated ? element : <Navigate to="/not-authorized" />;
};

export default ProtectedRoute;
