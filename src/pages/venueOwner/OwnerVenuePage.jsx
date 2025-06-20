import React, { useState, useEffect } from "react";
import AddVenueModal from "../../components/modal/AddVenueModal";
import VenueCard from "../../components/common/VenueCard";
// import SearchAndFilter from "../../components/common/SearchAndFilter";
// import { mockVenues } from "../../mock/mockVenues"; // If you're importing mockVenues
// import { useAddVenue } from "../../hooks/owner/useAddVenue";

import VenueRegisterForm from "../../components/owner/venueRegistrationForm";
const mockVenues = [
  {
    id: 1,
    venueName: "Royal Palace Banquet",
    rating: 4.8,
    status: "Approved",
    description:
      "Elegant banquet hall perfect for weddings and corporate events with traditional architecture",
    location: "Mumbai, Maharashtra",
    guests: 500,
    price: "15,000/hr",
    amenities: [
      "Air Conditioning",
      "Parking",
      "Catering",
      "DJ Setup",
      "Decoration",
    ],
    bookings: 15,
    imageUrl: "https://placehold.co/400x200/F0F0F0/888888?text=Venue+Image+1",
  },
  {
    id: 2,
    venueName: "Garden View Resort",
    rating: 4.6,
    status: "Pending",
    description:
      "Beautiful outdoor venue with lush gardens and modern amenities for memorable celebrations",
    location: "Mumbai, Maharashtra",
    guests: 300,
    price: "12,000/hr",
    amenities: ["Catering", "Swimming Pool", "Lawn", "Valet Parking"],
    bookings: 8,
    imageUrl: "https://placehold.co/400x200/F0F0F0/888888?text=Venue+Image+2",
  },
  {
    id: 3,
    venueName: "Crystal Grand Hall",
    rating: 4.2,
    status: "Rejected",
    description:
      "Modern conference hall with state-of-the-art facilities for business events",
    location: "Delhi, Delhi",
    guests: 200,
    price: "8,000/hr",
    amenities: [
      "Air Conditioning",
      "WiFi",
      "Sound System",
      "Projector",
      "Conference Setup",
    ],
    bookings: 3,
    imageUrl: "https://placehold.co/400x200/F0F0F0/888888?text=Venue+Image+3",
  },
  {
    id: 4,
    venueName: "Elegant Convention Center",
    rating: 4.9,
    status: "Approved",
    description:
      "Spacious convention center ideal for large exhibitions and corporate gatherings.",
    location: "Bengaluru, Karnataka",
    guests: 1000,
    price: "25,000/hr",
    amenities: [
      "High-speed WiFi",
      "Multiple Halls",
      "Food Court",
      "Event Planning",
    ],
    bookings: 22,
    imageUrl: "https://placehold.co/400x200/F0F0F0/888888?text=Venue+Image+4",
  },
  {
    id: 5,
    venueName: "Lakeside Retreat",
    rating: 4.5,
    status: "Pending",
    description:
      "Serene lakeside retreat perfect for intimate weddings and peaceful getaways.",
    location: "Pune, Maharashtra",
    guests: 150,
    price: "8,000/hr",
    amenities: ["Lake View", "Outdoor Seating", "Bonfire", "Cottages"],
    bookings: 5,
    imageUrl: "https://placehold.co/400x200/F0F0F0/888888?text=Venue+Image+5",
  },
  {
    id: 6,
    venueName: "Urban Loft Studio",
    rating: 4.0,
    status: "Approved",
    description:
      "Trendy urban loft for photoshoots, small workshops, and creative events.",
    location: "Chennai, Tamil Nadu",
    guests: 50,
    price: "5,000/hr",
    amenities: ["Natural Light", "Sound System", "Projector", "Kitchenette"],
    bookings: 10,
    imageUrl: "https://placehold.co/400x200/F0F0F0/888888?text=Venue+Image+6",
  },
];

const SearchAndFilter = ({
    onSearchChange,
    onStatusChange,
    onCityChange,
  }) => {
    return (
      <div classame="flex flex-col md:flex-row items-center justify-between mb-8 space-y-4 md:space-y-0 md:space-x-4">
        {/* Search Input */}
        <div className="relative flex-grow w-full md:w-auto">
          <input
            type="text"
            placeholder="Search venues by name or city..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            onChange={(e) => onSearchChange(e.target.value)}
          />
          <svg
            className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        {/* Filter Dropdowns */}
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 w-full md:w-auto">
          {/* Status Filter */}
          <select
            className="block w-full sm:w-48 px-4 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            onChange={(e) => onStatusChange(e.target.value)}
          >
            <option value="">All Status</option>
            <option value="Approved">Approved</option>
            <option value="Pending">Pending</option>
            <option value="Rejected">Rejected</option>
          </select>

          {/* City Filter */}
          <select
            className="block w-full sm:w-48 px-4 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            onChange={(e) => onCityChange(e.target.value)}
          >
            <option value="">All Cities</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Delhi">Delhi</option>
            <option value="Bengaluru">Bengaluru</option>
            <option value="Pune">Pune</option>
            <option value="Chennai">Chennai</option>
          </select>
        </div>
      </div>
    );
  };

  
  // const filteredVenues = venues.filter((venue) => {
  //   const matchesSearch =
  //     venue.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     venue.location?.toLowerCase().includes(searchTerm.toLowerCase());
  //   const matchesStatus = filterStatus ? venue.status === filterStatus : true;
  //   const matchesCity = filterCity
  //     ? venue.location?.includes(filterCity)
  //     : true;
  //   return matchesSearch && matchesStatus && matchesCity;
  // });

const OwnerVenuePage = ({ user }) => {
  const [venues, setVenues] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterCity, setFilterCity] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setVenues(mockVenues); // Replace with real API call later
  }, []);

  const handleAddVenueSuccess = (newVenue) => {
    setVenues((prev) => [...prev, newVenue]);
    setIsModalOpen(false);
  };

  const filteredVenues = venues.filter((venue) => {
    const matchesSearch =
      venue.venueName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      venue.location?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus ? venue.status === filterStatus : true;
    const matchesCity = filterCity
      ? venue.location?.includes(filterCity)
      : true;
    return matchesSearch && matchesStatus && matchesCity;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Venues</h1>
          <p className="text-gray-600 mt-1">
            Manage your venue listings and track their performance
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition duration-200"
        >
          Add Venue
        </button>
      </div>

      <SearchAndFilter
        onSearchChange={setSearchTerm}
        onStatusChange={setFilterStatus}
        onCityChange={setFilterCity}
      />

      {filteredVenues.length === 0 ? (
        <p className="text-center text-gray-600 text-lg mt-10">
          No venues found matching your criteria.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVenues.map((venue) => (
            <VenueCard key={venue.id || venue._id} venue={venue} />
          ))}
        </div>
      )}

      <AddVenueModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <VenueRegisterForm user={user} onSuccess={handleAddVenueSuccess} />
      </AddVenueModal>
    </div>
  );
};

export default OwnerVenuePage;