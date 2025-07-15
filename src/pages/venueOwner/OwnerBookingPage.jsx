import React, { useState, useMemo } from "react";
import useOwnerBookings from "../../hooks/owner/useOwnerBookings";
import useCancelBooking from "../../hooks/owner/useCancelBooking";
import useApproveBooking from "../../hooks/owner/useApproveBooking";

const ConfirmModal = ({
  message,
  onConfirm,
  onCancel,
  isLoading,
  type = "cancel",
}) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
    <div className="bg-white p-6 rounded-xl shadow-2xl max-w-md w-full">
      <div className="flex items-center mb-4">
        <div
          className={`w-12 h-12 rounded-full flex items-center justify-center ${
            type === "approve" ? "bg-green-100" : "bg-red-100"
          }`}
        >
          {type === "approve" ? (
            <svg
              className="w-6 h-6 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          ) : (
            <svg
              className="w-6 h-6 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          )}
        </div>
        <h3 className="text-lg font-semibold text-gray-900 ml-3">
          {type === "approve" ? "Approve Booking" : "Cancel Booking"}
        </h3>
      </div>
      <p className="text-gray-600 mb-6">{message}</p>
      <div className="flex justify-end gap-3">
        <button
          onClick={onCancel}
          disabled={isLoading}
          className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 transition-colors"
        >
          No
        </button>
        <button
          onClick={onConfirm}
          disabled={isLoading}
          className={`px-4 py-2 rounded-lg text-white font-medium disabled:opacity-50 transition-colors ${
            type === "approve"
              ? "bg-green-600 hover:bg-green-700"
              : "bg-red-600 hover:bg-red-700"
          }`}
        >
          {isLoading ? "Processing..." : "Yes"}
        </button>
      </div>
    </div>
  </div>
);

const StatusBadge = ({ status }) => {
  const getStatusStyle = (status) => {
    switch (status?.toLowerCase()) {
      case "approved":
        return "bg-green-100 text-green-800 border-green-200";
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusStyle(
        status
      )}`}
    >
      {status || "pending"}
    </span>
  );
};

const FilterTabs = ({ activeFilter, setActiveFilter, bookingCounts }) => {
  const tabs = [
    { key: "all", label: "All Bookings", count: bookingCounts.all },
    { key: "pending", label: "Pending", count: bookingCounts.pending },
    { key: "approved", label: "Approved", count: bookingCounts.approved },
    { key: "cancelled", label: "Cancelled", count: bookingCounts.cancelled },
  ];

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => setActiveFilter(tab.key)}
          className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
            activeFilter === tab.key
              ? "bg-blue-600 text-white"
              : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
          }`}
        >
          {tab.label}
          {tab.count > 0 && (
            <span
              className={`ml-2 px-2 py-1 rounded-full text-xs ${
                activeFilter === tab.key
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {tab.count}
            </span>
          )}
        </button>
      ))}
    </div>
  );
};

const SearchBar = ({ searchTerm, setSearchTerm }) => (
  <div className="relative mb-6">
    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
      <svg
        className="h-5 w-5 text-gray-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    </div>
    <input
      type="text"
      placeholder="Search by customer name, venue, or event type..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    />
  </div>
);

const OwnerBookingsPage = () => {
  const { data: bookings = [], isLoading, isError } = useOwnerBookings();
  const cancelBooking = useCancelBooking();
  const approveBooking = useApproveBooking();
  const [cancelId, setCancelId] = useState(null);
  const [approveId, setApproveId] = useState(null);
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredBookings = useMemo(() => {
    let filtered = bookings;

    // Filter by status
    if (activeFilter !== "all") {
      filtered = filtered.filter(
        (booking) =>
          (booking.status || "pending").toLowerCase() === activeFilter
      );
    }

    // Filter by search term
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (booking) =>
          booking.customer?.name?.toLowerCase().includes(searchLower) ||
          booking.venue?.venueName?.toLowerCase().includes(searchLower) ||
          booking.eventType?.toLowerCase().includes(searchLower)
      );
    }

    return filtered;
  }, [bookings, activeFilter, searchTerm]);

  const bookingCounts = useMemo(() => {
    const counts = {
      all: bookings.length,
      pending: 0,
      approved: 0,
      cancelled: 0,
    };
    bookings.forEach((booking) => {
      const status = (booking.status || "pending").toLowerCase();
      if (counts[status] !== undefined) {
        counts[status]++;
      }
    });
    return counts;
  }, [bookings]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-64 mb-8"></div>
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-20 bg-gray-200 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Failed to load bookings
            </h3>
            <p className="text-gray-600 mb-4">
              There was an error loading your bookings. Please try again.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handleCancelConfirm = () => {
    if (cancelId) {
      cancelBooking.mutate(cancelId, {
        onSuccess: () => setCancelId(null),
      });
    }
  };

  const handleApproveConfirm = () => {
    if (approveId) {
      approveBooking.mutate(approveId, {
        onSuccess: () => setApproveId(null),
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                My Venue Bookings
              </h1>
              <p className="text-gray-600 mt-1">
                Manage and track all your venue bookings
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-blue-50 px-4 py-2 rounded-lg">
                <span className="text-sm font-medium text-blue-900">
                  {filteredBookings.length} booking
                  {filteredBookings.length !== 1 ? "s" : ""}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <FilterTabs
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
          bookingCounts={bookingCounts}
        />

        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        {filteredBookings.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No bookings found
            </h3>
            <p className="text-gray-600">
              {searchTerm
                ? "Try adjusting your search terms"
                : "You don't have any bookings yet"}
            </p>
          </div>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden lg:block bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Customer
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Venue
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date & Time
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Event Details
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredBookings.map((booking) => (
                      <tr
                        key={booking._id}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                              <span className="text-sm font-medium text-blue-900">
                                {booking.customer?.name?.charAt(0) || "?"}
                              </span>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {booking.customer?.name || "N/A"}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {booking.venue?.venueName || "N/A"}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {new Date(booking.bookingDate).toLocaleDateString()}
                          </div>
                          <div className="text-sm text-gray-500">
                            {booking.timeSlot}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 capitalize">
                            {booking.eventType}
                          </div>
                          <div className="text-sm text-gray-500">
                            {booking.numberOfGuests} guests
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-semibold text-green-600">
                            Nrs.{booking.totalPrice?.toLocaleString() || "0"}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <StatusBadge status={booking.status} />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          {booking.status !== "cancelled" &&
                          booking.status !== "approved" ? (
                            <div className="flex space-x-2">
                              <button
                                onClick={() => setApproveId(booking._id)}
                                className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-md text-xs font-medium transition-colors"
                              >
                                Approve
                              </button>
                              <button
                                onClick={() => setCancelId(booking._id)}
                                className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md text-xs font-medium transition-colors"
                              >
                                Cancel
                              </button>
                            </div>
                          ) : (
                            <span className="text-gray-500 text-xs italic capitalize">
                              {booking.status}
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Mobile/Tablet Cards */}
            <div className="lg:hidden space-y-4">
              {filteredBookings.map((booking) => (
                <div
                  key={booking._id}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-blue-900">
                          {booking.customer?.name?.charAt(0) || "?"}
                        </span>
                      </div>
                      <div className="ml-3">
                        <div className="font-medium text-gray-900">
                          {booking.customer?.name || "N/A"}
                        </div>
                        <div className="text-sm text-gray-500">
                          {booking.venue?.venueName || "N/A"}
                        </div>
                      </div>
                    </div>
                    <StatusBadge status={booking.status} />
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <div className="text-xs text-gray-500 uppercase tracking-wider">
                        Date
                      </div>
                      <div className="text-sm font-medium text-gray-900">
                        {new Date(booking.bookingDate).toLocaleDateString()}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 uppercase tracking-wider">
                        Time
                      </div>
                      <div className="text-sm font-medium text-gray-900">
                        {booking.timeSlot}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 uppercase tracking-wider">
                        Event
                      </div>
                      <div className="text-sm font-medium text-gray-900 capitalize">
                        {booking.eventType}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 uppercase tracking-wider">
                        Guests
                      </div>
                      <div className="text-sm font-medium text-gray-900">
                        {booking.numberOfGuests}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-lg font-semibold text-green-600">
                      Nrs.{booking.totalPrice?.toLocaleString() || "0"}
                    </div>
                    {booking.status !== "cancelled" &&
                    booking.status !== "approved" ? (
                      <div className="flex space-x-2">
                        <button
                          onClick={() => setApproveId(booking._id)}
                          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => setCancelId(booking._id)}
                          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <span className="text-gray-500 text-sm italic capitalize">
                        {booking.status}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Confirm Cancel Modal */}
      {cancelId && (
        <ConfirmModal
          message="Are you sure you want to cancel this booking? This action cannot be undone."
          onConfirm={handleCancelConfirm}
          onCancel={() => setCancelId(null)}
          isLoading={cancelBooking.isLoading}
          type="cancel"
        />
      )}

      {/* Confirm Approve Modal */}
      {approveId && (
        <ConfirmModal
          message="Do you want to approve this booking? The customer will be notified."
          onConfirm={handleApproveConfirm}
          onCancel={() => setApproveId(null)}
          isLoading={approveBooking.isLoading}
          type="approve"
        />
      )}
    </div>
  );
};

export default OwnerBookingsPage;
