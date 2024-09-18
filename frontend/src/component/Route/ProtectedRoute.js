import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import Loader from "../layout/Loader/Loader";

const ProtectedRoute = ({ isAdmin, element: Component, ...rest }) => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);
  const location = useLocation();

  if (loading) {
    return <Loader />; // Or a Loader component
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  if (isAdmin && user.role !== "admin") {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return Component;
};

export default ProtectedRoute;
