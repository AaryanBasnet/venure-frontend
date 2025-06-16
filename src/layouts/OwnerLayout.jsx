import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";

const OwnerLayout = () => {
  // We still manage the state here, which is good practice.
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Set the initial state of the sidebar based on screen size.
  useEffect(() => {
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  }, []);

  return (
    // A simple flex container is now all that's needed for a robust layout.
    <div className="flex h-screen bg-gray-50">
      {/* The sidebar's width will be controlled by its own state,
          and it will always be part of the flex layout. */}
      <AdminSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* The main content area simply takes up the remaining space and handles its own scrolling. */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-4 sm:p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default OwnerLayout;
