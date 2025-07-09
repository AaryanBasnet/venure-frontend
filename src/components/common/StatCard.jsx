
import React from "react";

export const  StatCard = ({ title, value, subtitle, icon, trend }) => (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow ">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
        </div>
        <div className="text-3xl text-blue-600">{icon}</div>
      </div>
      {trend && (
        <div className="mt-4 flex items-center">
          <span
            className={`text-sm ${
              trend > 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {trend > 0 ? "↗" : "↘"} {Math.abs(trend)}%
          </span>
          <span className="text-sm text-gray-500 ml-1">from last month</span>
        </div>
      )}
    </div>
  );