import React, { useState } from "react";
import {
  Star,
  Search,
  Filter,
  TrendingUp,
  MessageCircle,
  Calendar,
  User,
  MapPin,
  Award,
  BarChart3,
} from "lucide-react";
import { useOwnerVenueReviews } from "../../hooks/owner/useOwnerVenueReviews";

const OwnerVenueReviewsPage = () => {
  const { data: venuesWithReviews } = useOwnerVenueReviews();
  const isLoading = false;

  const [search, setSearch] = useState("");
  const [ratingFilter, setRatingFilter] = useState("all");

  const avatarBaseUrl = import.meta.env.VITE_API_BASE_URL.replace("/api", "");

  // Calculate overall stats
  const totalReviews =
    venuesWithReviews?.reduce(
      (sum, venue) => sum + (venue.totalReviews ?? venue.reviews?.length ?? 0),
      0
    ) || 0;

  const overallRating =
    venuesWithReviews?.length > 0
      ? (
          venuesWithReviews.reduce(
            (sum, venue) => sum + venue.averageRating,
            0
          ) / venuesWithReviews.length
        ).toFixed(1)
      : 0;
  const fiveStarReviews =
    venuesWithReviews?.reduce(
      (sum, venue) => sum + venue.reviews.filter((r) => r.rating === 5).length,
      0
    ) || 0;

  const getRatingColor = (rating) => {
    if (rating >= 4.5) return "text-emerald-600";
    if (rating >= 4) return "text-blue-600";
    if (rating >= 3.5) return "text-amber-600";
    return "text-red-500";
  };

  const getRatingBgColor = (rating) => {
    if (rating >= 4.5) return "bg-emerald-50 border-emerald-200";
    if (rating >= 4) return "bg-blue-50 border-blue-200";
    if (rating >= 3.5) return "bg-amber-50 border-amber-200";
    return "bg-red-50 border-red-200";
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-blue-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-500 text-lg">Loading venue reviews...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-blue-50">
      <div className="p-6 max-w-7xl mx-auto">
        {/* Header with Stats */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row justify-between items-start gap-6">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 via-slate-700 to-blue-600 bg-clip-text text-transparent mb-2">
                Venue Reviews
              </h1>
              <p className="text-slate-600">
                Monitor customer feedback across all your venues
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
                  {totalReviews}
                </div>
              </div>

              <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 min-w-[140px]">
                <div className="flex items-center gap-2 mb-1">
                  <Star className="w-4 h-4 text-amber-500" />
                  <span className="text-sm font-medium text-slate-600">
                    Overall Rating
                  </span>
                </div>
                <div
                  className={`text-2xl font-bold ${getRatingColor(
                    overallRating
                  )}`}
                >
                  {overallRating}
                </div>
              </div>

              <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 min-w-[140px]">
                <div className="flex items-center gap-2 mb-1">
                  <Award className="w-4 h-4 text-emerald-600" />
                  <span className="text-sm font-medium text-slate-600">
                    5-Star Reviews
                  </span>
                </div>
                <div className="text-2xl font-bold text-emerald-600">
                  {fiveStarReviews}
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
                  placeholder="Search reviews, customers, or venues..."
                  className="pl-10 pr-4 py-3 border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full md:w-80 transition-all"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              <select
                className="px-4 py-3 border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                value={ratingFilter}
                onChange={(e) => setRatingFilter(e.target.value)}
              >
                <option value="all">All Ratings</option>
                <option value="5">5 Stars</option>
                <option value="4">4 Stars</option>
                <option value="3">3 Stars</option>
                <option value="2">2 Stars</option>
                <option value="1">1 Star</option>
              </select>
            </div>

            <div className="flex gap-2">
              <button className="flex items-center gap-2 px-4 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 shadow-sm transition-all">
                <BarChart3 className="w-4 h-4" />
                <span className="hidden sm:inline">Analytics</span>
              </button>
            </div>
          </div>
        </div>

        {/* Venues */}
        <div className="space-y-6">
          {venuesWithReviews?.map((venue) => (
            <div
              key={venue.venueId}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-300"
            >
              {/* Venue Header */}
              <div className="bg-gradient-to-r from-slate-100 to-gray-100 p-6 border-b border-gray-200">
                <div className="flex flex-col lg:flex-row justify-between items-start gap-4">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-white rounded-xl shadow-sm">
                      <MapPin className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-slate-800">
                        {venue.venueName}
                      </h2>
                      <p className="text-slate-600 flex items-center gap-1">
                        <MessageCircle className="w-4 h-4" />
                        {venue.totalReviews} reviews
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div
                      className={`px-4 py-2 rounded-xl border ${getRatingBgColor(
                        venue.averageRating
                      )}`}
                    >
                      <div className="flex items-center gap-2">
                        <Star className="w-5 h-5 text-amber-500 fill-current" />
                        <span
                          className={`font-bold text-lg ${getRatingColor(
                            venue.averageRating
                          )}`}
                        >
                          {venue.averageRating}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(venue.averageRating)
                              ? "text-amber-400 fill-current"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Reviews */}
              <div className="p-6">
                {venue.reviews?.length === 0 ? (
                  <div className="text-center py-8">
                    <MessageCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-slate-400 text-lg">No reviews yet</p>
                    <p className="text-slate-400 text-sm mt-1">
                      Reviews will appear here once customers start leaving
                      feedback
                    </p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {venue.reviews?.map((review) => (
                      <div
                        key={review._id}
                        className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-6 border border-gray-100 hover:shadow-sm transition-all"
                      >
                        <div className="flex gap-4">
                          {/* Avatar */}
                          <div className="flex-shrink-0">
                            <div className="relative">
                              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 p-0.5 shadow-lg">
                                <img
                                  src={`${avatarBaseUrl}${review.user.avatar}`}
                                  alt={`${review.user.name}'s avatar`}
                                  className="w-full h-full rounded-full object-cover bg-white"
                                  onError={(e) => {
                                    e.target.src =
                                      "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDE1MCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iNzUiIGN5PSI3NSIgcj0iNzUiIGZpbGw9IiNmM2Y0ZjYiLz48Y2lyY2xlIGN4PSI3NSIgY3k9IjY1IiByPSIyNSIgZmlsbD0iIzY2NzI4MCIvPjxwYXRoIGQ9Ik0yNSAxMjVjMC0yNy42MTMgMjIuMzg3LTUwIDUwLTUwczUwIDIyLjM4NyA1MCA1MHYyNUgyNXYtMjV6IiBmaWxsPSIjNjY3MjgwIi8+PC9zdmc+";
                                  }}
                                />
                              </div>
                              <div className="absolute -bottom-1 -right-1 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full p-1 shadow-sm">
                                <Star className="w-3 h-3 text-white fill-current" />
                              </div>
                            </div>
                          </div>

                          {/* Review Content */}
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                              <div>
                                <h3 className="font-semibold text-slate-800 flex items-center gap-2">
                                  <User className="w-4 h-4 text-slate-600" />
                                  {review.user.name}
                                </h3>
                                <div className="flex items-center gap-2 mt-1">
                                  <div className="flex items-center gap-1">
                                    {[...Array(5)].map((_, i) => (
                                      <Star
                                        key={i}
                                        className={`w-4 h-4 ${
                                          i < review.rating
                                            ? "text-amber-400 fill-current"
                                            : "text-gray-300"
                                        }`}
                                      />
                                    ))}
                                  </div>
                                  <span className="text-sm font-medium text-slate-600">
                                    {review.rating}/5
                                  </span>
                                </div>
                              </div>

                              <div className="flex items-center gap-1 text-sm text-slate-500">
                                <Calendar className="w-4 h-4" />
                                {formatDate(review.createdAt)}
                              </div>
                            </div>

                            <p className="text-slate-700 leading-relaxed">
                              {review.comment}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {!venuesWithReviews ||
          (venuesWithReviews.length === 0 && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12">
              <div className="text-center">
                <MessageCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-slate-400 text-xl font-medium mb-2">
                  No venue reviews yet
                </p>
                <p className="text-slate-400">
                  Reviews from customers will appear here once they start
                  leaving feedback
                </p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default OwnerVenueReviewsPage;
