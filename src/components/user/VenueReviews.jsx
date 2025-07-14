import React, { useState } from "react";
import {
  Star,
  MessageCircle,
  User,
  Calendar,
  Send,
  Sparkles,
  Quote,
  Heart,
  Award,
} from "lucide-react";
import { useReviews } from "../../hooks/useReviews";
import { toast } from "react-toastify";

const VenueReviews = ({ venue, user, isAuthenticated }) => {
  console.log(user);
  if (!venue || !venue._id) {
    return <div>Loading venue data...</div>; // or null, or a skeleton loader
  }
  const [newReview, setNewReview] = useState({
    rating: 5,
    comment: "",
    title: "",
  });
  const [showReviewForm, setShowReviewForm] = useState(false);

  // Use your custom hook to fetch reviews and mutations
  const {
    reviews,
    isLoading,
    error,
    addReview,
    deleteReview,
    isAdding,
    isDeleting,
  } = useReviews(venue._id);

  const handleRatingClick = (rating) => {
    setNewReview({ ...newReview, rating });
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      toast.info("Please log in to leave a review");
      return;
    }

    if (newReview.comment.trim() === "") {
      toast.info("Please write a review comment");
      return;
    }

    try {
      await addReview({
        rating: newReview.rating,
        comment: newReview.comment,
        title: newReview.title,
      });
      setNewReview({ rating: 5, comment: "", title: "" });
      setShowReviewForm(false);
    } catch (err) {
      console.error("Failed to submit review:", err);
      toast.error("Failed to submit review, please try again.");
    }
  };

  const renderStars = (rating, interactive = false, size = 20) => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={size}
            className={`${
              star <= rating
                ? "text-amber-400 fill-amber-400"
                : "text-slate-300"
            } ${
              interactive
                ? "cursor-pointer hover:text-amber-400 hover:fill-amber-400"
                : ""
            } stroke-1 transition-colors duration-200`}
            onClick={interactive ? () => handleRatingClick(star) : undefined}
          />
        ))}
      </div>
    );
  };

  // Fallback to 0 if no reviews loaded yet
  const averageRating =
    reviews.length > 0
      ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
      : 0;

  if (isLoading) {
    return <div>Loading reviews...</div>;
  }

  if (error) {
    return <div>Error loading reviews.</div>;
  }

  const avatarBaseUrl = import.meta.env.VITE_API_BASE_URL.replace("/api", "");

  return (
    <div className="max-w-6xl mx-auto mb-20">
      {/* Reviews Header */}
      <div className="text-center mb-12">
        <div className="flex justify-center mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-500 rounded-2xl flex items-center justify-center">
            <Award size={24} className="text-white stroke-1" />
          </div>
        </div>
        <h2 className="text-4xl font-extralight text-slate-800 mb-4 tracking-wide">
          Guest Experiences
        </h2>
        <div className="w-16 h-px bg-gradient-to-r from-transparent via-amber-300 to-transparent mx-auto mb-8"></div>

        {/* Rating Summary */}
        <div className="flex flex-col items-center space-y-4">
          <div className="flex items-center space-x-4">
            <div className="text-5xl font-extralight text-slate-800">
              {averageRating.toFixed(1)}
            </div>
            {renderStars(Math.round(averageRating), false, 24)}
          </div>
          <div className="text-slate-600 font-light">
            Based on {reviews.length} exceptional review
            {reviews.length !== 1 ? "s" : ""}
          </div>
        </div>
      </div>

      {/* Review Form Toggle */}
      <div className="text-center mb-12">
        <button
          onClick={() => setShowReviewForm(!showReviewForm)}
          className="inline-flex items-center space-x-3 px-8 py-3 bg-gradient-to-r from-rose-400 to-rose-500 text-white rounded-full hover:from-rose-500 hover:to-rose-600 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-rose-300/50"
        >
          <MessageCircle size={18} className="stroke-1" />
          <span className="font-light tracking-wide">
            Share Your Experience
          </span>
        </button>
      </div>

      {/* Review Form */}
      {showReviewForm && (
        <div className="mb-16">
          <div className="relative p-8 bg-gradient-to-br from-white/80 to-rose-50/80 backdrop-blur-sm rounded-3xl border border-slate-200/50 shadow-xl shadow-slate-300/20 overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-rose-200/30 to-transparent rounded-full -mr-16 -mt-16"></div>

            <div className="relative">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-extralight text-slate-800 mb-4">
                  Tell Us About Your Experience
                </h3>
                <div className="w-12 h-px bg-gradient-to-r from-transparent via-rose-300 to-transparent mx-auto"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-light text-slate-700 mb-3">
                      Overall Rating
                    </label>
                    <div className="flex items-center space-x-2">
                      {renderStars(newReview.rating, true, 32)}
                      <span className="ml-4 text-slate-600 font-light">
                        {newReview.rating} star
                        {newReview.rating !== 1 ? "s" : ""}
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-light text-slate-700 mb-3">
                      Review Title
                    </label>
                    <input
                      type="text"
                      value={newReview.title}
                      onChange={(e) =>
                        setNewReview({ ...newReview, title: e.target.value })
                      }
                      placeholder="Give your review a title..."
                      className="w-full px-4 py-3 bg-white/70 backdrop-blur-sm border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-transparent transition-all duration-300 font-light text-slate-800 placeholder-slate-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-light text-slate-700 mb-3">
                    Your Review
                  </label>
                  <textarea
                    value={newReview.comment}
                    onChange={(e) =>
                      setNewReview({ ...newReview, comment: e.target.value })
                    }
                    placeholder="Share your experience with this venue..."
                    rows={6}
                    className="w-full px-4 py-3 bg-white/70 backdrop-blur-sm border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-transparent transition-all duration-300 font-light text-slate-800 placeholder-slate-400 resize-none"
                  />
                </div>
              </div>

              <div className="flex justify-center mt-8">
                <button
                  onClick={handleSubmitReview}
                  disabled={isAdding}
                  className="group inline-flex items-center space-x-3 px-10 py-3 bg-gradient-to-r from-rose-400 to-rose-500 text-white rounded-full hover:from-rose-500 hover:to-rose-600 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-rose-300/50"
                >
                  <span className="font-light tracking-wide">
                    Publish Review
                  </span>
                  <Send
                    size={18}
                    className="stroke-1 group-hover:scale-110 transition-transform duration-300"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reviews List */}
      <div className="space-y-8">
        {reviews.map((review) => (
          <div
            key={review._id}
            className="group p-8 bg-white/60 backdrop-blur-sm rounded-3xl border border-slate-200/50 hover:bg-white hover:shadow-lg hover:border-rose-200 transition-all duration-300 overflow-hidden relative"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-rose-100/30 to-transparent rounded-full -mr-12 -mt-12"></div>

            <div className="relative">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-slate-100 to-slate-200 rounded-full flex items-center justify-center">
                    {review.user?.avatar ? (
                      <img
                        src={`${avatarBaseUrl}${review.user.avatar}`}
                        alt={`${review.user?.name || "User"}'s avatar`}
                        className="w-full h-full rounded-full object-cover bg-white"
                        onError={(e) => {
                          e.target.src = "data:image/svg+xml;base64,..."; // fallback
                        }}
                      />
                    ) : (
                      <User size={20} className="text-slate-500 stroke-1" />
                    )}
                  </div>
                  <div>
                    <h4 className="text-lg font-light text-slate-800">
                      {review.user?.name}
                    </h4>
                    <div className="flex items-center space-x-3 text-sm text-slate-500">
                      <Calendar size={14} className="stroke-1" />
                      <span className="font-light">
                        {new Date(review.createdAt).toLocaleDateString(
                          "en-US",
                          {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                          }
                        )}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-end space-y-2">
                  {renderStars(review.rating)}
                  {/* <div className="flex items-center space-x-1 text-sm text-slate-500">
                    <Heart size={14} className="stroke-1" />
                    <span className="font-light">
                      {review.helpful || 0} helpful
                    </span>
                  </div> */}
                </div>
              </div>

              {review.title && (
                <h3 className="text-xl font-light text-slate-800 mb-4">
                  {review.title}
                </h3>
              )}

              <div className="relative">
                <Quote
                  size={32}
                  className="absolute -top-2 -left-2 text-rose-200 stroke-1"
                />
                <p className="text-slate-600 font-light leading-relaxed pl-8 pr-4">
                  {review.comment}
                </p>
              </div>

              <div className="flex justify-between items-center mt-6 pt-4 border-t border-slate-200/50">
                {/* <button className="flex items-center space-x-2 text-slate-500 hover:text-rose-400 transition-colors duration-200">
                  <Heart size={16} className="stroke-1" />
                  <span className="text-sm font-light">Helpful</span>
                </button> */}

                <div className="flex items-center space-x-1 text-sm text-slate-400">
                  <Sparkles size={14} className="stroke-1" />
                  <span className="font-light">Verified Stay</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Load More Reviews */}
      <div className="text-center mt-12">
        <button className="inline-flex items-center space-x-3 px-8 py-3 bg-white/70 backdrop-blur-sm border border-slate-200 text-slate-700 rounded-full hover:bg-white hover:shadow-lg transition-all duration-300 font-light group">
          <span>View More Reviews</span>
          <MessageCircle
            size={18}
            className="stroke-1 group-hover:text-rose-400 transition-colors"
          />
        </button>
      </div>
    </div>
  );
};

export default VenueReviews;
