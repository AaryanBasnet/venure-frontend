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
import AdminUsersPage from "../pages/admin/AdminUsersPage";
import AdminVenuePage from "../pages/admin/AdminVenuePage";
import AdminVenueOwnerPage from "../pages/admin/AddVenueOwnerPage";
import OwnerUserRoute from "./OwnerUserRoute";
import OwnerLayout from "../layouts/OwnerLayout";
import OwnerDashbaord from "../pages/venueOwner/OwnerDashbaord";
import OwnerVenuePage from "../pages/venueOwner/OwnerVenuePage";
import LandingPage from "../pages/user/LandingPage";
import VenueDetails from "../pages/user/VenueDetails";
import BookingPage from "../pages/user/BookingPage";
import VenueList from "../components/user/VenueList";
import DateAndTimeSelectionPage from "../components/user/DateandTimeSelection";
import GuestDetailsPage from "../components/user/GuestDetails";
import AddOnsSelectionPage from "../components/user/AddonSelection";
import PaymentInformationPage from "../components/user/PaymentInformation";
// import AdminSidebar from "../layouts/AdminSidebar";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/state" element={<StateManage />}></Route> */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<LandingPage />}>
          
          </Route>
          <Route path="/venues" element={<VenueList />}></Route>
          <Route path="/checkout/:id" element={<BookingPage />}>
            <Route index  element={<DateAndTimeSelectionPage />} />
            <Route path="guests" element={<GuestDetailsPage />} />
            <Route path="addons" element={<AddOnsSelectionPage />} />
            <Route path="payment" element={<PaymentInformationPage />} />
          </Route>
        <Route path="/venue/:id" element={<VenueDetails />} />
        </Route>
        <Route element={<GuestRoutes />}>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/register" element={<RegisterPage />}></Route>
        </Route>
        {/* Admin Route */}
        <Route element={<AdminUserRoute />}>
          <Route element={<AdminLayout />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/user" element={<AdminUsersPage />} />
            <Route path="/admin/venue" element={<AdminVenuePage />} />
            <Route path="/admin/owner" element={<AdminVenueOwnerPage />} />
            <Route path="*" element={<UnAuthorized />} />
          </Route>
        </Route>
        {/* Owner Route */}
        <Route element={<OwnerUserRoute />}>
          <Route element={<OwnerLayout />}>
            <Route path="/owner/dashboard" element={<OwnerDashbaord />} />
            {/* <Route path="/admin/user" element={<AdminUsersPage />} /> */}
            <Route path="/owner/venue" element={<OwnerVenuePage />} />
            {/* <Route path="/admin/owner" element={<AdminVenueOwnerPage />} /> */}
            <Route path="*" element={<UnAuthorized />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
