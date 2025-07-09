import React, { useContext } from "react";
import MonthlyEarningsChart from "../../components/owner/MonthlyEarningsChart";
import { useGetMonthlyEarningsForOwner } from "../../hooks/owner/useGetMonthlyEarningForOwner";
import useOwnerBookings from "../../hooks/owner/useOwnerBookings";
import { StatCard } from "../../components/common/StatCard";
import { AuthContext } from "../../auth/AuthProvider";
import useActiveVenueCount from "../../hooks/owner/useGetActiveVenueCount";
import { useGetTotalBookingsForOwner } from "../../hooks/owner/useGetTotalBookingsForOwner";

// Mock data for demonstration - replace with actual hooks/API calls
const mockStats = {
  totalRevenue: 45280,
  totalBookings: 156,
  activeVenues: 3,
  avgRating: 4.8,
};

const mockRecentBookings = [
  {
    id: 1,
    venue: "Grand Ballroom",
    date: "2024-07-15",
    amount: 2500,
    status: "confirmed",
  },
  {
    id: 2,
    venue: "Conference Room A",
    date: "2024-07-14",
    amount: 800,
    status: "pending",
  },
  {
    id: 3,
    venue: "Wedding Hall",
    date: "2024-07-13",
    amount: 3200,
    status: "confirmed",
  },
];

export default function OwnerDashboard() {
  const {
    data: bookings = [],
    isLoading: isLoadingBookings,
    isError: isErrorBookings,
  } = useOwnerBookings();
  const { data, isLoading, error } = useGetMonthlyEarningsForOwner();

  const { user } = useContext(AuthContext);
  const ownerId = user?._id;
  const {
    data: activeVenueCountData,
    isLoading: isLoadingActiveVenueCount,
    isError,
    error: activeVenueCountError,
  } = useActiveVenueCount(ownerId);

  const {
    data: monthlyEarningsData,
    isLoading: isLoadingEarnings,
    error: earningsError,
  } = useGetMonthlyEarningsForOwner();
  const currentMonthIndex = new Date().getMonth();
  const currentMonthEarnings =
    monthlyEarningsData?.[currentMonthIndex]?.totalEarnings ?? 0;
  const { data: totalBookingCountData, isLoading: isLoadingBookingCount } =
    useGetTotalBookingsForOwner();


  const BookingRow = ({ booking }) => {
    const date = new Date(booking.bookingDate).toLocaleDateString();
    return (
      <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
        <div className="flex-1">
          <p className="font-medium text-gray-900">
            {booking.venue.venueName || "Venue Name"}
          </p>
          <p className="text-sm text-gray-500">{date}</p>
        </div>
        <div className="text-right">
          <p className="font-semibold text-gray-900 ">
            Nrs. {booking.totalPrice ?? 0}
          </p>
          <span
            className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
              booking.status === "confirmed"
                ? "bg-green-100 text-green-800"
                : "bg-yellow-100 text-yellow-800"
            }`}
          >
            {booking.status ?? "pending"}
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Owner Dashboard
              </h1>
              <p className="text-sm text-gray-600">
                Welcome back! Here's your venue performance overview.
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Add New Venue
              </button>
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-gray-700">JD</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Revenue"
            value={`Nrs. ${currentMonthEarnings}`}
            subtitle="This month"
            icon="💰"
            trend={12.5}
          />
          <StatCard
            title="Total Bookings"
            value={totalBookingCountData}
            subtitle="This month"
            icon="📅"
            trend={8.2}
          />
          <StatCard
            title="Active Venues"
            value={activeVenueCountData?.data?.count}
            subtitle="Currently listed"
            icon="🏢"
          />
          <StatCard
            title="Average Rating"
            value={mockStats.avgRating}
            subtitle="Across all venues"
            icon="⭐"
            trend={2.1}
          />
        </div>

        {/* Charts and Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Monthly Earnings Chart */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  Monthly Earnings
                </h2>
                {/* <select className="border border-gray-300 rounded-md px-3 py-2 text-sm">
                  <option>Last 12 months</option>
                  <option>Last 6 months</option>
                  <option>Last 3 months</option>
                </select> */}
              </div>

              {isLoading ? (
                <div className="flex items-center justify-center h-64">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  <span className="ml-3 text-gray-600">
                    Loading earnings data...
                  </span>
                </div>
              ) : error ? (
                <div className="flex items-center justify-center h-64 text-red-600">
                  <div className="text-center">
                    <p className="text-lg font-medium">
                      Error loading chart data
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      Please try refreshing the page
                    </p>
                    <button className="mt-3 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors">
                      Retry
                    </button>
                  </div>
                </div>
              ) : (
                <div className="h-64">
                  <MonthlyEarningsChart data={data ?? []} />
                </div>
              )}
            </div>
          </div>
          {/* Recent Bookings */}
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                Recent Bookings
              </h2>
              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                View All
              </button>
            </div>

            <div className="space-y-1">
              {bookings.length > 0 ? (
                bookings.map((booking) => (
                  <BookingRow key={booking._id} booking={booking} />
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <p>No recent bookings</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        {/* <div className="mt-8 bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <button className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors group">
              <div className="text-center">
                <div className="text-2xl mb-2 group-hover:text-blue-600">
                  📊
                </div>
                <p className="text-sm font-medium text-gray-900 group-hover:text-blue-600">
                  View Analytics
                </p>
              </div>
            </button>

            <button className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors group">
              <div className="text-center">
                <div className="text-2xl mb-2 group-hover:text-blue-600">
                  ⚙️
                </div>
                <p className="text-sm font-medium text-gray-900 group-hover:text-blue-600">
                  Manage Venues
                </p>
              </div>
            </button>

            <button className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors group">
              <div className="text-center">
                <div className="text-2xl mb-2 group-hover:text-blue-600">
                  💬
                </div>
                <p className="text-sm font-medium text-gray-900 group-hover:text-blue-600">
                  Messages
                </p>
              </div>
            </button>

            <button className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors group">
              <div className="text-center">
                <div className="text-2xl mb-2 group-hover:text-blue-600">
                  📋
                </div>
                <p className="text-sm font-medium text-gray-900 group-hover:text-blue-600">
                  Reports
                </p>
              </div>
            </button>
          </div>
        </div> */}
      </div>
    </div>
  );
}
