// utils/sanitizeVenue.js

export const sanitizeVenue = (venue) => {
  const safeLocation = {
    address: venue?.location?.address || "",
    city: venue?.location?.city || "",
    state: venue?.location?.state || "",
    country: venue?.location?.country || "",
  };

  return {
    ...venue,
    venueName: venue.venueName || "Untitled Venue",
    rating: venue.rating || 0,
    status: venue.status || "Pending",
    description: venue.description || "No description provided.",
    location: safeLocation,
    guests: venue.guests || 0,
    price: venue.price || 0,
    amenities: Array.isArray(venue.amenities) ? venue.amenities : [],
    bookings: venue.bookings || 0,
    venueImages: Array.isArray(venue.venueImages) ? venue.venueImages : [],
  };
};
