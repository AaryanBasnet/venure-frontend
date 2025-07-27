import React, { useContext } from "react";
import { AuthContext } from "../auth/AuthProvider";
import { Navigate, Outlet } from "react-router-dom";
import LoadingPage from "../components/LoadingPage";

export default function UserRoleRoute() {
  const { user, loading } = useContext(AuthContext);

  if (loading)
    return (
      <>
        <LoadingPage />
      </>
    );

  if (!user) return <Outlet />; // guest can access user pages
  if (user.role === "Customer") return <Outlet />;


  if (user.role === "Admin") return <Navigate to="/admin/dashboard" replace />;
  if (user.role === "VenueOwner")
    return <Navigate to="/owner/dashboard" replace />;

  // fallback
  return <Navigate to="/unauthorized" replace />;
}
