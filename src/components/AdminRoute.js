import React from "react";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const adminData = JSON.parse(localStorage.getItem("adminData"));
  const isAuthenticated = adminData?.token;
  const isAdmin = adminData?.isAdmin;

  if (!isAuthenticated || !isAdmin) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};

export default AdminRoute;
