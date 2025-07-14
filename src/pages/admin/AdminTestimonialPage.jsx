import React, { useState } from "react";
import {
  Star,
  Search,
  RefreshCw,
  MessageCircle,
  User,
  MapPin,
  Calendar,
  TrendingUp,
} from "lucide-react";
import { useFetchAllTestimonial } from "../../hooks/admin/useFetchAlltestimonial";



export default function AdminTestimonialPage() {
  // Using mock data for demonstration

  // const testimonials = mockTestimonials;
  const {
    data: testimonials = [],
    isLoading,
    isError,
  } = useFetchAllTestimonial();

  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  const filtered = testimonials.filter(
    (t) =>
      t.user?.name?.toLowerCase().includes(search.toLowerCase()) ||
      t.comment?.toLowerCase().includes(search.toLowerCase()) ||
      t.venue?.venueName?.toLowerCase().includes(search.toLowerCase())
  );

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "newest")
      return new Date(b.createdAt) - new Date(a.createdAt);
    if (sortBy === "oldest")
      return new Date(a.createdAt) - new Date(b.createdAt);
    if (sortBy === "rating") return b.rating - a.rating;
    return 0;
  });

  const averageRating =
    testimonials.length > 0
      ? (
          testimonials.reduce((sum, t) => sum + t.rating, 0) /
          testimonials.length
        ).toFixed(1)
      : 0;

  const ratingDistribution = [5, 4, 3, 2, 1].map((rating) => ({
    rating,
    count: testimonials.filter((t) => t.rating === rating).length,
  }));

  const getRatingColor = (rating) => {
    if (rating >= 4.5) return "text-emerald-600";
    if (rating >= 3.5) return "text-amber-600";
    return "text-red-500";
  };

 

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-blue-50">
      <div className="p-6 max-w-7xl mx-auto">
        {/* Header with Stats */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row justify-between items-start gap-6">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 via-slate-700 to-blue-600 bg-clip-text text-transparent mb-2">
                Testimonials Dashboard
              </h1>
              <p className="text-slate-600">
                Monitor and manage customer feedback
              </p>
            </div>

            {/* Quick Stats */}
            <div className="flex flex-wrap gap-4">
              <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 min-w-[140px]">
                <div className="flex items-center gap-2 mb-1">
                  <MessageCircle className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium text-slate-600">
                    Total Reviews
                  </span>
                </div>
                <div className="text-2xl font-bold text-slate-800">
                  {testimonials.length}
                </div>
              </div>

              <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 min-w-[140px]">
                <div className="flex items-center gap-2 mb-1">
                  <Star className="w-4 h-4 text-amber-500" />
                  <span className="text-sm font-medium text-slate-600">
                    Avg Rating
                  </span>
                </div>
                <div
                  className={`text-2xl font-bold ${getRatingColor(
                    averageRating
                  )}`}
                >
                  {averageRating}
                </div>
              </div>

              <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 min-w-[140px]">
                <div className="flex items-center gap-2 mb-1">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium text-slate-600">
                    5-Star Reviews
                  </span>
                </div>
                <div className="text-2xl font-bold text-green-600">
                  {ratingDistribution.find((r) => r.rating === 5)?.count || 0}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search customers, venues, or comments..."
                  className="pl-10 pr-4 py-3 border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full md:w-80 transition-all"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              <select
                className="px-4 py-3 border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>

            
          </div>
        </div>

        {/* Content */}
        {isLoading ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-500 text-lg">Loading testimonials...</p>
            </div>
          </div>
        ) : isError ? (
          <div className="bg-white rounded-2xl shadow-sm border border-red-200 p-12">
            <div className="text-center text-red-600">
              <MessageCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p className="text-lg font-medium">Failed to load testimonials</p>
              <p className="text-sm text-red-500 mt-2">
                Please try refreshing the page
              </p>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Desktop Table View */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-slate-100 to-gray-100 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        Customer
                      </div>
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        Venue
                      </div>
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4" />
                        Rating
                      </div>
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                      <div className="flex items-center gap-2">
                        <MessageCircle className="w-4 h-4" />
                        Comment
                      </div>
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        Date
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {sorted.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="text-center py-12">
                        <MessageCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                        <p className="text-slate-400 text-lg">
                          No testimonials found
                        </p>
                        <p className="text-slate-400 text-sm mt-1">
                          Try adjusting your search criteria
                        </p>
                      </td>
                    </tr>
                  ) : (
                    sorted.map((t, index) => (
                      <tr
                        key={t._id || index}
                        className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-200"
                      >
                        <td className="px-6 py-4">
                          <div className="font-medium text-slate-800">
                            {t.user?.name ?? "N/A"}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-slate-600">
                            {t.venue?.venueName}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < t.rating
                                    ? "text-amber-400 fill-current"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                            <span className="ml-2 text-sm font-medium text-slate-600">
                              {t.rating}/5
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div
                            className="max-w-sm truncate text-slate-600 cursor-help"
                            title={t.comment}
                          >
                            {t.comment}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-slate-500">
                            {new Date(t.createdAt).toLocaleDateString("en-GB", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })}
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View */}
            <div className="lg:hidden">
              {sorted.length === 0 ? (
                <div className="text-center py-12">
                  <MessageCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-slate-400 text-lg">
                    No testimonials found
                  </p>
                  <p className="text-slate-400 text-sm mt-1">
                    Try adjusting your search criteria
                  </p>
                </div>
              ) : (
                <div className="p-4 space-y-4">
                  {sorted.map((t, index) => (
                    <div
                      key={t._id || index}
                      className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-4 border border-gray-100 hover:shadow-md transition-all"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-semibold text-slate-800">
                            {t.user?.name ?? "N/A"}
                          </h3>
                          <p className="text-sm text-slate-600">
                            {t.venue?.venueName}
                          </p>
                        </div>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < t.rating
                                  ? "text-amber-400 fill-current"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-slate-700 mb-3 text-sm leading-relaxed">
                        {t.comment}
                      </p>
                      <div className="text-xs text-slate-500 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(t.createdAt).toLocaleDateString("en-GB", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
