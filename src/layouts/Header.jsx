import React, { useState, useEffect, useContext, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import ProfileDropdown from "../components/common/ProfileDropdown";
import {
  Crown,
  Sparkles,
  ArrowUpRight,
  ChevronRight,
  UserCircle2,
  Heart,
  Calendar,
  Settings,
  LogOut,
  Star,
} from "lucide-react";
import { AuthContext } from "../auth/AuthProvider";
import { useUserProfile } from "../hooks/user/useUserProfile";

const dropdownVariants = {
  hidden: {
    opacity: 0,
    y: -30,
    scale: 0.95,
    backdropFilter: "blur(0px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    backdropFilter: "blur(20px)",
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 25,
      mass: 0.8,
      staggerChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    scale: 0.95,
    backdropFilter: "blur(0px)",
    transition: {
      duration: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const menuItemVariants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
  exit: {
    opacity: 0,
    y: 10,
    scale: 0.95,
    transition: { duration: 0.3 },
  },
};

const menuItems = [
  { name: "Home", href: "/", featured: false },
  { name: "Venues", href: "/venues", featured: true },
  { name: "Services", href: "/services", featured: false },
  { name: "About", href: "/about", featured: false },
  { name: "Contact", href: "/contact", featured: false },
];

function Header() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const [scrolled, setScrolled] = useState(false);

  const { user, logout } = useContext(AuthContext);
  const { data: profileData, isLoading: profileLoading } = useUserProfile();
  const dropdownRef = useRef(null);
  const avatarBaseUrl = import.meta.env.VITE_API_BASE_URL.replace("/api", "");
  const avatarUrl = profileData?.user?.avatar
    ? `${avatarBaseUrl}${profileData.user.avatar}`
    : null;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLandingRedirect = () => {
    navigate("/");
    setMenuOpen(false);
  };

  const handleLoginRedirect = () => {
    navigate("/login");
  };

  const handleMenuItemClick = (href) => {
    navigate(href);
    setMenuOpen(false);
  };

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  return (
    <>
      {/* Backdrop blur overlay when menu is open */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            onClick={() => setMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      <motion.header
        className={`absolute top-0 left-0 w-full z-50 transition-all duration-500 ${
          scrolled || menuOpen
            ? "bg-white/95 backdrop-blur-xl shadow-lg border-b border-white/20"
            : "bg-gradient-to-b from-white/90 to-white/70 backdrop-blur-md"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {/* Top Bar */}
        <div className="flex justify-between items-center px-6 lg:px-12 py-4 lg:py-6">
          {/* Logo Section */}
          <motion.div
            onClick={handleLandingRedirect}
            className="flex items-center gap-3 cursor-pointer group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="relative">
              <Crown
                size={28}
                className="text-rose-600 group-hover:text-rose-700 transition-colors duration-300"
              />
              <motion.div
                className="absolute -top-1 -right-1 w-2 h-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
            <div>
              <h1 className="text-2xl lg:text-3xl font-serif font-bold bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 bg-clip-text text-transparent group-hover:from-rose-700 group-hover:via-rose-600 group-hover:to-rose-700 transition-all duration-300">
                Venure
              </h1>
              <div className="text-xs text-slate-500 font-medium tracking-widest uppercase">
                Premium Venues
              </div>
            </div>
          </motion.div>

          {/* Right Actions */}
          <div className="flex items-center gap-3 lg:gap-4">
            {/* Login Button */}
            {user ? (
              profileLoading ? (
                <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse" />
              ) : (
                <ProfileDropdown
                  user={profileData?.user || user}
                  logout={logout}
                  avatarUrl={
                    profileData?.user?.avatar
                      ? `${import.meta.env.VITE_API_BASE_URL.replace(
                          "/api",
                          ""
                        )}${profileData.user.avatar}`
                      : "/default-avatar.png"
                  }
                />
              )
            ) : (
              <motion.button
                onClick={handleLoginRedirect}
                className="group relative px-4 lg:px-6 py-2 lg:py-3 bg-gradient-to-r from-slate-100 to-slate-50 hover:from-rose-50 hover:to-pink-50 border border-slate-200 hover:border-rose-300 rounded-full font-semibold text-slate-700 hover:text-rose-700 transition-all duration-300 shadow-sm hover:shadow-md text-sm lg:text-base"
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="flex items-center gap-2">
                  Login
                  <ArrowUpRight
                    size={16}
                    className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300"
                  />
                </span>
              </motion.button>
            )}

            {/* <motion.button
              onClick={handleLoginRedirect}
              className="group relative px-4 lg:px-6 py-2 lg:py-3 bg-gradient-to-r from-slate-100 to-slate-50 hover:from-rose-50 hover:to-pink-50 border border-slate-200 hover:border-rose-300 rounded-full font-semibold text-slate-700 hover:text-rose-700 transition-all duration-300 shadow-sm hover:shadow-md text-sm lg:text-base"
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="flex items-center gap-2">
                Login
                <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
              </span>
            </motion.button> */}

            {/* Menu Toggle */}
            <motion.button
              onClick={toggleMenu}
              className={`relative p-3 lg:p-4 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl ${
                menuOpen
                  ? "bg-gradient-to-r from-rose-500 to-pink-600 text-white border-transparent"
                  : "bg-white/80 backdrop-blur-md border border-slate-200 text-slate-700 hover:border-rose-300 hover:text-rose-600"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              <motion.div
                animate={{ rotate: menuOpen ? 180 : 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                {menuOpen ? (
                  <IoClose size={20} />
                ) : (
                  <RxHamburgerMenu size={20} />
                )}
              </motion.div>

              {/* Ripple effect */}
              <motion.div
                className="absolute inset-0 rounded-full bg-gradient-to-r from-rose-400/20 to-pink-400/20"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: menuOpen ? 1 : 0, opacity: menuOpen ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          </div>
        </div>

        {/* Elegant Dropdown Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              variants={dropdownVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="absolute top-full left-0 w-full bg-white/95 backdrop-blur-xl shadow-2xl border-b border-slate-200/50 z-40"
            >
              {/* Decorative top border */}
              <div className="w-full h-px bg-gradient-to-r from-transparent via-rose-300/50 to-transparent"></div>

              <div className="container mx-auto px-6 lg:px-12 py-8 lg:py-12">
                {/* Menu Items Grid */}
                <motion.div
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 lg:gap-6 mb-8"
                  variants={{
                    visible: {
                      transition: {
                        staggerChildren: 0.1,
                      },
                    },
                  }}
                >
                  {menuItems.map((item, index) => (
                    <motion.button
                      key={item.name}
                      variants={menuItemVariants}
                      onClick={() => handleMenuItemClick(item.href)}
                      className={`group relative p-4 lg:p-6 rounded-2xl border transition-all duration-300 text-left overflow-hidden ${
                        item.featured
                          ? "bg-gradient-to-br from-rose-50 to-pink-50 border-rose-200 hover:border-rose-300"
                          : "bg-gradient-to-br from-slate-50 to-white border-slate-200 hover:border-slate-300"
                      }`}
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {/* Background gradient animation */}
                      <div
                        className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                          item.featured
                            ? "bg-gradient-to-r from-rose-100/50 to-pink-100/50"
                            : "bg-gradient-to-r from-slate-100/50 to-gray-100/50"
                        }`}
                      />

                      <div className="relative z-10">
                        <div className="flex items-center justify-between mb-2">
                          <h3
                            className={`text-xl lg:text-2xl font-serif font-bold transition-colors duration-300 ${
                              item.featured
                                ? "text-rose-700 group-hover:text-rose-800"
                                : "text-slate-700 group-hover:text-slate-800"
                            }`}
                          >
                            {item.name}
                          </h3>
                          {item.featured && (
                            <Sparkles size={18} className="text-rose-500" />
                          )}
                        </div>

                        <div className="flex items-center text-sm text-slate-500 group-hover:text-slate-600 transition-colors duration-300">
                          <span>Explore</span>
                          <ChevronRight
                            size={14}
                            className="ml-1 group-hover:translate-x-1 transition-transform duration-300"
                          />
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </motion.div>

                {/* Bottom CTA Section */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                  className="flex flex-col sm:flex-row items-center justify-between p-6 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-2xl text-white"
                >
                  <div className="mb-4 sm:mb-0">
                    <h4 className="text-lg font-bold mb-1">
                      Ready to book your perfect venue?
                    </h4>
                    <p className="text-slate-300 text-sm">
                      Discover premium locations for your special events.
                    </p>
                  </div>
                  <motion.button
                    onClick={() => handleMenuItemClick("/venues")}
                    className="px-6 py-3 bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Browse Venues
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
}

export default Header;
