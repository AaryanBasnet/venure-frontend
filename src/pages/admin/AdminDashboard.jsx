import React, { useState, useEffect } from "react";
import {
  FaUsers,
  FaChartLine,
  FaDollarSign,
  FaShoppingCart,
  FaCalendarCheck,
  FaUserPlus,
  FaEye,
  FaFilter,
  FaDownload,
  FaSpinner,
} from "react-icons/fa";
import {
  FiMoreVertical,
  FiArrowUp,
  FiArrowDown,
  FiBell,
  FiSearch,
} from "react-icons/fi";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import AdminCard from "../../components/AdminCard";
import { FaBuildingColumns } from "react-icons/fa6";
import { useGetCustomerCount } from "../../hooks/admin/useGetCustomerCount";
import { useGetApprovedVenuesCount } from "../../hooks/admin/useGetApprovedVenuesCount";

const AdminDashboard = () => {
  const [timeFilter, setTimeFilter] = useState("7d");
  const [isLoading, setIsLoading] = useState(false);

  const { data: customerCount } = useGetCustomerCount();
  const { data: venueCount } = useGetApprovedVenuesCount();
  console.log(venueCount);

  // Sample data - replace with real API calls
  const statsData = [
    {
      title: "Total Users",
      value: customerCount,
      change: "+12.5%",
      trend: "up",
      icon: FaUsers,
      color: "blue",
      description: "Registered users",
    },
    {
      title: "Total Revenue",
      value: "$24,680",
      change: "+8.2%",
      trend: "up",
      icon: FaDollarSign,
      color: "green",
      description: "This month",
    },
    {
      title: "Active Venues",
      value: venueCount,
      change: "+5.1%",
      trend: "up",
      icon: FaBuildingColumns,
      color: "purple",
      description: "Currently listed",
    },
    {
      title: "Today's Bookings",
      value: "23",
      change: "-2.3%",
      trend: "down",
      icon: FaCalendarCheck,
      color: "orange",
      description: "New bookings today",
    },
  ];

  const revenueData = [
    { month: "Jan", revenue: 12000, bookings: 45 },
    { month: "Feb", revenue: 15000, bookings: 52 },
    { month: "Mar", revenue: 18000, bookings: 61 },
    { month: "Apr", revenue: 22000, bookings: 73 },
    { month: "May", revenue: 19000, bookings: 68 },
    { month: "Jun", revenue: 24680, bookings: 87 },
  ];

  const venueTypeData = [
    { name: "Wedding Halls", value: 35, color: "#3B82F6" },
    { name: "Conference Rooms", value: 28, color: "#10B981" },
    { name: "Party Venues", value: 20, color: "#F59E0B" },
    { name: "Corporate Events", value: 17, color: "#EF4444" },
  ];

  const recentActivities = [
    {
      id: 1,
      type: "user",
      message: "New user registration: John Doe",
      time: "2 mins ago",
      icon: FaUserPlus,
      color: "text-blue-500",
    },
    {
      id: 2,
      type: "booking",
      message: "New booking for Grand Ballroom",
      time: "5 mins ago",
      icon: FaCalendarCheck,
      color: "text-green-500",
    },
    {
      id: 3,
      type: "venue",
      message: 'Venue "Paradise Hall" updated',
      time: "12 mins ago",
      icon: FaBuildingColumns,
      color: "text-purple-500",
    },
    {
      id: 4,
      type: "payment",
      message: "Payment received: $1,200",
      time: "18 mins ago",
      icon: FaDollarSign,
      color: "text-yellow-500",
    },
  ];

  const topVenues = [
    { name: "Grand Ballroom", bookings: 23, revenue: "$4,200", rating: 4.8 },
    { name: "Crystal Palace", bookings: 19, revenue: "$3,800", rating: 4.7 },
    { name: "Royal Gardens", bookings: 16, revenue: "$3,200", rating: 4.9 },
    { name: "Sunset Terrace", bookings: 14, revenue: "$2,800", rating: 4.6 },
    { name: "Ocean View Hall", bookings: 12, revenue: "$2,400", rating: 4.5 },
  ];

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Dashboard Overview
            </h1>
            <p className="text-gray-600 mt-1">
              Welcome back! Here's what's happening with your platform.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Search Bar */}
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Notifications */}
            <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
              <FiBell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
            </button>

            {/* Time Filter */}
            <select
              value={timeFilter}
              onChange={(e) => setTimeFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="24h">Last 24 Hours</option>
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
              <option value="90d">Last 90 Days</option>
            </select>

            {/* Refresh Button */}
            <button
              onClick={handleRefresh}
              disabled={isLoading}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              <FaSpinner
                className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`}
              />
              Refresh
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statsData.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div className={`p-3 rounded-lg bg-${stat.color}-100`}>
                <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
              </div>
              <div
                className={`flex items-center gap-1 text-sm ${
                  stat.trend === "up" ? "text-green-600" : "text-red-600"
                }`}
              >
                {stat.trend === "up" ? (
                  <FiArrowUp className="w-4 h-4" />
                ) : (
                  <FiArrowDown className="w-4 h-4" />
                )}
                {stat.change}
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
              <p className="text-sm text-gray-600 mt-1">{stat.title}</p>
              <p className="text-xs text-gray-500 mt-1">{stat.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Revenue Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Revenue Overview
              </h3>
              <p className="text-sm text-gray-600">
                Monthly revenue and booking trends
              </p>
            </div>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <FiMoreVertical className="w-4 h-4 text-gray-600" />
            </button>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e0e0e0",
                    borderRadius: "8px",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#3B82F6"
                  strokeWidth={3}
                  dot={{ fill: "#3B82F6", strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, fill: "#3B82F6" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Venue Types Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Venue Distribution
              </h3>
              <p className="text-sm text-gray-600">Breakdown by venue types</p>
            </div>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <FiMoreVertical className="w-4 h-4 text-gray-600" />
            </button>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={venueTypeData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {venueTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4">
            {venueTypeData.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <div
                  className={`w-3 h-3 rounded-full`}
                  style={{ backgroundColor: item.color }}
                ></div>
                <span className="text-sm text-gray-600">{item.name}</span>
                <span className="text-sm font-medium text-gray-900 ml-auto">
                  {item.value}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Recent Activities
              </h3>
              <p className="text-sm text-gray-600">
                Latest platform activities
              </p>
            </div>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              View All
            </button>
          </div>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <div className={`p-2 rounded-lg bg-gray-100`}>
                  <activity.icon className={`w-4 h-4 ${activity.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900">{activity.message}</p>
                  <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Venues */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Top Performing Venues
              </h3>
              <p className="text-sm text-gray-600">
                Based on bookings and revenue
              </p>
            </div>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              View All
            </button>
          </div>
          <div className="space-y-4">
            {topVenues.map((venue, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <span className="text-sm font-medium text-blue-600">
                      #{index + 1}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{venue.name}</p>
                    <p className="text-sm text-gray-600">
                      {venue.bookings} bookings
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">{venue.revenue}</p>
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-400">★</span>
                    <span className="text-sm text-gray-600">
                      {venue.rating}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
