import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../auth/AuthProvider";
import { Crown, Phone } from "lucide-react";

import SidebarOption from "../components/SidebarOption";
import SidebarToggle from "../components/SidebarToggle";
import {
  FiHome,
  FiUser,
  FiLogOut,
  FiSettings,
  FiCalendar,
  FiBell,
  FiHelpCircle,
} from "react-icons/fi";
import { FaBuildingColumns } from "react-icons/fa6";
import { GrUserAdmin } from "react-icons/gr";
import { MdDashboard, MdAnalytics } from "react-icons/md";

const AdminSidebar = ({ sidebarOpen, setSidebarOpen, isMobile }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useContext(AuthContext);
  const [hoveredItem, setHoveredItem] = useState(null);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleNavigation = (path) => {
    navigate(path);
    // Close sidebar on mobile after navigation for better UX
    if (isMobile) {
      setSidebarOpen(false);
    }
  };

  // Navigation items with better organization
  const navigationItems = [
    {
      Icon: MdDashboard,
      title: "Dashboard",
      path: "/admin/dashboard",
    },
    {
      Icon: FiUser,
      title: "Users",
      path: "/admin/user",
    },
    {
      Icon: FaBuildingColumns,
      title: "Venues",
      path: "/admin/venue",
    },
    {
      Icon: GrUserAdmin,
      title: "Owners",
      path: "/admin/owner",
    },
    {
      Icon: FiCalendar,
      title: "Testimonial",
      path: "/admin/testimonial",
    },
    {
      Icon: Phone,
      title: "Contact",
      path: "/admin/contact",
    },
  ];

  return (
    <nav
      className={`
        h-screen flex flex-col
        bg-white/95 backdrop-blur-xl border-r border-slate-200/60 
        transition-all duration-300 ease-out shadow-lg shadow-slate-200/30
        flex-shrink-0
        ${isMobile ? "w-64" : (sidebarOpen ? "w-64" : "w-16")} 
      `}
    >
      {/* Header with subtle gradient */}
      <div className="relative p-5 border-b border-slate-100/80">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50/50 to-transparent" />
        <div className="flex items-center gap-3 cursor-pointer group transition-all duration-300">
          <div className="relative">
            <Crown
              size={28}
              className="text-rose-600 group-hover:text-rose-700 transition-colors duration-300"
            />
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-ping-once" />
          </div>

          {(sidebarOpen || isMobile) && (
            <div>
              <h1 className="text-2xl lg:text-3xl font-serif font-bold bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 bg-clip-text text-transparent group-hover:from-rose-700 group-hover:via-rose-600 group-hover:to-rose-700 transition-all duration-300">
                Venure
              </h1>
              <div className="text-xs text-slate-500 font-medium tracking-widest uppercase">
                Premium Venues
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Navigation with beautiful spacing */}
      <div className="flex-1 overflow-y-auto py-4 px-3">
        <div className="space-y-1">
          {navigationItems.map((item, index) => (
            <div
              key={item.path}
              onMouseEnter={() => (!sidebarOpen && !isMobile) && setHoveredItem(item.path)}
              onMouseLeave={() => setHoveredItem(null)}
              className="relative"
            >
              <button
                onClick={() => handleNavigation(item.path)}
                className={`
                  group w-full flex items-center gap-3 px-3 py-3 rounded-xl
                  text-sm font-medium transition-all duration-200 ease-out
                  ${
                    location.pathname === item.path
                      ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/25 scale-[1.02]"
                      : "text-slate-700 hover:bg-slate-50 hover:text-slate-900 hover:scale-[1.01]"
                  }
                  ${(!sidebarOpen && !isMobile) ? "justify-center px-2" : ""}
                `}
              >
                <item.Icon
                  className={`
                    w-5 h-5 flex-shrink-0 transition-transform duration-200
                    ${
                      location.pathname === item.path
                        ? "text-white"
                        : "text-slate-500 group-hover:text-slate-700 group-hover:scale-110"
                    }
                  `}
                />
                {(sidebarOpen || isMobile) && (
                  <span className="truncate">{item.title}</span>
                )}

                {/* Active indicator dot */}
                {location.pathname === item.path && (
                  <div className="ml-auto w-1.5 h-1.5 bg-white rounded-full opacity-80"></div>
                )}
              </button>

              {/* Beautiful tooltip - only show on desktop when collapsed */}
              {!isMobile && !sidebarOpen && hoveredItem === item.path && (
                <div className="absolute left-full top-1/2 -translate-y-1/2 ml-3 z-50">
                  <div className="bg-slate-800 text-white px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap shadow-xl shadow-slate-800/25 border border-slate-700/50">
                    {item.title}
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1">
                      <div className="w-2 h-2 bg-slate-800 rotate-45 border-l border-b border-slate-700/50"></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Footer with elegant design */}
      <div className="border-t border-slate-100/80 p-4">
        {/* User profile when expanded */}
        {(sidebarOpen || isMobile) && (
          <div className="mb-4 p-3 bg-gradient-to-br from-slate-50 to-slate-100/50 rounded-xl border border-slate-200/50 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white text-sm font-semibold shadow-lg shadow-indigo-500/25">
                {(user?.name || "A").charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-slate-800 truncate">
                  {user?.name || "Admin User"}
                </div>
                <div className="text-xs text-slate-500 truncate">
                  {user?.email || "admin@example.com"}
                </div>
              </div>
              <div className="w-2 h-2 bg-emerald-400 rounded-full shadow-sm"></div>
            </div>
          </div>
        )}

        {/* Action buttons with beautiful styling */}
        <div className="flex justify-around items-center gap-2">
          {/* Logout with attention-grabbing design */}
          <button
            onClick={handleLogout}
            className={`
              group flex items-center gap-2 px-3 py-2.5 rounded-lg
              text-red-500 hover:text-white hover:bg-gradient-to-r hover:from-red-500 hover:to-red-600
              transition-all duration-200 text-sm font-medium
              hover:scale-[1.02] active:scale-[0.98] hover:shadow-lg hover:shadow-red-500/25
              ${(!sidebarOpen && !isMobile) ? "flex-1 justify-center" : ""}
            `}
            title="Logout"
          >
            <FiLogOut className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
            {(sidebarOpen || isMobile) && <span>Logout</span>}
          </button>

          {/* Toggle with subtle styling - only show on desktop */}
          {!isMobile && (
            <SidebarToggle
              open={sidebarOpen}
              setOpen={setSidebarOpen}
              className="text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg p-2.5 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
            />
          )}
        </div>
      </div>

      {/* Subtle bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>
    </nav>
  );
};

export default AdminSidebar;