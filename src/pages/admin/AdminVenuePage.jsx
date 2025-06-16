import React, { useState, useMemo } from "react";
import {
  FiMapPin,
  FiUsers,
  FiDollarSign,
  FiCheck,
  FiX,
  FiClock,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import { FaWifi, FaParking, FaSwimmingPool } from "react-icons/fa";
import { MdOutlineLocalBar } from "react-icons/md";
import SearchInput from "../../components/common/SearchInput"; // Import the new component

// --- MOCK DATA ---
const initialVenues = [
  {
    _id: "64a5f4f8e6b3c2a4a8d4b8b1",
    owner: { name: "Alice Johnson" },
    venueName: "The Grand Hall",
    location: {
      address: "123 Main St",
      city: "Metropolis",
      state: "NY",
      country: "USA",
    },
    capacity: 250,
    venueImages: [
      { url: "https://placehold.co/600x400/a3e635/ffffff?text=Venue+1" },
      { url: "https://placehold.co/600x400/6ee7b7/ffffff?text=View+2" },
    ],
    description: "A luxurious hall perfect for weddings and corporate events.",
    amenities: ["WiFi", "Parking", "AC", "Bar"],
    pricePerHour: 200,
    status: "pending",
    createdAt: new Date("2023-09-15T10:00:00Z"),
  },
  {
    _id: "64a5f4f8e6b3c2a4a8d4b8b2",
    owner: { name: "Bob Williams" },
    venueName: "Sunset Terrace",
    location: {
      address: "456 Ocean Dr",
      city: "Vice City",
      state: "FL",
      country: "USA",
    },
    capacity: 100,
    venueImages: [
      { url: "https://placehold.co/600x400/fb923c/ffffff?text=Venue+2" },
    ],
    description: "A beautiful outdoor terrace with stunning ocean views.",
    amenities: ["WiFi", "Pool", "Bar"],
    pricePerHour: 150,
    status: "approved",
    createdAt: new Date("2023-09-14T14:30:00Z"),
  },
  {
    _id: "64a5f4f8e6b3c2a4a8d4b8b3",
    owner: { name: "Charlie Brown" },
    venueName: "The Warehouse Loft",
    location: {
      address: "789 Industrial Way",
      city: "Liberty City",
      state: "CA",
      country: "USA",
    },
    capacity: 300,
    venueImages: [
      { url: "https://placehold.co/600x400/f87171/ffffff?text=Venue+3" },
    ],
    description: "A rustic, industrial-style loft for unique events.",
    amenities: ["Parking", "AC"],
    pricePerHour: 180,
    status: "rejected",
    createdAt: new Date("2023-09-12T09:00:00Z"),
  },
  {
    _id: "64a5f4f8e6b3c2a4a8d4b8b4",
    owner: { name: "Diana Prince" },
    venueName: "Lakeside Retreat",
    location: {
      address: "101 Lakeview Rd",
      city: "Smallville",
      state: "KS",
      country: "USA",
    },
    capacity: 50,
    venueImages: [
      { url: "https://placehold.co/600x400/60a5fa/ffffff?text=Venue+4" },
    ],
    description: "A quiet and serene retreat by the lake.",
    amenities: ["WiFi", "Parking"],
    pricePerHour: 80,
    status: "pending",
    createdAt: new Date("2023-09-16T11:00:00Z"),
  },
];

const amenityIcons = {
  WiFi: <FaWifi />,
  Parking: <FaParking />,
  Pool: <FaSwimmingPool />,
  Bar: <MdOutlineLocalBar />,
  AC: <span className="font-bold text-xs">AC</span>,
};

const AdminVenuePage = () => {
  const [venues, setVenues] = useState(initialVenues);
  const [activeTab, setActiveTab] = useState("pending");
  const [searchQuery, setSearchQuery] = useState(""); // State for search
  const [selectedVenue, setSelectedVenue] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const filteredVenues = useMemo(() => {
    let venuesByTab = venues;
    if (activeTab !== "all") {
      venuesByTab = venues.filter((venue) => venue.status === activeTab);
    }

    if (!searchQuery) return venuesByTab;

    return venuesByTab.filter(
      (venue) =>
        venue.venueName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        venue.location.city.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [activeTab, venues, searchQuery]);

  const handleStatusChange = (venueId, newStatus) => {
    setVenues(
      venues.map((v) => (v._id === venueId ? { ...v, status: newStatus } : v))
    );
    setSelectedVenue(null);
  };

  const openModal = (venue) => {
    setSelectedVenue(venue);
    setCurrentImageIndex(0);
  };

  const nextImage = () => {
    if (!selectedVenue) return;
    setCurrentImageIndex(
      (prev) => (prev + 1) % selectedVenue.venueImages.length
    );
  };

  const prevImage = () => {
    if (!selectedVenue) return;
    setCurrentImageIndex(
      (prev) =>
        (prev - 1 + selectedVenue.venueImages.length) %
        selectedVenue.venueImages.length
    );
  };

  const tabs = ["pending", "approved", "rejected", "all"];
  const statusConfig = {
    pending: { color: "yellow-500", text: "Pending", Icon: FiClock },
    approved: { color: "green-500", text: "Approved", Icon: FiCheck },
    rejected: { color: "red-500", text: "Rejected", Icon: FiX },
  };

  return (
    <div className="p-4 sm:p-6 bg-gray-50 min-h-screen font-poppins">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold text-gray-800">Venue Applications</h1>
        <SearchInput
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by venue or city"
        />
      </div>

      <div className="flex border-b border-gray-200 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-medium capitalize transition-colors ${
              activeTab === tab
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVenues.map((venue) => (
          <div
            key={venue._id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <img
              src={venue.venueImages[0].url}
              alt={venue.venueName}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-bold text-gray-800">
                    {venue.venueName}
                  </h2>
                  <p className="text-sm text-gray-500">by {venue.owner.name}</p>
                </div>
                <div
                  className={`flex items-center gap-2 text-xs font-semibold px-2 py-1 rounded-full bg-${statusConfig[
                    venue.status
                  ].color.replace("-500", "-100")} text-${
                    statusConfig[venue.status].color
                  }`}
                >
                  {React.createElement(statusConfig[venue.status].Icon)}
                  {statusConfig[venue.status].text}
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-2 flex items-center gap-2">
                <FiMapPin /> {venue.location.city}, {venue.location.state}
              </p>
              <p className="text-xs text-gray-400 mt-2">
                Submitted: {new Date(venue.createdAt).toLocaleDateString()}
              </p>
              <button
                onClick={() => openModal(venue)}
                className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
        {filteredVenues.length === 0 && (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-500">
              No venues found matching your criteria.
            </p>
          </div>
        )}
      </div>

      {selectedVenue && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4"
          onClick={() => setSelectedVenue(null)}
        >
          <div
            className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col md:flex-row overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full md:w-1/2 relative bg-gray-100">
              <img
                src={selectedVenue.venueImages[currentImageIndex].url}
                alt="Venue"
                className="w-full h-64 md:h-full object-cover"
              />
              {selectedVenue.venueImages.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      prevImage();
                    }}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/70 p-2 rounded-full hover:bg-white"
                  >
                    <FiChevronLeft />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      nextImage();
                    }}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/70 p-2 rounded-full hover:bg-white"
                  >
                    <FiChevronRight />
                  </button>
                </>
              )}
            </div>
            <div className="w-full md:w-1/2 p-6 flex flex-col overflow-y-auto">
              <div className="flex-grow">
                <span
                  className={`text-xs font-semibold px-2 py-1 rounded-full bg-${statusConfig[
                    selectedVenue.status
                  ].color.replace("-500", "-100")} text-${
                    statusConfig[selectedVenue.status].color
                  } inline-block`}
                >
                  {statusConfig[selectedVenue.status].text}
                </span>
                <h2 className="text-3xl font-bold text-gray-800 mt-2">
                  {selectedVenue.venueName}
                </h2>
                <p className="text-sm text-gray-500 mb-4">
                  by {selectedVenue.owner.name}
                </p>
                <p className="text-gray-700 mb-6">
                  {selectedVenue.description}
                </p>
                <div className="grid grid-cols-2 gap-4 text-sm mb-6">
                  <div className="flex items-center gap-2 text-gray-600">
                    <FiMapPin size={20} className="text-blue-500" />{" "}
                    <div>
                      <strong>Location</strong>
                      <p>
                        {selectedVenue.location.address},{" "}
                        {selectedVenue.location.city}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <FiUsers size={20} className="text-blue-500" />{" "}
                    <div>
                      <strong>Capacity</strong>
                      <p>{selectedVenue.capacity} people</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <FiDollarSign size={20} className="text-blue-500" />{" "}
                    <div>
                      <strong>Price</strong>
                      <p>${selectedVenue.pricePerHour}/hour</p>
                    </div>
                  </div>
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">Amenities</h3>
                <div className="flex flex-wrap gap-4 mb-6">
                  {selectedVenue.amenities.map((amenity) => (
                    <div
                      key={amenity}
                      className="flex items-center gap-2 text-gray-700 bg-gray-100 px-3 py-1 rounded-full text-sm"
                    >
                      {amenityIcons[amenity] || amenity}
                      <span className="ml-1">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
              {selectedVenue.status === "pending" && (
                <div className="mt-auto pt-6 border-t flex gap-4">
                  <button
                    onClick={() =>
                      handleStatusChange(selectedVenue._id, "approved")
                    }
                    className="flex-1 flex items-center justify-center gap-2 bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors"
                  >
                    <FiCheck /> Approve
                  </button>
                  <button
                    onClick={() =>
                      handleStatusChange(selectedVenue._id, "rejected")
                    }
                    className="flex-1 flex items-center justify-center gap-2 bg-red-500 text-white py-3 rounded-lg font-semibold hover:bg-red-600 transition-colors"
                  >
                    <FiX /> Reject
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminVenuePage;
