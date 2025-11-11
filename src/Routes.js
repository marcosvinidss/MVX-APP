import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import AdPage from "./pages/AdPage";
import AddAd from "./pages/AddAd";
import Ads from "./pages/Ads";
import MyAccount from "./pages/MyAccount";
import MyAds from "./pages/MyAds";
import FavPage from "./pages/FavPage";
import MessagesPage from "./pages/Messages";

import RouteHandler from "./components/RouteHandler";

import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";

// Guard embutido: só deixa entrar se houver adminToken
const RequireAdmin = ({ children }) => {
  const adminToken = localStorage.getItem("adminToken");
  if (!adminToken) {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
};

// Se já tem adminToken, não deixa ver a tela de login admin
const AdminLoginGate = ({ children }) => {
  const adminToken = localStorage.getItem("adminToken");
  if (adminToken) return <Navigate to="/admin" replace />;
  return children;
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Públicas */}
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/ad/:id" element={<AdPage />} />
      <Route path="/ads" element={<Ads />} />

      {/* Criar/Editar anúncio */}
      <Route
        path="/post-an-ad"
        element={
          <RouteHandler>
            <AddAd />
          </RouteHandler>
        }
      />
      <Route
        path="/post-an-ad/:id"
        element={
          <RouteHandler>
            <AddAd />
          </RouteHandler>
        }
      />

      {/* Meus Anúncios */}
      <Route
        path="/my-ads"
        element={
          <RouteHandler>
            <MyAds />
          </RouteHandler>
        }
      />

      {/* Favoritos */}
      <Route
        path="/favorites"
        element={
          <RouteHandler>
            <FavPage />
          </RouteHandler>
        }
      />

      {/* Minha Conta */}
      <Route
        path="/my-account"
        element={
          <RouteHandler>
            <MyAccount />
          </RouteHandler>
        }
      />

      {/* Mensagens */}
      <Route
        path="/messages"
        element={
          <RouteHandler>
            <MessagesPage />
          </RouteHandler>
        }
      />

      {/* Admin */}
      <Route
        path="/admin/login"
        element={
          <AdminLoginGate>
            <AdminLogin />
          </AdminLoginGate>
        }
      />

      <Route
        path="/admin"
        element={
          <RequireAdmin>
            <AdminDashboard />
          </RequireAdmin>
        }
      />

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
