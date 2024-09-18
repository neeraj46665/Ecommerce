import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ isAdmin, ...rest }) => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);

  if (loading) return null; // Or a loader, if necessary

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (isAdmin && user.role !== "admin") {
    return <Navigate to="/login" />;
  }

  return <Outlet {...rest} />;
};

export default ProtectedRoute;
