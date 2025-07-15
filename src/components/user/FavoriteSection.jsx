import React, { useContext } from "react";
import { motion } from "framer-motion";
import { useToggleFavoriteVenue } from "../../hooks/user/useToggleFavoriteVenue";
import { useFavoriteVenues } from "../../hooks/user/useFavoriteVenues";
import UserVenueCard from "../common/UserVenueCard";
import { AuthContext } from "../../auth/AuthProvider";

export default function FavoriteSection() {
  const { user } = useContext(AuthContext);
  const {
    data: favoriteVenues = [],
    isLoading,
    isError,
    error,
  } = useFavoriteVenues({
    enabled: !!user,
  });
  const { mutate: toggleFavorite } = useToggleFavoriteVenue();

  if (isLoading)
    return <div className="text-center py-20">Loading favorites...</div>;
  if (isError)
    return (
      <div className="text-center py-20 text-red-600">
        Error loading favorites: {error.message}
      </div>
    );
  if (favoriteVenues.length === 0)
    return <p className="text-center py-20">No favorite venues found.</p>;

  return (
    <section className="py-16 px-6 max-w-7xl mx-auto">
      <h2 className="text-4xl font-serif mb-10 text-center">
        Your Favorite Venues
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {favoriteVenues.map((venue, index) => (
          <motion.div
            key={venue._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, duration: 0.4 }}
          >
            <UserVenueCard
              venue={venue}
              index={index}
              isFavorite={true} // since they are in favorites section
              onToggleFavorite={() => toggleFavorite(venue._id)}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
