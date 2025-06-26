import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../auth/AuthProvider";

// Import your components and icons
import SidebarOption from "../components/SidebarOption";
import SidebarToggle from "../components/SidebarToggle";
import { 
  FiHome, 
  FiUser, 
  FiLogOut, 
  FiSettings,
  FiCalendar,
  FiBell,
  FiHelpCircle 
} from "react-icons/fi";
import { FaBuildingColumns } from "react-icons/fa6";
import { GrUserAdmin } from "react-icons/gr";
import { MdDashboard, MdAnalytics } from "react-icons/md";
import logo from "../assets/logo.png";

const AdminSidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useContext(AuthContext);
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
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, [setSidebarOpen]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Navigation items organized by sections
  const navigationSections = [
    {
      title: "Overview",
      items: [
        {
          Icon: MdDashboard,
          title: "Dashboard",
          path: "/admin/dashboard",
          description: "Main overview"
        },
        {
          Icon: MdAnalytics,
          title: "Analytics",
          path: "/admin/analytics",
          description: "View statistics"
        }
      ]
    },
    {
      title: "Management",
      items: [
        {
          Icon: FiUser,
          title: "Users",
          path: "/admin/user",
          description: "Manage users"
        },
        {
          Icon: FaBuildingColumns,
          title: "Venues",
          path: "/admin/venue",
          description: "Manage venues"
        },
        {
          Icon: GrUserAdmin,
          title: "Venue Owners",
          path: "/admin/owner",
          description: "Manage owners"
        },
        {
          Icon: FiCalendar,
          title: "Bookings",
          path: "/admin/bookings",
          description: "View bookings"
        }
      ]
    },
    {
      title: "System",
      items: [
        {
          Icon: FiSettings,
          title: "Settings",
          path: "/admin/settings",
          description: "System settings"
        },
        {
          Icon: FiBell,
          title: "Notifications",
          path: "/admin/notifications",
          description: "Manage alerts"
        }
      ]
    }
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
          bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900
          border-r border-slate-700 transition-all duration-300 
          shadow-2xl z-50 flex-shrink-0
          ${sidebarOpen ? "w-72" : "w-20"}
        `}
      >
        {/* Header Section */}
        <div className="px-4 pt-6 pb-4 border-b border-slate-700">
          <div className="flex items-center gap-3 mb-4">
            <div className="relative">
              <img
                src={logo}
                alt="logo"
                className="h-12 w-12 object-contain flex-shrink-0 rounded-lg shadow-lg"
              />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-slate-900"></div>
            </div>
            {sidebarOpen && (
              <div className="overflow-hidden">
                <h1 className="text-lg font-bold text-white whitespace-nowrap">
                  {user?.name || "Admin Panel"}
                </h1>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <p className="text-sm text-slate-300 whitespace-nowrap">
                    Administrator
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Quick Stats - Only show when expanded */}
          {sidebarOpen && (
            <div className="grid grid-cols-2 gap-2 mt-4">
              <div className="bg-slate-800 rounded-lg p-2 text-center border border-slate-600">
                <div className="text-lg font-bold text-blue-400">24</div>
                <div className="text-xs text-slate-300">Active Users</div>
              </div>
              <div className="bg-slate-800 rounded-lg p-2 text-center border border-slate-600">
                <div className="text-lg font-bold text-green-400">12</div>
                <div className="text-xs text-slate-300">New Bookings</div>
              </div>
            </div>
          )}
        </div>

        {/* Navigation Sections */}
        <div className="flex-1 overflow-y-auto py-4 scrollbar-thin scrollbar-thumb-slate-600">
          {navigationSections.map((section, sectionIndex) => (
            <div key={section.title} className={sectionIndex > 0 ? "mt-6" : ""}>
              {/* Section Header */}
              {sidebarOpen && (
                <div className="px-4 mb-2">
                  <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
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
                    <SidebarOption
                      Icon={item.Icon}
                      title={item.title}
                      path={item.path}
                      open={sidebarOpen}
                      active={location.pathname === item.path}
                      className={`
                        relative transition-all duration-200 rounded-lg mx-1
                        ${location.pathname === item.path 
                          ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25' 
                          : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                        }
                        ${!sidebarOpen ? 'justify-center' : ''}
                      `}
                    />
                    
                    {/* Tooltip for collapsed sidebar */}
                    {!sidebarOpen && hoveredItem === item.path && (
                      <div className="absolute left-16 top-1/2 transform -translate-y-1/2 z-50">
                        <div className="bg-slate-800 text-white px-3 py-2 rounded-lg shadow-lg border border-slate-600 whitespace-nowrap">
                          <div className="font-medium">{item.title}</div>
                          <div className="text-xs text-slate-300">{item.description}</div>
                          {/* Arrow */}
                          <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1">
                            <div className="w-2 h-2 bg-slate-800 border-l border-b border-slate-600 rotate-45"></div>
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
        <div className="border-t border-slate-700 p-4">
          {/* User Profile Section */}
          {sidebarOpen && (
            <div className="mb-4 p-3 bg-slate-800 rounded-lg border border-slate-600">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                  {(user?.name || "A").charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 overflow-hidden">
                  <div className="text-sm font-medium text-white truncate">
                    {user?.name || "Aaryan Basnet"}
                  </div>
                  <div className="text-xs text-slate-400 truncate">
                    {user?.email || "admin@example.com"}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center justify-between gap-2">
            {/* Help Button */}
            <button
              className={`
                flex items-center gap-2 px-3 py-2 rounded-lg
                text-slate-300 hover:text-white hover:bg-slate-700
                transition-all duration-200
                ${!sidebarOpen ? 'w-full justify-center' : ''}
              `}
              title="Help & Support"
            >
              <FiHelpCircle className="w-5 h-5" />
              {sidebarOpen && <span className="text-sm">Help</span>}
            </button>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className={`
                flex items-center gap-2 px-3 py-2 rounded-lg
                text-red-400 hover:text-white hover:bg-red-600
                transition-all duration-200
                ${!sidebarOpen ? 'w-full justify-center' : ''}
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
              className="text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg p-2 transition-all duration-200"
            />
          </div>
        </div>
      </nav>
    </>
  );
};

export default AdminSidebar;