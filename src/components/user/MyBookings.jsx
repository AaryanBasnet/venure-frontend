import React, { useContext } from "react";
import { useMyBookings } from "../../hooks/user/useMyBookings";
import { AuthContext } from "../../auth/AuthProvider";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  Users,
  MapPin,
  Star,
  CheckCircle,
  Clock3,
  XCircle,
  Sparkles,
  Crown,
} from "lucide-react";

export default function MyBookings() {
  const { user, isAuthenticated } = useContext(AuthContext);
  const {
    data: bookings = [],
    isLoading,
    isError,
    error,
  } = useMyBookings({
    enabled: !!user,
  });

  console.log(bookings);

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case "approved":
        return <CheckCircle className="text-green-500" size={20} />;
      case "pending":
        return <Clock3 className="text-yellow-500" size={20} />;
      case "cancelled":
        return <XCircle className="text-red-500" size={20} />;
      default:
        return <Clock3 className="text-gray-500" size={20} />;
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "approved":
        return "from-green-100 to-emerald-100 border-green-200 text-green-800";
      case "pending":
        return "from-yellow-100 to-amber-100 border-yellow-200 text-yellow-800";
      case "cancelled":
        return "from-red-100 to-rose-100 border-red-200 text-red-800";
      default:
        return "from-gray-100 to-slate-100 border-gray-200 text-gray-800";
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="relative min-h-screen bg-gradient-to-br from-slate-50 via-white to-rose-50/30">
        {/* Background decorative elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-rose-300 to-pink-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-300 to-indigo-400 rounded-full blur-3xl"></div>
        </div>

        <div className="relative flex items-center justify-center min-h-screen">
          <div className="text-center">
            <motion.div
              className="inline-flex items-center gap-3 mb-6 px-6 py-3 bg-gradient-to-r from-rose-100/80 to-pink-100/80 rounded-full border border-rose-200/50 shadow-sm"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Sparkles size={20} className="text-rose-500" />
              <span className="text-lg font-semibold text-rose-700">
                Loading your luxury bookings...
              </span>
            </motion.div>

            <div className="flex justify-center space-x-2">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-3 h-3 bg-gradient-to-r from-rose-400 to-pink-500 rounded-full"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <div className="relative min-h-screen bg-gradient-to-br from-slate-50 via-white to-rose-50/30">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-rose-300 to-pink-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-300 to-indigo-400 rounded-full blur-3xl"></div>
        </div>

        <div className="relative flex items-center justify-center min-h-screen">
          <div className="text-center max-w-md mx-auto px-6">
            <div className="mb-6">
              <XCircle size={64} className="text-red-500 mx-auto mb-4" />
              <h2 className="text-2xl font-serif text-slate-800 mb-2">
                Something went wrong
              </h2>
              <p className="text-slate-600">{error.message}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Empty state
  if (bookings.length === 0) {
    return (
      <div className="relative min-h-screen bg-gradient-to-br from-slate-50 via-white to-rose-50/30">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-rose-300 to-pink-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-300 to-indigo-400 rounded-full blur-3xl"></div>
        </div>

        <div className="relative flex items-center justify-center min-h-screen">
          <div className="text-center max-w-md mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="mb-8">
                <Calendar size={64} className="text-slate-400 mx-auto mb-4" />
                <h2 className="text-3xl font-serif text-slate-800 mb-4">
                  No bookings yet
                </h2>
                <p className="text-lg text-slate-600 leading-relaxed">
                  Start your luxury venue journey by exploring our premium
                  collection of exquisite venues.
                </p>
              </div>

              <motion.button
                className="group relative px-8 py-4 bg-gradient-to-r from-rose-600 to-pink-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-rose-700 to-pink-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative z-10">Explore Venues</span>
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  // Main bookings display
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-50 via-white to-rose-50/30">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-rose-300 to-pink-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-300 to-indigo-400 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-6xl mx-auto px-4 py-16">
        {/* Header Section */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-3 mb-6 px-4 py-2 bg-gradient-to-r from-rose-100/80 to-pink-100/80 rounded-full border border-rose-200/50 shadow-sm">
            <Crown size={16} className="text-rose-500" />
            <span className="text-sm font-semibold text-rose-700 tracking-wide">
              YOUR LUXURY EXPERIENCES
            </span>
          </div>

          <h1 className="text-5xl lg:text-6xl font-serif text-slate-800 mb-4">
            My{" "}
            <span className="bg-gradient-to-r from-rose-600 via-pink-600 to-purple-700 bg-clip-text text-transparent font-bold">
              Premium
            </span>{" "}
            Bookings
          </h1>

          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Manage and review your exclusive venue reservations
          </p>
        </motion.div>

        {/* Bookings Grid */}
        <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-2">
          {bookings.map((booking, index) => (
            <motion.div
              key={booking._id}
              className="group relative bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 overflow-hidden hover:shadow-2xl transition-all duration-500"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              {/* Decorative gradient border */}
              <div className="absolute inset-0 bg-gradient-to-r from-rose-400/20 to-pink-400/20 rounded-3xl blur-sm -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              {/* Status Badge */}
              <div className="absolute top-6 right-6 z-20">
                <div
                  className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border bg-gradient-to-r ${getStatusColor(
                    booking.status
                  )} shadow-sm`}
                >
                  {getStatusIcon(booking.status)}
                  <span className="text-sm font-semibold capitalize">
                    {booking.status}
                  </span>
                </div>
              </div>

              <div className="p-8">
                {/* Venue Name */}
                <div className="mb-6">
                  <h2 className="text-2xl font-serif text-slate-800 mb-2 pr-24">
                    {booking.venue.venueName}
                  </h2>
                  <div className="flex items-center gap-2 text-slate-600">
                    <MapPin size={16} />
                    <span className="text-sm">Premium Venue</span>
                  </div>
                </div>

                {/* Booking Details Grid */}
                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-rose-100 to-pink-100 rounded-full flex items-center justify-center">
                        <Calendar size={18} className="text-rose-600" />
                      </div>
                      <div>
                        <p className="text-sm text-slate-500 font-medium">
                          Date
                        </p>
                        <p className="text-slate-800 font-semibold">
                          {new Date(booking.bookingDate).toLocaleDateString(
                            "en-US",
                            {
                              weekday: "short",
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            }
                          )}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-100 to-indigo-100 rounded-full flex items-center justify-center">
                        <Clock size={18} className="text-purple-600" />
                      </div>
                      <div>
                        <p className="text-sm text-slate-500 font-medium">
                          Time
                        </p>
                        <p className="text-slate-800 font-semibold">
                          {booking.timeSlot}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-emerald-100 to-teal-100 rounded-full flex items-center justify-center">
                        <Users size={18} className="text-emerald-600" />
                      </div>
                      <div>
                        <p className="text-sm text-slate-500 font-medium">
                          Guests
                        </p>
                        <p className="text-slate-800 font-semibold">
                          {booking.numberOfGuests} people
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-yellow-100 to-amber-100 rounded-full flex items-center justify-center">
                        <Star size={18} className="text-yellow-600" />
                      </div>
                      <div>
                        <p className="text-sm text-slate-500 font-medium">
                          Investment
                        </p>
                        <p className="text-slate-800 font-bold text-lg">
                          Rs. {booking.totalPrice.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Actions/Info */}
                <div className="pt-6 border-t border-slate-200/60">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-gradient-to-r from-rose-400 to-pink-500 rounded-full"></div>
                      <span className="text-sm text-slate-600">
                        Booking ID: {booking._id.slice(-8)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Statistics */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="inline-flex items-center gap-8 px-8 py-4 bg-white/60 backdrop-blur-md rounded-2xl border border-white/50 shadow-lg">
            <div className="text-center">
              <div className="text-2xl font-bold text-slate-800">
                {bookings.length}
              </div>
              <div className="text-sm text-slate-600">Total Bookings</div>
            </div>
            <div className="w-px h-8 bg-slate-300"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-slate-800">
                {
                  bookings.filter((b) => b.status.toLowerCase() === "approved")
                    .length
                }
              </div>
              <div className="text-sm text-slate-600">Approved</div>
            </div>
            <div className="w-px h-8 bg-slate-300"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-slate-800">
                Rs.{" "}
                {bookings
                  .reduce((sum, b) => sum + b.totalPrice, 0)
                  .toLocaleString()}
              </div>
              <div className="text-sm text-slate-600">Total Investment</div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Floating particles for luxury effect */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-rose-400 to-pink-500 rounded-full opacity-20"
            animate={{
              y: [0, -20, 0, -10, 0],
              scale: [0, 1, 0.5, 1, 0],
              opacity: [0, 0.3, 0.1, 0.2, 0],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: i * 2,
            }}
            style={{
              left: `${10 + i * 15}%`,
              top: `${20 + i * 10}%`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
