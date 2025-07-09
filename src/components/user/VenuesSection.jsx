import React from "react";
import { motion } from "framer-motion";
import UserVenueCard from "../common/UserVenueCard";
import { useNavigate } from "react-router-dom";
import { useFilterVenues } from "../../hooks/user/useFilterVenues";

export default function VenuesSection() {
  const { data, isLoading, isError, error } = useFilterVenues();
  const venues = data?.data || []; // <-- Correct: extract array from nested data object
  const navigate = useNavigate();

  if (isLoading)
    return <div className="text-center py-20">Loading venues...</div>;
  if (isError)
    return (
      <div className="text-center py-20 text-red-600">
        Error loading venues: {error.message}
      </div>
    );

  const handleVenueNavigation = () => {
    navigate("/venues");
  };

  return (
    <section className="py-20 px-6 md:px-16 bg-gradient-to-b from-rose-50 to-white">
      <div className="flex items-center justify-between max-w-7xl mx-auto mb-10">
        <motion.h2
          className="text-5xl md:text-6xl font-serif tracking-wide text-gray-800"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          Discover Our Top Venues
        </motion.h2>
        <motion.button
          onClick={handleVenueNavigation}
          whileHover={{ scale: 1.05 }}
          className="text-rose-600 font-semibold text-lg px-5 py-2 border border-rose-500 rounded-full hover:bg-rose-100 transition"
        >
          Explore All
        </motion.button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-14 max-w-7xl mx-auto">
        {venues.slice(0, 3).map((venue, index) => (
          <UserVenueCard key={venue._id} venue={venue} index={index} />
        ))}
      </div>
    </section>
  );
}
