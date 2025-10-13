// src/components/AdminRoute.js
import React from "react";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  // Se não há token, redireciona para o login admin
  if (!token) {
    return <Navigate to="/admin/login" />;
  }

  // Aqui você pode fazer validações extras futuramente (ex: verificar se é admin de fato)
  return children;
};

export default AdminRoute;
