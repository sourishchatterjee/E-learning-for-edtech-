import React from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

const PrivateRoute = ({ children }) => {
  let token = localStorage.getItem("auth");
  if (!token) {
    const toastId = "login-warning";
    toast.warning("Please log in to access this page", { toastId });
  }
  return token ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
