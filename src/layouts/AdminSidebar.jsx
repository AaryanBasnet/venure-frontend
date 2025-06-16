import React, { useContext, useEffect, useState } from "react";
import SidebarOption from "../components/SidebarOption";
import SidebarToggle from "../components/SidebarToggle";
import {
  FiUser,
  FiHome,
  
  FiLogOut,
} from "react-icons/fi";
import { FaBuildingColumns } from "react-icons/fa6";
import { GrUserAdmin } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../auth/AuthProvider";
import logo from "../assets/logo.png"; // 🔄 Add your logo here

const AdminSidebar = () => {
  const [open, setOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    const handleResize = () => {
      setIsMobile(mediaQuery.matches);
      if (mediaQuery.matches) setOpen(false);
    };
    handleResize();
    mediaQuery.addEventListener("change", handleResize);
    return () => mediaQuery.removeEventListener("change", handleResize);
  }, []);

  return (
    <nav
      className={`fixed md:relative z-50 top-0 left-0 h-screen flex flex-col justify-between bg-white border-r-0 transition-all duration-300 shadow-sm ${
        open ? "w-[240px]" : "w-[72px]"
      }`}
    >
      {/* Top: Logo + Admin Info */}
      <div className="px-4 pt-4">
        <div className="flex items-center gap-3">
          <img src={logo} alt="logo" className="h-10 w-10 object-contain" />
          {open && (
            <div>
              <h1 className="text-sm font-semibold text-gray-800">Aaryan Basnet</h1>
              <p className="text-xs text-gray-500">Admin</p>
            </div>
          )}
        </div>

        {/* Menu */}
        <div className="mt-6 flex flex-col gap-1">
          <SidebarOption Icon={FiHome} title="Dashboard" path="/admin/dashboard" open={open} />
          <SidebarOption Icon={FiUser} title="Users" path="/admin/user" open={open} />
          <SidebarOption Icon={FaBuildingColumns} title="Venue" path="/admin/adminVenuePage" open={open} />
          <SidebarOption Icon={GrUserAdmin} title="Venue Owner" path="/admin/adminVenueOwner" open={open} />
        </div>
      </div>

      {/* Bottom: Logout + Toggle */}
      <div className="px-4 pb-4 b- border-t-0 pt-3 flex items-center justify-between">
        <SidebarOption
          Icon={FiLogOut}
          title="Logout"
          path="#"
          open={open}
          onClick={() => {
            logout();
            navigate("/login");
          }}
        />
        <SidebarToggle open={open} setOpen={setOpen} isMobile={isMobile} />
      </div>
    </nav>
  );
};

export default AdminSidebar;
