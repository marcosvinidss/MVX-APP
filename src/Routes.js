import React from "react";
import { Routes, Route } from "react-router-dom";

// Páginas gerais
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

// Componentes auxiliares
import RouteHandler from "./components/RouteHandler";
import AdminRoute from './components/AdminRoute';

// Páginas de admin
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Páginas públicas */}
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/ad/:id" element={<AdPage />} />
      <Route path="/ads" element={<Ads />} />

      {/* Criar ou Editar anúncio */}
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

      {/* --- ROTAS ADMIN --- */}

      {/* Login do admin */}
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* Painel protegido do admin */}
      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        }
      />

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
