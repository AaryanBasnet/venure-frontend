import React from "react";

export default function LoginPage() {
  return (
    <div className="flex h-screen w-full bg-gray-100">
      {/* Left section */}
      <div className="hidden md:flex flex-col justify-between w-1/2 bg-black text-white rounded-tr-[50px] rounded-br-[50px] overflow-hidden">
        <div className="flex justify-between items-center p-6">
          <p className="text-sm font-light">Selected Works</p>
          <div className="space-x-4">
            <button className="text-white hover:underline">Sign Up</button>
            <button className="bg-white text-black px-4 py-1 rounded-full font-semibold">Join Us</button>
          </div>
        </div>

        <div className="flex-1 relative">
          <img
            src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?fit=crop&w=800&q=80"
            alt="Artwork"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>

        <div className="flex items-center justify-between p-6 bg-black bg-opacity-70">
          <div className="flex items-center space-x-4">
            <img
              src="https://randomuser.me/api/portraits/men/32.jpg"
              alt="Andrew"
              className="w-12 h-12 rounded-full"
            />
            <div>
              <p className="font-semibold">Andrew.ui</p>
              <p className="text-xs text-gray-300">UI & Illustration</p>
            </div>
          </div>
          <div className="space-x-2">
            <button className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">&lt;</button>
            <button className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">&gt;</button>
          </div>
        </div>
      </div>

      {/* Right section */}
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 p-8">
        <div className="w-full max-w-md space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">UISOCIAL</h2>
            <select className="border px-2 py-1 rounded text-sm">
              <option>🇬🇧 EN</option>
              <option>🇫🇷 FR</option>
            </select>
          </div>

          <div className="space-y-1">
            <h3 className="text-3xl font-bold">Hi Designer</h3>
            <p className="text-sm text-gray-500">Welcome to UISOCIAL</p>
          </div>

          <form className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full border px-4 py-2 rounded outline-none"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full border px-4 py-2 rounded outline-none"
            />
            <div className="text-right">
              <a href="#" className="text-sm text-red-500 hover:underline">
                Forgot password ?
              </a>
            </div>
            <div className="flex items-center justify-between">
              <span className="border-t border-gray-300 w-full"></span>
              <span className="px-2 text-gray-400">or</span>
              <span className="border-t border-gray-300 w-full"></span>
            </div>
            <button
              type="button"
              className="w-full border border-gray-300 py-2 rounded flex items-center justify-center gap-2"
            >
              <img src="https://upload.wikimedia.org/wikipedia/commons/4/4f/Iconic_image_of_Google_2015_logo.svg" alt="Google" className="w-5 h-5" />
              Login with Google
            </button>
            <button
              type="submit"
              className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
            >
              Login
            </button>
          </form>

          <p className="text-center text-sm text-gray-500">
            Don’t have an account?{' '}
            <a href="#" className="text-red-500 hover:underline">Sign up</a>
          </p>

          <div className="flex justify-center gap-4 text-gray-400 mt-4">
            <a href="#" className="hover:text-black"><i className="fab fa-facebook"></i></a>
            <a href="#" className="hover:text-black"><i className="fab fa-twitter"></i></a>
            <a href="#" className="hover:text-black"><i className="fab fa-instagram"></i></a>
          </div>
        </div>
      </div>
    </div>
  );
}
