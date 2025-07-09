import React, { useState } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Heart,
  Clock,
  Edit3,
  Star,
  Settings,
  Shield,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  useUserProfile,
  useUpdateUserProfile,
} from "../../hooks/user/useUserProfile";
import EditProfileModal from "../../components/modal/EditProfileModal";

const ProfilePage = () => {
  const { data, isLoading, isError } = useUserProfile();
  const updateMutation = useUpdateUserProfile();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-rose-50/30">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-rose-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600 text-lg font-light">
            Loading your profile...
          </p>
        </div>
      </div>
    );
  }

  if (isError || !data?.user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-rose-50/30">
        <p className="text-slate-600 text-lg">
          Unable to load profile. Please try again.
        </p>
      </div>
    );
  }

  const user = data.user;

  const handleNavigate = (path) => {
    navigate(path);
  };

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleUpdateProfile = async (formData) => {
    try {
      await updateMutation.mutateAsync(formData);
      setIsModalOpen(false);
    } catch (error) {
      // Optionally show error toast here
    }
  };

  // Fix avatar URL base:
  // Remove '/api' from base URL to correctly serve static uploads
  const avatarBaseUrl = import.meta.env.VITE_API_BASE_URL.replace("/api", "");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-rose-50/30 relative overflow-hidden">
      {/* Elegant background patterns */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-rose-300 to-pink-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-300 to-indigo-400 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 px-6 py-16 max-w-6xl mx-auto animate-fade-in">
        {/* Header Section */}
        <div className="text-center mb-16 animate-slide-up">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-gradient-to-r from-rose-100/80 to-pink-100/80 rounded-full border border-rose-200/50 shadow-sm animate-scale-in">
            <Star className="w-5 h-5 text-rose-500" />
            <span className="text-sm font-semibold text-rose-700 tracking-wide">
              VERIFIED MEMBER
            </span>
          </div>

          <h1 className="text-4xl lg:text-6xl font-serif leading-[0.9] text-slate-800 mb-4">
            Your{" "}
            <span className="relative inline-block">
              <span className="relative z-10 bg-gradient-to-r from-rose-600 via-pink-600 to-purple-700 bg-clip-text text-transparent font-bold">
                Profile
              </span>
              <div className="absolute bottom-2 left-0 w-full h-3 bg-gradient-to-r from-rose-200/50 to-pink-200/50 -z-10 animate-underline"></div>
            </span>
          </h1>

          <p className="text-lg text-slate-600 font-light max-w-md mx-auto leading-relaxed">
            Manage your exclusive Venure experience with elegance and style
          </p>
        </div>

        {/* Main Profile Section */}
        <div className="bg-white/70 backdrop-blur-sm border border-white/50 rounded-3xl p-8 lg:p-12 mb-12 shadow-xl animate-slide-up-delayed">
          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
            {/* Avatar Section */}
            <div className="relative animate-scale-in-delayed">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-rose-400 to-pink-500 p-1 shadow-2xl">
                <img
                  src={`${avatarBaseUrl}${user.avatar}`}
                  alt={`${user.name}'s avatar`}
                  className="w-full h-full rounded-full object-cover bg-white"
                  onError={(e) => {
                    e.target.src =
                      "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDE1MCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iNzUiIGN5PSI3NSIgcj0iNzUiIGZpbGw9IiNmM2Y0ZjYiLz48Y2lyY2xlIGN4PSI3NSIgY3k9IjY1IiByPSIyNSIgZmlsbD0iIzY2NzI4MCIvPjxwYXRoIGQ9Ik0yNSAxMjVjMC0yNy42MTMgMjIuMzg3LTUwIDUwLTUwczUwIDIyLjM4NyA1MCA1MHYyNUgyNXYtMjV6IiBmaWxsPSIjNjY3MjgwIi8+PC9zdmc+";
                  }}
                />
              </div>
              <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-rose-500 to-pink-600 rounded-full p-2 shadow-lg">
                <Star className="w-5 h-5 text-white" />
              </div>
            </div>

            {/* User Info */}
            <div className="flex-1 text-center lg:text-left">
              <h2 className="text-3xl lg:text-4xl font-serif text-slate-800 mb-3">
                {user.name}
              </h2>
              <div className="flex items-center justify-center lg:justify-start gap-2 mb-3">
                <Mail className="w-5 h-5 text-slate-500" />
                <span className="text-slate-600">{user.email}</span>
              </div>
              <div className="flex items-center justify-center lg:justify-start gap-2">
                <Calendar className="w-5 h-5 text-slate-500" />
                <span className="text-slate-500 text-sm">
                  Member since{" "}
                  {new Date(user.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
            </div>

            {/* Edit Button */}
            <button
              onClick={handleOpenModal}
              className="px-6 py-3 border-2 border-slate-300 text-slate-700 font-semibold rounded-xl hover:border-rose-400 hover:text-rose-600 transition-all duration-300 backdrop-blur-sm flex items-center gap-2 hover:scale-105 hover:-translate-y-0.5 active:scale-95"
            >
              <Edit3 className="w-5 h-5" />
              Edit Profile
            </button>
          </div>
        </div>

        {/* Contact & Actions Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12 animate-slide-up-delayed">
          {/* Contact Information */}
          <div className="bg-white/70 backdrop-blur-sm border border-white/50 rounded-2xl p-8 shadow-lg">
            <h3 className="text-2xl font-serif text-slate-800 mb-6 flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-rose-100 to-pink-100 rounded-xl flex items-center justify-center">
                <User className="w-5 h-5 text-rose-600" />
              </div>
              Contact Details
            </h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-slate-50/50 rounded-xl hover:bg-slate-50/70 transition-colors">
                <Phone className="w-5 h-5 text-slate-500" />
                <div>
                  <p className="text-slate-500 text-sm">Phone</p>
                  <p className="text-slate-800 font-medium">{user.phone}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-slate-50/50 rounded-xl hover:bg-slate-50/70 transition-colors">
                <MapPin className="w-5 h-5 text-slate-500" />
                <div>
                  <p className="text-slate-500 text-sm">Address</p>
                  <p className="text-slate-800 font-medium">{user.address}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white/70 backdrop-blur-sm border border-white/50 rounded-2xl p-8 shadow-lg">
            <h3 className="text-2xl font-serif text-slate-800 mb-6 flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-rose-100 to-pink-100 rounded-xl flex items-center justify-center">
                <Settings className="w-5 h-5 text-rose-600" />
              </div>
              Quick Actions
            </h3>
            <div className="space-y-4">
              <button
                onClick={() => handleNavigate("/favorites")}
                className="w-full bg-gradient-to-r from-rose-600 to-pink-700 text-white py-4 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3 hover:scale-105 hover:-translate-y-0.5 active:scale-95"
              >
                <Heart className="w-5 h-5" />
                View Favorites
              </button>
              <button
                onClick={() => handleNavigate("/my-bookings")}
                className="w-full border-2 border-slate-300 text-slate-700 py-4 px-6 rounded-xl font-semibold hover:border-rose-400 hover:text-rose-600 transition-all duration-300 flex items-center justify-center gap-3 hover:scale-105 hover:-translate-y-0.5 active:scale-95"
              >
                <Clock className="w-5 h-5" />
                Booking History
              </button>
              <button
                onClick={() => handleNavigate("/settings")}
                className="w-full border-2 border-slate-300 text-slate-700 py-4 px-6 rounded-xl font-semibold hover:border-rose-400 hover:text-rose-600 transition-all duration-300 flex items-center justify-center gap-3 hover:scale-105 hover:-translate-y-0.5 active:scale-95"
              >
                <Settings className="w-5 h-5" />
                Account Settings
              </button>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-gradient-to-r from-rose-50/80 to-pink-50/80 backdrop-blur-sm border border-rose-200/50 rounded-2xl p-8 shadow-lg mb-12 animate-slide-up-delayed">
          <h3 className="text-2xl font-serif text-slate-800 mb-8 text-center">
            Your Venure Journey
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center hover:scale-105 transition-transform cursor-pointer">
              <div className="text-4xl font-bold text-rose-600 mb-2">
                {user.totalBookings}
              </div>
              <div className="text-slate-600 font-medium">Total Bookings</div>
            </div>
            <div className="text-center hover:scale-105 transition-transform cursor-pointer">
              <div className="text-4xl font-bold text-rose-600 mb-2">
                {user.favoriteVenues}
              </div>
              <div className="text-slate-600 font-medium">Favorite Venues</div>
            </div>
            <div className="text-center hover:scale-105 transition-transform cursor-pointer">
              <div className="flex items-center justify-center gap-2 mb-2">
                <span className="text-4xl font-bold text-rose-600">4.9</span>
                <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
              </div>
              <div className="text-slate-600 font-medium">Your Rating</div>
            </div>
          </div>
        </div>

        {/* Premium Benefits */}
        <div className="bg-white/70 backdrop-blur-sm border border-white/50 rounded-2xl p-8 shadow-lg animate-slide-up-delayed">
          <h3 className="text-2xl font-serif text-slate-800 mb-8 text-center flex items-center justify-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-rose-100 to-pink-100 rounded-xl flex items-center justify-center">
              <Shield className="w-5 h-5 text-rose-600" />
            </div>
            Platform Features
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-slate-50/50 rounded-xl hover:bg-slate-50/70 transition-all duration-300 hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-br from-rose-100 to-pink-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-rose-600" />
              </div>
              <h4 className="text-slate-800 font-semibold mb-2">
                Easy Booking
              </h4>
              <p className="text-slate-600 text-sm">
                Quick and simple venue booking process
              </p>
            </div>
            <div className="text-center p-6 bg-slate-50/50 rounded-xl hover:bg-slate-50/70 transition-all duration-300 hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-br from-rose-100 to-pink-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-rose-600" />
              </div>
              <h4 className="text-slate-800 font-semibold mb-2">
                Quality Venues
              </h4>
              <p className="text-slate-600 text-sm">
                Curated selection of premium venues
              </p>
            </div>
            <div className="text-center p-6 bg-slate-50/50 rounded-xl hover:bg-slate-50/70 transition-all duration-300 hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-br from-rose-100 to-pink-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-rose-600" />
              </div>
              <h4 className="text-slate-800 font-semibold mb-2">
                Save Favorites
              </h4>
              <p className="text-slate-600 text-sm">
                Keep track of your favorite venues
              </p>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <EditProfileModal
          user={user}
          onClose={handleCloseModal}
          onSubmit={handleUpdateProfile}
          isLoading={updateMutation.isLoading}
        />
      )}
    </div>
  );
};

export default ProfilePage;
