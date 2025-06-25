import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useVenueDetails } from "../../hooks/user/useVenueDetails";
import { AuthContext } from "../../auth/AuthProvider";

const VenueDetails = () => {
  const { id } = useParams();
  console.log(id);
  const {isAuthenticated} = useContext(AuthContext);
  const navigate = useNavigate();

  const { data: venue, isLoading, isError, error } = useVenueDetails(id);

  const [currentIndex, setCurrentIndex] = useState(0);
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  const BASE_URL = "http://localhost:5050"; // Your backend base URL

  <img
    src={`${BASE_URL}/${venue.venueImages[currentIndex].url}`}
    alt={`Venue image ${currentIndex + 1}`}
    className="w-full h-full object-cover"
  />;
  const totalImages = venue.venueImages.length;

  const prevImage = () => {
    setCurrentIndex((prev) => (prev === 0 ? totalImages - 1 : prev - 1));
  };

  const nextImage = () => {
    setCurrentIndex((prev) => (prev === totalImages - 1 ? 0 : prev + 1));
  };

  const handleCheckout = () => {
    if (!isAuthenticated) {
      navigate("/login");
    } else {
      navigate(`/checkout/${venue._id}`, { state: { venue } });// state is used to pass temporary data to the next page without using global state
    }
  };

  return (
    <div className="px-10 py-8 font-sans">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-6">
        <div>
          <h1 className="text-4xl font-semibold text-gray-900">
            {venue.venueName}
          </h1>
          <p className="text-xl text-gray-700 mt-2">
            ${venue.pricePerHour} / hour
          </p>
          <div className="text-sm text-gray-600 mt-2">
            {venue.capacity} People &middot; {venue.location.city},{" "}
            {venue.location.state}
          </div>
        </div>
        <div className="max-w-md text-gray-600">
          <p>{venue.description}</p>
          <button className="mt-4 px-5 py-2 border border-orange-500 text-orange-500 rounded-full hover:bg-orange-100 transition">
            Contact Owner →
          </button>
        </div>
      </div>

      {/* Image Carousel */}
      <div className="relative w-full h-[500px] rounded-xl overflow-hidden">
        {totalImages > 0 ? (
          <img
            src={`${BASE_URL}/${venue.venueImages[currentIndex].url}`}
            alt={`Venue image ${currentIndex + 1}`}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span>No Images Available</span>
          </div>
        )}

        {/* Arrows */}
        {totalImages > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white rounded-full p-2 shadow hover:bg-orange-100 transition"
            >
              ←
            </button>
            <button
              onClick={nextImage}
              className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white rounded-full p-2 shadow hover:bg-orange-100 transition"
            >
              →
            </button>
          </>
        )}
      </div>

      {/* Amenities */}
      <div className="bg-gray-900 text-white mt-12 py-12 px-6 rounded-xl">
        <h2 className="text-3xl font-semibold text-center mb-10">
          Luxurious Features & Amenities
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 text-center">
          {venue.amenities.map((amenity, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <div className="text-3xl mb-3">🏷️</div>
              <h4 className="text-lg font-semibold">{amenity}</h4>
              <p className="text-sm text-gray-300 mt-1">
                Included in your booking
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-12 px-6 py-10 bg-white shadow rounded-xl flex flex-col md:flex-row items-center justify-between gap-6 border border-orange-200">
        <div className="max-w-xl">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Ready to Book This Venue?
          </h2>
          <p className="text-gray-600 text-sm">
            Only{" "}
            <span className="text-orange-500 font-semibold">
              3 weekends left
            </span>{" "}
            in July! Don’t miss your chance to host your event at this amazing
            location.
          </p>
        </div>
        <button
          onClick={handleCheckout} // or use React Router navigation
          className="px-6 py-3 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition shadow-md"
        >
          Book Now →
        </button>
      </div>
    </div>
  );
};

export default VenueDetails;
