import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import GuestRoutes from "./GuestRoutes";
import AdminUserRoute from "./AdminUserRoute";
import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminLayout from "../layouts/AdminLayout";
import UnAuthorized from "../pages/UnAuthorized";
// import AdminSidebar from "../layouts/AdminSidebar";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/state" element={<StateManage />}></Route> */}
        <Route path="/" element={<LoginPage />}></Route>

        <Route element={<MainLayout />}></Route>
        <Route element={<GuestRoutes />}>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/register" element={<RegisterPage />}></Route>
        </Route>

        {/* Admin Route */}
        <Route element={<AdminUserRoute />}>
          <Route element={<AdminLayout />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            {/* <Route path="/admin/user" element={<AdminUserPage />} />
            <Route path="/admin/venue" element={<AdminVenuePage />} />
            <Route path="/admin/owner" element={<AdminOwnerPage />} /> */}
            <Route path="*" element={<UnAuthorized />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
