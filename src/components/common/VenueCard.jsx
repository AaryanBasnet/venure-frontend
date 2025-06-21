import React from "react";
import {
  FaStar,
  FaMapMarkerAlt,
  FaUserFriends,
  FaEye,
  FaEdit,
  FaTrash,
} from "react-icons/fa";

// Custom Button Component
const Button = ({ children, onClick, className = "", ...props }) => {
  return (
    <button
      onClick={onClick}
      className={`px-2 py-1 rounded-md transition-colors duration-200 focus:outline-none ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

const VenueCard = ({ venue, onEdit }) => {
  const {
    venueName,
    rating,
    status,
    description,
    location,
    guests,
    price,
    amenities,
    bookings,
    venueImages,
  } = venue;

  const backendBaseUrl = "http://localhost:5050/";

  const imageUrl =
    venueImages && venueImages.length > 0
      ? backendBaseUrl + venueImages[0].url.replace(/^\/+/, "") // remove leading slash if any
      : "https://via.placeholder.com/400x200?text=Venue+Image";

  const statusColors = {
    Approved: "bg-green-100 text-green-700",
    Pending: "bg-yellow-100 text-yellow-700",
    Rejected: "bg-red-100 text-red-700",
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
      <div className="relative">
        <img
          src={
            imageUrl || "https://via.placeholder.com/400x200?text=Venue+Image"
          }
          alt={venueName}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-3 left-3 bg-white bg-opacity-90 px-2 py-1 rounded-full text-sm font-medium flex items-center">
          <FaStar className="mr-1 text-yellow-500" /> {rating}
        </div>
        <div
          className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold ${statusColors[status]}`}
        >
          {status}
        </div>
      </div>
      <div className="p-5 flex-grow flex flex-col justify-between">
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            {venueName}
          </h3>
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {description}
          </p>
          <div className="flex items-center text-gray-500 text-sm mb-1">
            <FaMapMarkerAlt className="mr-1" />
            {[
              location?.address,
              location?.city,
              location?.state,
              location?.country,
            ]
              .filter(Boolean)
              .join(", ")}
          </div>
          <div className="flex items-center text-gray-500 text-sm mb-3">
            <FaUserFriends className="mr-1" /> {guests} guests
          </div>
          <div className="text-purple-600 font-semibold text-lg mb-4">
            ₹{price}
          </div>
          <div className="flex flex-wrap gap-2 mb-4">
            {amenities.slice(0, 3).map((amenity, index) => (
              <span
                key={index}
                className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full"
              >
                {amenity}
              </span>
            ))}
            {amenities.length > 3 && (
              <span className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full">
                +{amenities.length - 3} more
              </span>
            )}
          </div>
        </div>
        <div className="mt-auto pt-4 border-t border-gray-200 flex justify-between items-center text-sm text-gray-600">
          <span>{bookings} bookings</span>
          <div className="flex space-x-3">
            <Button className="text-gray-500 hover:text-gray-700 p-1">
              <FaEye />
            </Button>
            <Button
              className="text-gray-500 hover:text-gray-700 p-1"
              onClick={() => onEdit(venue)}
            >
              <FaEdit />
            </Button>
            <Button className="text-red-500 hover:text-red-700 p-1">
              <FaTrash />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VenueCard;
