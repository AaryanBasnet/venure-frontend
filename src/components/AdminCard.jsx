// src/components/AdminCard.jsx
import React from "react";

export default function AdminCard({ title, icon, children, className }) {
  return (
    <div className={`bg-white shadow-md rounded-lg p-6 border border-gray-200 ${className}`}>
      {/* Header with optional icon and title */}
      <div className="flex items-center mb-4">
        {icon && <div className="text-indigo-600 mr-3">{icon}</div>}
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      </div>
      {/* Content area */}
      <div className="text-gray-700">{children}</div>
    </div>
  );
}
