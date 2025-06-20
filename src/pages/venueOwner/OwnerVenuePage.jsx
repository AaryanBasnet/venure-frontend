import React, { useEffect, useState } from "react";

import VenueCard from "../../components/common/VenueCard";



const mockVenues = [
  {
    id: 1,
    name: 'Royal Palace Banquet',
    rating: 4.8,
    status: 'Approved',
    description: 'Elegant banquet hall perfect for weddings and corporate events with traditional architecture',
    location: 'Mumbai, Maharashtra',
    guests: 500,
    price: '15,000/hr',
    amenities: ['Air Conditioning', 'Parking', 'Catering', 'DJ Setup', 'Decoration'],
    bookings: 15,
    imageUrl: 'https://placehold.co/400x200/F0F0F0/888888?text=Venue+Image+1',
  },
  {
    id: 2,
    name: 'Garden View Resort',
    rating: 4.6,
    status: 'Pending',
    description: 'Beautiful outdoor venue with lush gardens and modern amenities for memorable celebrations',
    location: 'Mumbai, Maharashtra',
    guests: 300,
    price: '12,000/hr',
    amenities: ['Catering', 'Swimming Pool', 'Lawn', 'Valet Parking'],
    bookings: 8,
    imageUrl: 'https://placehold.co/400x200/F0F0F0/888888?text=Venue+Image+2',
  },
  {
    id: 3,
    name: 'Crystal Grand Hall',
    rating: 4.2,
    status: 'Rejected',
    description: 'Modern conference hall with state-of-the-art facilities for business events',
    location: 'Delhi, Delhi',
    guests: 200,
    price: '8,000/hr',
    amenities: ['Air Conditioning', 'WiFi', 'Sound System', 'Projector', 'Conference Setup'],
    bookings: 3,
    imageUrl: 'https://placehold.co/400x200/F0F0F0/888888?text=Venue+Image+3',
  },
    {
    id: 4,
    name: 'Elegant Convention Center',
    rating: 4.9,
    status: 'Approved',
    description: 'Spacious convention center ideal for large exhibitions and corporate gatherings.',
    location: 'Bengaluru, Karnataka',
    guests: 1000,
    price: '25,000/hr',
    amenities: ['High-speed WiFi', 'Multiple Halls', 'Food Court', 'Event Planning'],
    bookings: 22,
    imageUrl: 'https://placehold.co/400x200/F0F0F0/888888?text=Venue+Image+4',
  },
  {
    id: 5,
    name: 'Lakeside Retreat',
    rating: 4.5,
    status: 'Pending',
    description: 'Serene lakeside retreat perfect for intimate weddings and peaceful getaways.',
    location: 'Pune, Maharashtra',
    guests: 150,
    price: '8,000/hr',
    amenities: ['Lake View', 'Outdoor Seating', 'Bonfire', 'Cottages'],
    bookings: 5,
    imageUrl: 'https://placehold.co/400x200/F0F0F0/888888?text=Venue+Image+5',
  },
  {
    id: 6,
    name: 'Urban Loft Studio',
    rating: 4.0,
    status: 'Approved',
    description: 'Trendy urban loft for photoshoots, small workshops, and creative events.',
    location: 'Chennai, Tamil Nadu',
    guests: 50,
    price: '5,000/hr',
    amenities: ['Natural Light', 'Sound System', 'Projector', 'Kitchenette'],
    bookings: 10,
    imageUrl: 'https://placehold.co/400x200/F0F0F0/888888?text=Venue+Image+6',
  },
];

const Button = ({ children, onClick, className = '', ...props }) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-md font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-opacity-75 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};



// Search and Filter Component
const SearchAndFilter = ({ onSearchChange, onStatusChange, onCityChange }) => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between mb-8 space-y-4 md:space-y-0 md:space-x-4">
      {/* Search Input */}
      <div className="relative flex-grow w-full md:w-auto">
        <input
          type="text"
          placeholder="Search venues by name or city..."
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          onChange={(e) => onSearchChange(e.target.value)}
        />
        <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
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


const OwnerVenuePage = () => {
  const [venues, setVenues] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterCity, setFilterCity] = useState('');

  
  useEffect(() => {
    // In a real application, you would fetch data from an API here
    // For now, using mock data
    setVenues(mockVenues);
  }, []);

  const handleSearchChange = (term) => {
    setSearchTerm(term.toLowerCase());
  };

  const handleStatusChange = (status) => {
    setFilterStatus(status);
  };

  const handleCityChange = (city) => {
    setFilterCity(city);
  };

  const filteredVenues = venues.filter(venue => {
    const matchesSearch = venue.name.toLowerCase().includes(searchTerm) ||
                          venue.location.toLowerCase().includes(searchTerm);
    const matchesStatus = filterStatus ? venue.status === filterStatus : true;
    const matchesCity = filterCity ? venue.location.includes(filterCity) : true; // Simple city match, could be improved

    return matchesSearch && matchesStatus && matchesCity;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Venues</h1>
          <p className="text-gray-600 mt-1">Manage your venue listings and track their performance</p>
        </div>
        <Button className="bg-purple-600 text-white hover:bg-purple-700 flex items-center space-x-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <span>Add Venue</span>
        </Button>
      </div>

      <SearchAndFilter
        onSearchChange={handleSearchChange}
        onStatusChange={handleStatusChange}
        onCityChange={handleCityChange}
      />

      {filteredVenues.length === 0 ? (
        <p className="text-center text-gray-600 text-lg mt-10">No venues found matching your criteria.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVenues.map((venue) => (
            <VenueCard key={venue.id} venue={venue} />
          ))}
        </div>
      )}
    </div>
  );
};

export default OwnerVenuePage;