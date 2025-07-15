import React, { useMemo } from "react";
import {
  FaCalendarCheck,
  FaMoneyBillWave,
  FaChartLine,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import useOwnerBookings from "../../hooks/owner/useOwnerBookings";
import { useGetMonthlyEarningsForOwner } from "../../hooks/owner/useGetMonthlyEarningForOwner";
import { useGetTotalBookingsForOwner } from "../../hooks/owner/useGetTotalBookingsForOwner";

const StatCard = ({ icon: Icon, title, value, color = "blue" }) => (
  <div className="bg-white rounded-xl p-5 shadow border border-gray-100 flex items-center gap-4">
    <div className={`bg-${color}-100 text-${color}-600 p-3 rounded-full`}>
      <Icon className="w-6 h-6" />
    </div>
    <div>
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
    </div>
  </div>
);

const OwnerAnalyticsPage = () => {
  const { data: totalBookings } = useGetTotalBookingsForOwner();
  const { data: monthlyEarnings } = useGetMonthlyEarningsForOwner();
  const { data: allBookings } = useOwnerBookings();

  const totalEarnings = useMemo(() => {
    return monthlyEarnings?.reduce((sum, m) => sum + m.totalEarnings, 0) ?? 0;
  }, [monthlyEarnings]);

  const mostBookedMonth = useMemo(() => {
    return monthlyEarnings?.reduce((max, m) => (m.bookingCount > max.bookingCount ? m : max), monthlyEarnings?.[0]);
  }, [monthlyEarnings]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Owner Analytics</h1>
        <p className="text-gray-600">Track your bookings and revenue across your venues.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard icon={FaCalendarCheck} title="Total Bookings" value={totalBookings ?? 0} color="blue" />
        <StatCard icon={FaMoneyBillWave} title="Total Revenue (This Year)" value={`Nrs. ${totalEarnings.toLocaleString()}`} color="green" />
        <StatCard icon={FaChartLine} title="Most Booked Month" value={mostBookedMonth?.month ?? "N/A"} color="purple" />
        <StatCard icon={FaMapMarkerAlt} title="Bookings / Month Avg" value={Math.round((totalBookings ?? 0) / 12)} color="orange" />
      </div>

      {/* Earnings Chart */}
      <div className="bg-white rounded-xl shadow p-6 border border-gray-100 mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Monthly Earnings Overview</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={monthlyEarnings}>
            <CartesianGrid stroke="#e5e7eb" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="totalEarnings" stroke="#4F46E5" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Bookings Table */}
      <div className="bg-white rounded-xl shadow p-6 border border-gray-100">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Bookings</h2>
        <div className="overflow-x-auto">
          <table className="w-full table-auto text-sm">
            <thead className="text-left bg-gray-100">
              <tr>
                <th className="p-2">Venue</th>
                <th className="p-2">Customer</th>
                <th className="p-2">Date</th>
                <th className="p-2">Time</th>
                <th className="p-2">Status</th>
                <th className="p-2">Amount</th>
              </tr>
            </thead>
            <tbody>
              {allBookings?.slice(0, 8).map((booking) => (
                <tr key={booking._id} className="border-b hover:bg-gray-50">
                  <td className="p-2">{booking.venue?.venueName}</td>
                  <td className="p-2">{booking.customer?.fullName ?? "N/A"}</td>
                  <td className="p-2">{new Date(booking.bookingDate).toLocaleDateString()}</td>
                  <td className="p-2">{booking.timeSlot}</td>
                  <td className="p-2">
                    <span
                      className={`px-2 py-1 text-xs rounded-full font-medium ${
                        booking.status === "approved"
                          ? "bg-green-100 text-green-700"
                          : booking.status === "cancelled"
                          ? "bg-red-100 text-red-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </td>
                  <td className="p-2">Nrs. {booking.totalPrice.toLocaleString()}</td>
                </tr>
              ))}
              {allBookings?.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center py-4 text-gray-500">
                    No bookings found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OwnerAnalyticsPage;
