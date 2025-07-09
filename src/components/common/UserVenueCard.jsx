import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  MapPin,
  Users,
  CheckCircle,
  ArrowRight,
  Heart,
} from "lucide-react";

const BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5050";

export default function UserVenueCard({ venue, index, isFavorite, onToggleFavorite }) {
  const navigate = useNavigate();

  const imageUrl =
    venue.venueImages?.length > 0
      ? `${BASE_URL}/${venue.venueImages[0].url}`
      : "https://via.placeholder.com/400x250?text=Elegant+Venue";

  return (
    <motion.div
      key={venue._id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.15 }}
      whileHover={{ scale: 1.02 }}
      className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-500 ease-in-out border border-gray-100"
    >
      <div className="relative h-64">
        <img
          src={imageUrl}
          alt={venue.venueName}
          className="w-full h-full object-cover rounded-t-3xl"
        />

        <button
          onClick={onToggleFavorite}
          className="absolute top-4 right-4 bg-white/80 backdrop-blur-md p-2 rounded-full shadow hover:scale-110 transition"
        >
          <Heart
            size={20}
            className={`transition ${
              isFavorite ? "text-rose-500 fill-rose-500" : "text-gray-400"
            }`}
          />
        </button>
      </div>

      <div className="p-6 font-poppins">
        <h3 className="text-2xl font-playfair text-gray-800 mb-1 leading-snug">
          {venue.venueName}
        </h3>

        <p className="text-sm text-gray-600 mb-3">
          <span className="font-semibold text-rose-500">
            ${venue.pricePerHour}
          </span>{" "}
          <span className="text-xs">/ hour</span>
        </p>

        <p className="text-gray-500 text-sm mb-2 flex items-center">
          <MapPin size={16} className="mr-2 text-rose-400" />
          {venue.location?.city}, {venue.location?.state},{" "}
          {venue.location?.country}
        </p>

        <div className="flex items-center text-gray-600 text-sm mb-4">
          <Users size={16} className="mr-2 text-rose-400" />
          Capacity:{" "}
          <span className="font-semibold ml-1">{venue.capacity}</span> guests
        </div>

        {venue.amenities?.length > 0 && (
          <div className="mb-5">
            <h4 className="text-sm font-semibold text-gray-700 mb-2">
              Key Amenities:
            </h4>
            <div className="flex flex-wrap gap-2">
              {venue.amenities.map((amenity, idx) => (
                <span
                  key={idx}
                  className="bg-rose-50 text-rose-700 text-xs px-3 py-1 rounded-full flex items-center shadow-sm"
                >
                  <CheckCircle size={12} className="mr-1 text-rose-500" />
                  {amenity}
                </span>
              ))}
            </div>
          </div>
        )}

        <button
          onClick={() => navigate(`/venue/${venue._id}`)}
          className="w-full border border-rose-400 text-rose-500 font-medium py-3 rounded-full shadow-sm hover:bg-rose-50 transition duration-300 ease-in-out text-sm flex items-center justify-center gap-2"
        >
          View Details <ArrowRight size={16} />
        </button>
      </div>
    </motion.div>
  );
}
