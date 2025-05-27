import React from "react";
import { Navigate } from "react-router-dom";
import { isLogged } from "../helpers/AuthHandler";

const RouteHandler = ({ children }) => {
  if (!isLogged()) {
    return <Navigate to="/signin" replace />;
  }
  return children;
};

export default RouteHandler;
