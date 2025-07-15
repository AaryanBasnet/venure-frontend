import React from "react";
import useOwnerBookings from "../../hooks/owner/useOwnerBookings";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { useGetMonthlyEarningsForOwner } from "../../hooks/owner/useGetMonthlyEarningForOwner";

export default function OwnerPaymentPage() {
  const { data: bookings = [], isLoading: loadingBookings } = useOwnerBookings();
  const { data: earnings = [], isLoading: loadingEarnings } = useGetMonthlyEarningsForOwner();

  const totalBookings = bookings.length;
  const totalEarnings = earnings?.reduce((sum, month) => sum + month.totalEarnings, 0) || 0;

  return (
    <div className="p-6 space-y-6">
      {/* KPI Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 p-6 text-white shadow-lg">
          <p className="text-sm">Total Bookings</p>
          <h2 className="text-3xl font-bold">{totalBookings}</h2>
        </div>
        <div className="rounded-2xl bg-gradient-to-r from-emerald-500 to-green-600 p-6 text-white shadow-lg">
          <p className="text-sm">Yearly Earnings</p>
          <h2 className="text-3xl font-bold">Rs. {totalEarnings}</h2>
        </div>
      </div>

      {/* Bar Chart */}
      <div className="bg-white p-6 rounded-2xl shadow-md">
        <h3 className="text-lg font-semibold mb-4">Monthly Earnings</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={earnings}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="totalEarnings" fill="#4f46e5" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Bookings Table */}
      <div className="bg-white p-6 rounded-2xl shadow-md">
        <h3 className="text-lg font-semibold mb-4">Bookings & Payments</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3">Customer</th>
                <th className="p-3">Venue</th>
                <th className="p-3">Date</th>
                <th className="p-3">Total</th>
                <th className="p-3">Payment</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {!loadingBookings && bookings?.map((booking) => (
                <tr key={booking._id} className="border-t">
                  <td className="p-3">{booking.customer?.name}</td>
                  <td className="p-3">{booking.venue?.venueName}</td>
                  <td className="p-3">{new Date(booking.bookingDate).toLocaleDateString()}</td>
                  <td className="p-3">Rs. {booking.totalPrice}</td>
                  <td className="p-3">{booking.paymentDetails?.method || "N/A"}</td>
                  <td className="p-3 capitalize text-sm font-medium text-white">
                    <span
                      className={`px-2 py-1 rounded-xl ${
                        booking.status === "approved"
                          ? "bg-green-500"
                          : booking.status === "cancelled"
                          ? "bg-red-500"
                          : "bg-gray-500"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </td>
                </tr>
              ))}
              {!loadingBookings && bookings.length === 0 && (
                <tr>
                  <td colSpan="6" className="p-3 text-center text-gray-500">
                    No bookings available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
