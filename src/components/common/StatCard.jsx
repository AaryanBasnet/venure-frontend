import React from "react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";

export const StatCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  color = "blue",
}) => {
  const colorClasses = {
    blue: "from-blue-500 to-indigo-600",
    green: "from-emerald-500 to-green-600",
    purple: "from-purple-500 to-indigo-600",
    orange: "from-orange-500 to-red-500",
  };

  const gradientClass = colorClasses[color] || colorClasses["blue"];

  return (
    <div className="group relative overflow-hidden rounded-2xl bg-white shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
      {/* Gradient Background */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${gradientClass} opacity-5 group-hover:opacity-10 transition-opacity`}
        aria-hidden="true"
      ></div>

      {/* Content */}
      <div className="relative p-6">
        <div className="flex items-center justify-between mb-4">
          <div
            className={`p-3 rounded-xl bg-gradient-to-br ${gradientClass} shadow-lg`}
          >
            <Icon className="w-6 h-6 text-white" aria-hidden="true" />
          </div>
        </div>

        <div>
          <p className="text-sm text-gray-600 font-medium mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mb-1">{value}</p>
          <p className="text-xs text-gray-500">{subtitle}</p>
        </div>
      </div>
    </div>
  );
};
