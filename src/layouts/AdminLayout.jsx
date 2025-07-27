import React, { useState, useEffect, useRef } from "react";
import { Outlet } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import AdminSidebar from "./AdminSidebar";

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true); // Default open on desktop
  const [isMobile, setIsMobile] = useState(false);
  const overlayRef = useRef(null);

  // Enhanced responsive handling
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);

      if (mobile) {
        setSidebarOpen(false); // Always closed on mobile initially
      } else {
        setSidebarOpen(true); // Always open on desktop initially
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Enhanced outside click handling for mobile only
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        isMobile &&
        sidebarOpen &&
        !e.target.closest("[data-sidebar-toggle]") &&
        !e.target.closest("[data-sidebar]")
      ) {
        setSidebarOpen(false);
      }
    };

    if (isMobile && sidebarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isMobile, sidebarOpen]);

  // Prevent body scroll when mobile sidebar is open
  useEffect(() => {
    if (isMobile && sidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobile, sidebarOpen]);

  // Enhanced keyboard handling
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isMobile && sidebarOpen) {
        setSidebarOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isMobile, sidebarOpen]);

  return (
    <div className="flex h-screen w-full bg-gradient-to-br from-slate-50 via-white to-slate-50 overflow-hidden">
      {/* Mobile Backdrop Overlay */}
      {isMobile && sidebarOpen && (
        <div
          ref={overlayRef}
          className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40 transition-all duration-300 ease-out"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar Container - Always render on desktop, conditionally on mobile */}
      {(!isMobile || sidebarOpen) && (
        <div
          data-sidebar="true"
          className={`
            z-50 transition-all duration-300 ease-out
            ${
              isMobile
                ? `fixed top-0 left-0 h-full transform ${
                    sidebarOpen ? "translate-x-0" : "-translate-x-full"
                  }`
                : "relative flex-shrink-0"
            }
          `}
        >
          <AdminSidebar
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
            isMobile={isMobile}
          />
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Mobile Toggle Button - Only show when sidebar is closed */}
        {isMobile && !sidebarOpen && (
          <button
            data-sidebar-toggle="true"
            onClick={() => setSidebarOpen(true)}
            className="
              fixed top-4 left-4 z-30 p-3 rounded-full
              bg-white/90 backdrop-blur-xl border border-slate-200/60
              shadow-lg shadow-slate-900/10 hover:shadow-xl hover:shadow-slate-900/15
              text-slate-600 hover:text-slate-900
              transition-all duration-300 ease-out
              hover:scale-110 active:scale-95
              focus:outline-none focus:ring-2 focus:ring-blue-500/20
            "
            aria-label="Open sidebar"
          >
            <FiMenu className="w-5 h-5" />

            {/* Animated ring */}
            <div className="absolute inset-0 rounded-full border-2 border-blue-500/0 hover:border-blue-500/20 transition-colors duration-300" />
          </button>
        )}

        {/* Content Container with improved scrolling */}
        <main className="flex-1 relative overflow-y-auto overscroll-behavior-y-contain">
          {/* Subtle scroll shadow */}
          <div className="sticky top-0 z-10 h-px bg-gradient-to-r from-transparent via-slate-200/50 to-transparent" />

          {/* Page Content */}
          <div className="min-h-full">
            <div
              className={`px-4 py-6 sm:px-6 lg:px-8 transition-all duration-300 ${
                isMobile && !sidebarOpen ? "pt-20" : "" // Add top padding when mobile toggle is visible
              }`}
            >
              <div className="mx-auto max-w-7xl">
                <Outlet />
              </div>
            </div>
          </div>

          {/* Bottom gradient fade */}
          <div className="sticky bottom-0 z-10 h-px bg-gradient-to-r from-transparent via-slate-200/30 to-transparent" />
        </main>
      </div>

      {/* Focus trap for accessibility when sidebar is open on mobile */}
      {isMobile && sidebarOpen && (
        <div
          tabIndex={0}
          onFocus={() => setSidebarOpen(false)}
          className="sr-only"
          aria-hidden="true"
        />
      )}
    </div>
  );
};

export default AdminLayout;
