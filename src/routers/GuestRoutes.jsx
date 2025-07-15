import React, { useContext } from "react";
import { AuthContext } from "../auth/AuthProvider";
import { Navigate, Outlet } from "react-router-dom";

export default function GuestRoutes() {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <>Loading...</>;

  if (user?.role === "Admin") return <Navigate to="/admin/dashboard" replace />;
  if (user?.role === "venueOwner")
    return <Navigate to="/owner/dashboard" replace />;

  if (user) return <Navigate to="/" replace />;

  return <Outlet />;
}
