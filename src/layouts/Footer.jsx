import { Crown } from "lucide-react";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Footer() {
  return (
    <footer className="bg-white py-8 px-4 sm:px-6 lg:px-8 shadow-md rounded-lg  ">
      <div className=" mx-auto">
        {/* Top section of the footer */}
        <div className="flex flex-col md:flex-row md:items-start justify-between border-b border-gray-200 pb-6 mb-6">
          {/* Left section: Logo and Navigation Links */}
          <div className="flex flex-col items-start mb-6 md:mb-0">
            {/* Logo */}
            <div className="flex items-center space-x-2 mb-6">
              {/* Simple cube SVG for the logo */}
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
              <span className="text-gray-900 text-lg font-semibold">
                Venure
              </span>
            </div>

            {/* Navigation Links */}
            <nav className="flex flex-wrap gap-x-6 gap-y-2 text-gray-600 text-sm">
              <a
                href="#top-venues"
                className="hover:text-gray-900 rounded-md p-1 -m-1 transition-colors duration-200"
              >
                Top Venues
              </a>
              <a
                href="#how-it-works"
                className="hover:text-gray-900 rounded-md p-1 -m-1 transition-colors duration-200"
              >
                How It Works
              </a>
              <a
                href="#my-bookings"
                className="hover:text-gray-900 rounded-md p-1 -m-1 transition-colors duration-200"
              >
                My Bookings
              </a>
              <a
                href="#favorites"
                className="hover:text-gray-900 rounded-md p-1 -m-1 transition-colors duration-200"
              >
                Favorites
              </a>
              <a
                href="#contact"
                className="hover:text-gray-900 rounded-md p-1 -m-1 transition-colors duration-200"
              >
                Contact Us
              </a>
              <a
                href="#terms"
                className="hover:text-gray-900 rounded-md p-1 -m-1 transition-colors duration-200"
              >
                Terms & Policies
              </a>
            </nav>
          </div>

          {/* Right section: Newsletter Signup */}
          <div className="flex flex-col items-start md:items-end w-full md:w-auto">
            <label
              htmlFor="email-newsletter"
              className="text-sm font-medium text-gray-700 mb-2"
            >
              Join our newsletter
            </label>
            <div className="flex flex-col sm:flex-row w-full max-w-sm gap-2">
              <input
                type="email"
                id="email-newsletter"
                placeholder="Enter your email"
                className="flex-grow px-4 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-rose-600 to-pink-700 text-white font-semibold rounded-lg shadow-md hover:from-rose-700 hover:to-pink-800 transition-all duration-300 min-w-[120px]"
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom section of the footer */}
        <div className="flex flex-col sm:flex-row justify-between items-center text-gray-500 text-sm">
          <p className="mb-2 sm:mb-0">
            &copy; 2077 Untitled UI. All rights reserved.
          </p>
          <div className="flex gap-2">
            <a
              href="#terms"
              className="hover:text-gray-700 rounded-md p-1 -m-1 transition-colors duration-200"
            >
              Terms
            </a>
            <a
              href="#privacy-policy"
              className="hover:text-gray-700 rounded-md p-1 -m-1 transition-colors duration-200"
            >
              Privacy
            </a>
            <a
              href="#cookies"
              className="hover:text-gray-700 rounded-md p-1 -m-1 transition-colors duration-200"
            >
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
