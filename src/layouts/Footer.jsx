import React from 'react'

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
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-gray-800"
                >
                  <path
                    d="M12 2L2 7V17L12 22L22 17V7L12 2Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 2V12L2 7M12 2V12L22 7M12 12V22L2 17M12 12V22L22 17"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="text-gray-900 text-lg font-semibold">Venure</span>
              </div>

              {/* Navigation Links */}
              <nav className="flex flex-wrap gap-x-6 gap-y-2 text-gray-600 text-sm">
                <a href="#overview" className="hover:text-gray-900 rounded-md p-1 -m-1 transition-colors duration-200">Overview</a>
                <a href="#features" className="hover:text-gray-900 rounded-md p-1 -m-1 transition-colors duration-200">Features</a>
                <a href="#pricing" className="hover:text-gray-900 rounded-md p-1 -m-1 transition-colors duration-200">Pricing</a>
                <a href="#careers" className="hover:text-gray-900 rounded-md p-1 -m-1 transition-colors duration-200">Careers</a>
                <a href="#help" className="hover:text-gray-900 rounded-md p-1 -m-1 transition-colors duration-200">Help</a>
                <a href="#privacy" className="hover:text-gray-900 rounded-md p-1 -m-1 transition-colors duration-200">Privacy</a>
              </nav>
            </div>

            {/* Right section: Newsletter Signup */}
            <div className="flex flex-col items-start md:items-end w-full md:w-auto">
              <label htmlFor="email-newsletter" className="text-sm font-medium text-gray-700 mb-2">
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
                  className="px-5 py-2 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 min-w-[100px]"
                >
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* Bottom section of the footer */}
          <div className="flex flex-col sm:flex-row justify-between items-center text-gray-500 text-sm">
            <p className="mb-2 sm:mb-0">&copy; 2077 Untitled UI. All rights reserved.</p>
            <div className="flex space-x-4">
              <a href="#terms" className="hover:text-gray-700 rounded-md p-1 -m-1 transition-colors duration-200">Terms</a>
              <a href="#privacy-policy" className="hover:text-gray-700 rounded-md p-1 -m-1 transition-colors duration-200">Privacy</a>
              <a href="#cookies" className="hover:text-gray-700 rounded-md p-1 -m-1 transition-colors duration-200">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
  )
}
