import React, { useEffect, useState } from 'react';
import { User, Mail, Phone, MapPin, Calendar, Heart, Clock, Edit3, Crown, Star, Settings, Shield } from 'lucide-react';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        setUser({
          id: 1,
          name: "Alexander Sterling",
          email: "alexander.sterling@venure.com",
          phone: "+1 (555) 123-4567",
          address: "Manhattan, New York, NY",
          avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
          createdAt: "2023-06-15T10:30:00Z",

          totalBookings: 12,
          favoriteVenues: 5,
          lastLogin: "2024-01-15T14:20:00Z"
        });
        setLoading(false);
      } catch (error) {
        console.error('Error loading user:', error);
        setLoading(false);
      }
    };
    
    fetchUser();
  }, []);

  const handleNavigation = (path) => {
    console.log(`Navigating to: ${path}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-rose-50/30 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-rose-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600 text-lg font-light">Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-rose-50/30 flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-600 text-lg">Unable to load profile. Please try again.</p>
        </div>
      </div>
    );
  }

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
            Your <span className="relative inline-block">
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
                  src={user.avatar}
                  alt={`${user.name}'s avatar`}
                  className="w-full h-full rounded-full object-cover bg-white"
                  onError={(e) => {
                    e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDE1MCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iNzUiIGN5PSI3NSIgcj0iNzUiIGZpbGw9IiNmM2Y0ZjYiLz48Y2lyY2xlIGN4PSI3NSIgY3k9IjY1IiByPSIyNSIgZmlsbD0iIzY2NzI4MCIvPjxwYXRoIGQ9Ik0yNSAxMjVjMC0yNy42MTMgMjIuMzg3LTUwIDUwLTUwczUwIDIyLjM4NyA1MCA1MHYyNUgyNXYtMjV6IiBmaWxsPSIjNjY3MjgwIi8+PC9zdmc+';
                  }}
                />
              </div>
              <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-rose-500 to-pink-600 rounded-full p-2 shadow-lg">
                <Star className="w-5 h-5 text-white" />
              </div>
            </div>

            {/* User Info */}
            <div className="flex-1 text-center lg:text-left">
              <h2 className="text-3xl lg:text-4xl font-serif text-slate-800 mb-3">{user.name}</h2>
              <div className="flex items-center justify-center lg:justify-start gap-2 mb-3">
                <Mail className="w-5 h-5 text-slate-500" />
                <span className="text-slate-600">{user.email}</span>
              </div>
              <div className="flex items-center justify-center lg:justify-start gap-2">
                <Calendar className="w-5 h-5 text-slate-500" />
                <span className="text-slate-500 text-sm">
                  Member since {new Date(user.createdAt).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </span>
              </div>
            </div>

            {/* Edit Button */}
            <button
              onClick={() => handleNavigation('/profile/edit')}
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
                onClick={() => handleNavigation('/favorites')}
                className="w-full bg-gradient-to-r from-rose-600 to-pink-700 text-white py-4 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3 hover:scale-105 hover:-translate-y-0.5 active:scale-95"
              >
                <Heart className="w-5 h-5" />
                View Favorites
              </button>
              <button
                onClick={() => handleNavigation('/bookings')}
                className="w-full border-2 border-slate-300 text-slate-700 py-4 px-6 rounded-xl font-semibold hover:border-rose-400 hover:text-rose-600 transition-all duration-300 flex items-center justify-center gap-3 hover:scale-105 hover:-translate-y-0.5 active:scale-95"
              >
                <Clock className="w-5 h-5" />
                Booking History
              </button>
              <button
                onClick={() => handleNavigation('/settings')}
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
          <h3 className="text-2xl font-serif text-slate-800 mb-8 text-center">Your Venure Journey</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center hover:scale-105 transition-transform cursor-pointer">
              <div className="text-4xl font-bold text-rose-600 mb-2">{user.totalBookings}</div>
              <div className="text-slate-600 font-medium">Total Bookings</div>
            </div>
            <div className="text-center hover:scale-105 transition-transform cursor-pointer">
              <div className="text-4xl font-bold text-rose-600 mb-2">{user.favoriteVenues}</div>
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
              <h4 className="text-slate-800 font-semibold mb-2">Easy Booking</h4>
              <p className="text-slate-600 text-sm">Quick and simple venue booking process</p>
            </div>
            <div className="text-center p-6 bg-slate-50/50 rounded-xl hover:bg-slate-50/70 transition-all duration-300 hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-br from-rose-100 to-pink-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-rose-600" />
              </div>
              <h4 className="text-slate-800 font-semibold mb-2">Quality Venues</h4>
              <p className="text-slate-600 text-sm">Curated selection of premium venues</p>
            </div>
            <div className="text-center p-6 bg-slate-50/50 rounded-xl hover:bg-slate-50/70 transition-all duration-300 hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-br from-rose-100 to-pink-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-rose-600" />
              </div>
              <h4 className="text-slate-800 font-semibold mb-2">Save Favorites</h4>
              <p className="text-slate-600 text-sm">Keep track of your favorite venues</p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slide-up {
          from { 
            opacity: 0;
            transform: translateY(30px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes scale-in {
          from { 
            opacity: 0;
            transform: scale(0.8);
          }
          to { 
            opacity: 1;
            transform: scale(1);
          }
        }
        
        @keyframes underline {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
        
        .animate-slide-up {
          animation: slide-up 0.8s ease-out;
        }
        
        .animate-slide-up-delayed {
          animation: slide-up 0.8s ease-out 0.2s both;
        }
        
        .animate-scale-in {
          animation: scale-in 0.6s ease-out 0.6s both;
        }
        
        .animate-scale-in-delayed {
          animation: scale-in 0.8s ease-out 0.8s both;
        }
        
        .animate-underline {
          animation: underline 0.8s ease-out 1.5s both;
          transform-origin: left;
        }
      `}</style>
    </div>
  );
};

export default ProfilePage;