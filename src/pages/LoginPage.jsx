import React from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/auth/LoginForm";

export default function LoginPage() {
  const navigate = useNavigate();

  const eventChangePage = (event) => {
    event.preventDefault();
    navigate("/register");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="flex max-w-4xl w-full bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="w-full md:w-1/2 p-8">
          {/* Logo */}
          <div className="mb-6">
            <span className="text-3xl font-playfair font-bold text-indigo-600">
              Venure
            </span>
          </div>

          <LoginForm />

          <div className="my-10 text-sm font-poppins  text-center text-gray-600">
            Don’t have an account?{" "}
            <button
              className="text-blue-600 font-poppins  hover:underline"
              onClick={eventChangePage}
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
