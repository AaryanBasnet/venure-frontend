import React, { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// Layouts
import MainLayout from "../layouts/MainLayout";
import AdminLayout from "../layouts/AdminLayout";
import OwnerLayout from "../layouts/OwnerLayout";

// Route guards
import GuestRoutes from "./GuestRoutes";
import AdminUserRoute from "./AdminUserRoute";
import OwnerUserRoute from "./OwnerUserRoute";

// Utility
import UnAuthorized from "../pages/UnAuthorized";
import UserRoleRoute from "./UserRoleRoute";

// Lazy loaded pages
const LoginPage = lazy(() => import("../pages/LoginPage"));
const RegisterPage = lazy(() => import("../pages/RegisterPage"));
const LandingPage = lazy(() => import("../pages/user/LandingPage"));
const AboutUs = lazy(() => import("../pages/user/AboutUs"));
const ContactUs = lazy(() => import("../pages/user/ContactUs"));
const VenueList = lazy(() => import("../components/user/VenueList"));
const FavoriteSection = lazy(() =>
  import("../components/user/FavoriteSection")
);
const MyBookings = lazy(() => import("../components/user/MyBookings"));
const TestimonialForm = lazy(() =>
  import("../components/user/TestimonialForm")
);
const VenueDetails = lazy(() => import("../pages/user/VenueDetails"));
const BookingPage = lazy(() => import("../pages/user/BookingPage"));
const DateAndTimeSelectionPage = lazy(() =>
  import("../components/user/DateandTimeSelection")
);
const GuestDetailsPage = lazy(() => import("../components/user/GuestDetails"));
const AddOnsSelectionPage = lazy(() =>
  import("../components/user/AddonSelection")
);
const PaymentInformationPage = lazy(() =>
  import("../components/user/PaymentInformation")
);
const ChatPage = lazy(() => import("../pages/user/ChatPage"));
const ProfilePage = lazy(() => import("../pages/user/ProfilePage"));

// Admin Pages
const AdminDashboard = lazy(() => import("../pages/admin/AdminDashboard"));
const AdminUsersPage = lazy(() => import("../pages/admin/AdminUsersPage"));
const AdminVenuePage = lazy(() => import("../pages/admin/AdminVenuePage"));
const AdminVenueOwnerPage = lazy(() =>
  import("../pages/admin/AddVenueOwnerPage")
);
const AdminTestimonialPage = lazy(() =>
  import("../pages/admin/AdminTestimonialPage")
);
const AdminContactPage = lazy(() => import("../pages/admin/AdminContactPage"));

// Owner Pages
const OwnerDashboard = lazy(() => import("../pages/venueOwner/OwnerDashboard"));
const OwnerAnalyticsPage = lazy(() =>
  import("../pages/venueOwner/OwnerAnalyticsPage")
);
const OwnerVenueReviewsPage = lazy(() =>
  import("../pages/venueOwner/OwnerVenueReviewsPage")
);
const OwnerBookingsPage = lazy(() =>
  import("../pages/venueOwner/OwnerBookingPage")
);
const OwnerVenuePage = lazy(() => import("../pages/venueOwner/OwnerVenuePage"));
const OwnerChatPage = lazy(() => import("../pages/venueOwner/OwnerChatPage"));
const OwnerPaymentPage = lazy(() =>
  import("../pages/venueOwner/OwnerPaymentPage")
);

// 404 Page
const NotFound = lazy(() => import("../pages/NotFound"));

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <div className="text-center mt-20 text-rose-500">Loading...</div>
        }
      >
        <Routes>
          {/* Public pages accessible by all (no guard) */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/testimonial" element={<TestimonialForm />} />
          </Route>

          {/* Routes restricted to guests and customers only */}
          <Route element={<UserRoleRoute />}>
            <Route element={<MainLayout />}>
              <Route path="/venues" element={<VenueList />} />
              <Route path="/venue/:id" element={<VenueDetails />} />

              <Route path="/favorites" element={<FavoriteSection />} />
              <Route path="/my-bookings" element={<MyBookings />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/checkout/:id" element={<BookingPage />}>
                <Route index element={<DateAndTimeSelectionPage />} />
                <Route path="guests" element={<GuestDetailsPage />} />
                <Route path="addons" element={<AddOnsSelectionPage />} />
                <Route path="payment" element={<PaymentInformationPage />} />
              </Route>
              <Route path="/chat" element={<ChatPage />} />
            </Route>
          </Route>

          {/* Guest-only routes */}
          <Route element={<GuestRoutes />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Route>

          {/* Admin Protected Routes */}
          <Route element={<AdminUserRoute />}>
            <Route element={<AdminLayout />}>
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/user" element={<AdminUsersPage />} />
              <Route path="/admin/venue" element={<AdminVenuePage />} />
              <Route path="/admin/contact" element={<AdminContactPage />} />
              <Route path="/admin/owner" element={<AdminVenueOwnerPage />} />
              <Route
                path="/admin/testimonial"
                element={<AdminTestimonialPage />}
              />
            </Route>
          </Route>

          {/* Owner Protected Routes */}
          <Route element={<OwnerUserRoute />}>
            <Route element={<OwnerLayout />}>
              <Route path="/owner/dashboard" element={<OwnerDashboard />} />
              <Route path="/owner/analytics" element={<OwnerAnalyticsPage />} />
              <Route
                path="/owner/reviews"
                element={<OwnerVenueReviewsPage />}
              />
              <Route path="/owner/bookings" element={<OwnerBookingsPage />} />
              <Route path="/owner/venues" element={<OwnerVenuePage />} />
              <Route path="/owner/chat" element={<OwnerChatPage />} />
              <Route path="/owner/payments" element={<OwnerPaymentPage />} />
            </Route>
          </Route>

          {/* Unauthorized route accessible by everyone */}
          <Route path="/unauthorized" element={<UnAuthorized />} />

          {/* Global 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
