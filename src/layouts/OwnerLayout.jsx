import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import OwnerSidebar from "./OwnerSidebar";
import { Menu } from "lucide-react";

const OwnerLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Adjust sidebar visibility based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };
    handleResize(); // On mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Sidebar */}
      <OwnerSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navbar for Mobile */}
        <header className="flex items-center justify-between p-4 bg-white border-b shadow-sm lg:hidden">
          <button onClick={() => setSidebarOpen(true)}>
            <Menu className="w-6 h-6 text-gray-700" />
          </button>
          <h1 className="text-lg font-semibold text-gray-800">Owner Panel</h1>
        </header>

        {/* Outlet Content */}
        <main className="flex-1 overflow-y-auto p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default OwnerLayout;
