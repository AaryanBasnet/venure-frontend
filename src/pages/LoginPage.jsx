import React from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="flex max-w-4xl w-full bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="w-full md:w-1/2 p-8">
          {/* Logo */}
          <div className="mb-6">
            <span className="text-3xl font-bold text-indigo-600">Venure</span>
          </div>

          {/* Heading */}
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Sign in to your account
          </h2>

          {/* Form */}
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                type="email"
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center text-sm">
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-indigo-600"
                />
                <span className="ml-2 text-gray-700">Remember me</span>
              </label>
              <a href="#" className="text-sm text-indigo-600 hover:underline">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition"
            >
              Sign in
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 border-t border-gray-300 relative">
            <span className="absolute left-1/2 -top-3 transform -translate-x-1/2 bg-white px-2 text-sm text-gray-500">
              Or continue with
            </span>
          </div>

          {/* OAuth buttons */}
          <div className="flex space-x-4">
            <button className="flex-1 flex items-center justify-center border border-gray-300 rounded-md py-2 hover:bg-gray-50">
              <img
                src="https://www.svgrepo.com/show/355037/google.svg"
                alt="Google"
                className="w-5 h-5 mr-2"
              />
              Google
            </button>
            <button className="flex-1 flex items-center justify-center border border-gray-300 rounded-md py-2 hover:bg-gray-50">
              <img
                src="https://www.svgrepo.com/show/475647/facebook-color.svg"
                alt="Facebook"
                className="w-5 h-5 mr-2"
              />
              Facebook
            </button>
          </div>
          <div className="my-10 text-sm text-center text-gray-600">
            Don’t have an account?{" "}
            <button
              className="text-blue-600 hover:underline"
              onClick={() => navigate("/register")}
            >
              Sign up
            </button>
          </div>
        </div>

        <div className="hidden md:block md:w-1/2">
          <img
            src="src/assets/venuereLoginImage.jpg"
            alt="wedding image"
            className="w-full h-[600px] object-cover"
          />
        </div>
      </div>
    </div>
  );
}
