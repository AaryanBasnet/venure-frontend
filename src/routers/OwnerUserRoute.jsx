import React, { useContext } from "react";
import { AuthContext } from "../auth/AuthProvider";
import { Navigate, Outlet } from "react-router-dom";

export default function OwnerUserRoute() {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <>loading</>;
  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== "VenueOwner") {
    console.log("Redirecting from OwnerUserRoute, role:", user.role);
    return <Navigate to="/random" replace />;
  }
  return <Outlet />;
}
