import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../auth/AuthProvider";

import SidebarOption from "../components/SidebarOption";
import SidebarToggle from "../components/SidebarToggle";
import {
  FiHome,
  FiUser,
  FiLogOut,
  FiSettings,
  FiBarChart2,
  FiCalendar,
  FiDollarSign,
  FiMessageSquare,
  FiCamera,
  FiStar,
  FiClock,
  FiHelpCircle,
} from "react-icons/fi";
import { FaBuildingColumns } from "react-icons/fa6";
import { GrUserAdmin } from "react-icons/gr";
import { MdDashboard, MdEventAvailable, MdPayment } from "react-icons/md";
import { BiCalendarEvent } from "react-icons/bi";
import logo from "../assets/logo.png";
import useActiveVenueCount from "../hooks/owner/useGetActiveVenueCount";
import { useGetMonthlyEarningsForOwner } from "../hooks/owner/useGetMonthlyEarningForOwner";

const OwnerSidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const { user, logout } = useContext(AuthContext);
  const ownerId = user?._id;
  const {
    data: activeVenueCountData,
    isLoading: isLoadingActiveVenueCount,
    isError,
    error: activeVenueCountError,
  } = useActiveVenueCount(ownerId);

  const {
    data: monthlyEarningsData,
    isLoading: isLoadingEarnings,
    error: earningsError,
  } = useGetMonthlyEarningsForOwner();
  const currentMonthIndex = new Date().getMonth();
  const currentMonthEarnings =
    monthlyEarningsData?.[currentMonthIndex]?.totalEarnings ?? 0;

  const [hoveredItem, setHoveredItem] = useState(null);

  // Handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setSidebarOpen(false);
      }
    };

    // Set initial state
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, [setSidebarOpen]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Navigation items organized by sections for venue owners
  const navigationSections = [
    {
      title: "Overview",
      items: [
        {
          Icon: MdDashboard,
          title: "Dashboard",
          path: "/owner/dashboard",
          description: "Main overview",
        },
        {
          Icon: FiBarChart2,
          title: "Analytics",
          path: "/owner/analytics",
          description: "Performance metrics",
        },
      ],
    },
    {
      title: "Venue Management",
      items: [
        {
          Icon: FaBuildingColumns,
          title: "My Venues",
          path: "/owner/venues",
          description: "Manage your venues",
        },

        {
          Icon: FiStar,
          title: "Reviews",
          path: "/owner/reviews",
          description: "Customer feedback",
        },
      ],
    },
    {
      title: "Bookings & Revenue",
      items: [
        {
          Icon: BiCalendarEvent,
          title: "Bookings",
          path: "/owner/bookings",
          description: "Manage reservations",
        },

        {
          Icon: MdPayment,
          title: "Payments",
          path: "/owner/payments",
          description: "Revenue & payouts",
        },
      ],
    },
    {
      title: "Communication",
      items: [
        {
          Icon: FiMessageSquare,
          title: "Messages",
          path: "/owner/chat",
          description: "Customer inquiries",
        },
      ],
    },
  ];

  return (
    <>
      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Sidebar Navigation */}
      <nav
        className={`
          fixed lg:relative top-0 left-0 h-screen flex flex-col
          bg-white border-r border-gray-200 transition-all duration-300 
          shadow-lg z-50 flex-shrink-0
          ${sidebarOpen ? "w-72" : "w-20"}
        `}
      >
        {/* Header Section */}
        <div className="px-4 pt-6 pb-4 border-b border-gray-200">
          <div className="flex items-center gap-3 mb-4">
            {/* <div className="relative">
              <img
                src={logo}
                alt="logo"
                className="h-12 w-12 object-contain flex-shrink-0 rounded-lg shadow-sm border border-gray-200"
              />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
            </div> */}
            {/* User Profile Section */}
            {sidebarOpen && (
              <div className="mb-4 p-3 bg-gray-50 rounded-lg border w-full border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                    {(user?.name || "O").charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <div className="text-sm font-medium text-gray-900 truncate">
                      {user?.name || "Owner Name"}
                    </div>
                    <div className="text-xs text-gray-600 truncate">
                      {user?.email || "owner@example.com"}
                    </div>
                  </div>
                </div>

                {/* Performance indicator */}
              </div>
            )}
          </div>

          {/* Quick Stats - Only show when expanded */}
          {sidebarOpen && (
            <div className="grid grid-cols-2 gap-2 mt-4">
              <div className="bg-gray-50 rounded-lg p-2 text-center border border-gray-200">
                <div className="text-lg font-bold text-gray-900">
                  {activeVenueCountData?.data?.count}
                </div>
                <div className="text-xs text-gray-600">Active Venues</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-2 text-center border border-gray-200">
                <div className="text-lg font-bold text-blue-600">
                  Rs.{currentMonthEarnings}
                </div>
                <div className="text-xs text-gray-600">This Month</div>
              </div>
            </div>
          )}
        </div>

        {/* Navigation Sections */}
        <div className="flex-1 overflow-y-auto py-4 scrollbar-thin scrollbar-thumb-gray-300">
          {navigationSections.map((section, sectionIndex) => (
            <div key={section.title} className={sectionIndex > 0 ? "mt-6" : ""}>
              {/* Section Header */}
              {sidebarOpen && (
                <div className="px-4 mb-2">
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    {section.title}
                  </h3>
                </div>
              )}

              {/* Section Items */}
              <div className="space-y-1 px-2">
                {section.items.map((item) => (
                  <div
                    key={item.path}
                    onMouseEnter={() => setHoveredItem(item.path)}
                    onMouseLeave={() => setHoveredItem(null)}
                    className="relative"
                  >
                    <div
                      className={`
                        relative transition-all duration-200 rounded-lg mx-1 cursor-pointer
                        ${
                          location.pathname === item.path
                            ? "bg-blue-50 text-blue-600 border border-blue-200"
                            : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                        }
                      `}
                      onClick={() => navigate(item.path)}
                    >
                      <div
                        className={`flex items-center gap-3 px-3 py-3 ${
                          !sidebarOpen ? "justify-center" : ""
                        }`}
                      >
                        <item.Icon className="w-5 h-5 flex-shrink-0" />
                        {sidebarOpen && (
                          <>
                            <span className="font-medium truncate">
                              {item.title}
                            </span>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Tooltip for collapsed sidebar */}
                    {!sidebarOpen && hoveredItem === item.path && (
                      <div className="absolute left-16 top-1/2 transform -translate-y-1/2 z-50">
                        <div className="bg-gray-900 text-white px-3 py-2 rounded-lg shadow-lg whitespace-nowrap">
                          <div className="font-medium">{item.title}</div>
                          <div className="text-xs text-gray-300">
                            {item.description}
                          </div>
                          {item.badge && (
                            <div className="text-xs text-red-400 mt-1">
                              {item.badge} new
                            </div>
                          )}
                          {/* Arrow */}
                          <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1">
                            <div className="w-2 h-2 bg-gray-900 rotate-45"></div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-200 p-4">
          {/* Action Buttons */}
          <div className="flex items-center justify-between gap-2">
            {/* Settings Button */}
            {/* <button
              onClick={() => navigate("/owner/settings")}
              className={`
                flex items-center gap-2 px-3 py-2 rounded-lg
                text-gray-600 hover:text-gray-900 hover:bg-gray-100
                transition-all duration-200
                ${!sidebarOpen ? "w-full justify-center" : ""}
              `}
              title="Settings"
            >
              <FiSettings className="w-5 h-5" />
              {sidebarOpen && <span className="text-sm">Settings</span>}
            </button> */}

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className={`
                flex items-center gap-2 px-3 py-2 rounded-lg
                text-red-600 hover:text-white hover:bg-red-500
                transition-all duration-200
                ${!sidebarOpen ? "w-full justify-center" : ""}
              `}
              title="Logout"
            >
              <FiLogOut className="w-5 h-5" />
              {sidebarOpen && <span className="text-sm">Logout</span>}
            </button>

            {/* Toggle Button */}
            <SidebarToggle
              open={sidebarOpen}
              setOpen={setSidebarOpen}
              className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg p-2 transition-all duration-200"
            />
          </div>
        </div>
      </nav>
    </>
  );
};

export default OwnerSidebar;
