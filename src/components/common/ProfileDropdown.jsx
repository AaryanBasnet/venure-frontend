import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  UserCircle2,
  Calendar,
  Heart,
  Settings,
  LogOut,
} from "lucide-react";

const dropdownVariants = {
  initial: { opacity: 0, y: -10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
  transition: { duration: 0.3 },
};

const ProfileDropdown = ({ user, logout }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleNavigate = (path) => {
    navigate(path);
    setOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="p-1.5 rounded-full border border-slate-200 bg-white hover:border-rose-300 transition-all shadow-md hover:shadow-lg"
      >
        <img
          src={user.avatar || "/default-avatar.png"}
          alt="User avatar"
          className="w-8 h-8 rounded-full object-cover"
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            key="dropdown"
            variants={dropdownVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-xl shadow-xl z-50"
          >
            <button
              onClick={() => handleNavigate("/profile")}
              className="w-full flex items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
            >
              <UserCircle2 size={16} /> View Profile
            </button>
            <button
              onClick={() => handleNavigate("/bookings")}
              className="w-full flex items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
            >
              <Calendar size={16} /> My Bookings
            </button>
            <button
              onClick={() => handleNavigate("/favorites")}
              className="w-full flex items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
            >
              <Heart size={16} /> Favorites
            </button>
            <button
              onClick={() => handleNavigate("/settings")}
              className="w-full flex items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
            >
              <Settings size={16} /> Settings
            </button>
            <hr className="my-1 border-slate-100" />
            <button
              onClick={() => {
                logout();
                setOpen(false);
              }}
              className="w-full flex items-center gap-2 px-4 py-2 text-sm text-rose-600 hover:bg-rose-50"
            >
              <LogOut size={16} /> Logout
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProfileDropdown;
