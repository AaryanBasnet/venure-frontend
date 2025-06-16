import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const SidebarOption = ({ Icon, title, path, open, onClick }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = location.pathname === path;

  return (
    <button
      onClick={() => {
        if (onClick) onClick();
        else navigate(path);
      }}
      className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors w-full ${
        isActive
          ? "bg-indigo-100 text-indigo-600"
          : "text-gray-600 hover:bg-gray-100"
      }`}
    >
      <Icon className="text-lg" />
      {open && <span>{title}</span>}
    </button>
  );
};

export default SidebarOption;
