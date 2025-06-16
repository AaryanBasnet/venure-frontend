import React, { useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../auth/AuthProvider";

// Import your components and icons
import SidebarOption from "../components/SidebarOption";
import SidebarToggle from "../components/SidebarToggle";
import { FiHome, FiUser, FiLogOut } from "react-icons/fi";
import { FaBuildingColumns } from "react-icons/fa6";
import { GrUserAdmin } from "react-icons/gr";
import logo from "../assets/logo.png";

// The component now accepts props from AdminLayout
const OwnerSidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useContext(AuthContext);

  // This effect now runs only ONCE on component mount to set a sensible default.
  useEffect(() => {
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array ensures this runs only once.

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      {/* Main Sidebar Navigation */}
      {/* The 'fixed' and 'md:relative' classes have been removed. 
          The sidebar is now always part of the flex layout. 
          'flex-shrink-0' is added to prevent it from shrinking.
      */}
      <nav
        className={`
          h-screen flex flex-col justify-between flex-shrink-0
          bg-white border-r-0 transition-all duration-300 shadow-lg
          ${sidebarOpen ? "w-64" : "w-20"}
        `}
      >
        {/* Top Section: Logo, User Info, and Navigation */}
        <div className="px-4 pt-4">
          <div className="flex items-center gap-3 mb-6">
            <img
              src={logo}
              alt="logo"
              className="h-10 w-10 object-contain flex-shrink-0"
            />
            {sidebarOpen && (
              <div className="overflow-hidden">
                <h1 className="text-sm font-semibold text-gray-800 whitespace-nowrap">
                  {user?.name || "Aaryan Basnet"}
                </h1>
                <p className="text-xs text-gray-500 whitespace-nowrap">Admin</p>
              </div>
            )}
          </div>

          {/* Menu Options */}
          <div className="flex flex-col gap-1">
            <SidebarOption
              Icon={FiHome}
              title="Dashboard"
              path="/admin/dashboard"
              open={sidebarOpen}
              active={location.pathname === "/admin/dashboard"}
            />
            <SidebarOption
              Icon={FiUser}
              title="Users"
              path="/admin/user"
              open={sidebarOpen}
              active={location.pathname === "/admin/user"}
            />
            <SidebarOption
              Icon={FaBuildingColumns}
              title="Venue"
              path="/admin/venue"
              open={sidebarOpen}
              active={location.pathname === "/admin/venue"}
            />
            <SidebarOption
              Icon={GrUserAdmin}
              title="Venue Owner"
              path="/admin/owner"
              open={sidebarOpen}
              active={location.pathname === "/admin/owner"}
            />
          </div>
        </div>

        {/* Bottom Section: Logout and Toggle Button */}
        <div className="px-4 pb-4 border-t-0 pt-3 flex items-center justify-between">
          <SidebarOption
            Icon={FiLogOut}
            title="Logout"
            open={sidebarOpen}
            onClick={handleLogout}
          />
          <SidebarToggle open={sidebarOpen} setOpen={setSidebarOpen} />
        </div>
      </nav>
    </>
  );
};

export default OwnerSidebar;
