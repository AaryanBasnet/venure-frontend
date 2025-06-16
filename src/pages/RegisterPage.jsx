import React from "react";
import RegisterForm from "../components/auth/RegisterForm";
import venuereLoginImage from "../assets/venuereLoginImage.jpg";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const navigate = useNavigate();
  const eventChangePage = (event) => {
    event.preventDefault();
    navigate("/login");
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="flex max-w-4xl w-full h-[600px] bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="hidden md:block md:w-1/2">
          <img
            src={venuereLoginImage}
            alt="register visual"
            className="w-full h-full "
          />
        </div>
        <div className="w-full md:w-1/2 p-8">
          <div className="mb-4">
            <span className="text-3xl font-playfair font-bold text-indigo-600">
              Venure
            </span>
          </div>

          <h2 className="text-2xl font-poppins font-bold text-gray-800 mb-2">
            Create your account
          </h2>

          <RegisterForm />
          <div className="my-10 font-poppins  text-sm text-center text-gray-600">
            Already have an account?{" "}
            <button
              className="text-blue-600 font-poppins  hover:underline"
              onClick={eventChangePage}
            >
              Log in
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
