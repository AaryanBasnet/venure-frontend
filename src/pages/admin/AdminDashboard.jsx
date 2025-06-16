import React from "react";
// import { Card, CardContent } from "@/components/ui/card";
import {
  FaUsers,
  FaChartLine,
  FaDollarSign,
  FaShoppingCart,
} from "react-icons/fa";

import AdminCard from "../../components/AdminCard";

const AdminDashboard = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
      <AdminCard title="Total Users" icon={<FaUsers size={24} />}>
        <p className="text-3xl font-bold">1,245</p>
        <p className="text-sm text-gray-500">Registered users</p>
      </AdminCard>

      <AdminCard title="New Orders" icon={<FaUsers size={24} />}>
        <p className="text-3xl font-bold">87</p>
        <p className="text-sm text-gray-500">Orders placed today</p>
      </AdminCard>

      <AdminCard title="Server Status">
        <p className="text-green-600 font-semibold">Online</p>
      </AdminCard>
    </div>
  );
};

export default AdminDashboard;
