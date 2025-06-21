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
import SearchInput from "../../components/common/SearchInput";
import { useGetVenues } from "../../hooks/admin/useGetVenues";

const backendBaseUrl = "http://localhost:5050/";

const getImageUrl = (path) =>
  path ? backendBaseUrl + path.replace(/^\/+/, "") : "";

const amenityIcons = {
  WiFi: <FaWifi />,
  Parking: <FaParking />,
  Pool: <FaSwimmingPool />,
  Bar: <MdOutlineLocalBar />,
  AC: <span className="font-bold text-xs">AC</span>,
};

const AdminVenuePage = () => {
  const [activeTab, setActiveTab] = useState("pending");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedVenue, setSelectedVenue] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const { data: venues = [], isLoading, isError, error } = useGetVenues();

  // Filter out venues missing essential data like location or venueName
  const filteredVenues = useMemo(() => {
    const validVenues = (venues || []).filter(
      (v) => v.venueName && v.location
    );

    let venuesByTab = validVenues;
    if (activeTab !== "all") {
      venuesByTab = validVenues.filter((venue) => venue.status === activeTab);
    }

    if (!searchQuery) return venuesByTab;

    return venuesByTab.filter(
      (venue) =>
        venue.venueName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        venue.location?.city?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [activeTab, venues, searchQuery]);

  const handleStatusChange = (venueId, newStatus) => {
    // Update locally for now; integrate mutation later
    // If you want to update the API, add mutation logic here
    // For demo, just closing modal
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

      {isLoading && (
        <div className="text-center py-12 text-blue-600 font-semibold">
          Loading venues...
        </div>
      )}

      {isError && (
        <div className="text-center py-12 text-red-600 font-semibold">
          Error loading venues: {error?.message}
        </div>
      )}

      {!isLoading && filteredVenues.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          No venues found matching your criteria.
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVenues.map((venue) => (
          <div
            key={venue._id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <img
              src={
                venue.venueImages && venue.venueImages.length > 0
                  ? getImageUrl(venue.venueImages[0].url)
                  : "https://via.placeholder.com/600x400?text=Venue+Image"
              }
              alt={venue.venueName}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-bold text-gray-800">
                    {venue.venueName}
                  </h2>
                  <p className="text-sm text-gray-500">
                    by {venue.owner?.name || "Unknown Owner"}
                  </p>
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
                <FiMapPin /> {venue.location?.city || "Unknown City"},{" "}
                {venue.location?.state || "Unknown State"}
              </p>
              <p className="text-xs text-gray-400 mt-2">
                Submitted:{" "}
                {venue.createdAt
                  ? new Date(venue.createdAt).toLocaleDateString()
                  : "N/A"}
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
                src={
                  selectedVenue.venueImages &&
                  selectedVenue.venueImages.length > 0
                    ? getImageUrl(
                        selectedVenue.venueImages[currentImageIndex].url
                      )
                    : "https://via.placeholder.com/600x400?text=Venue+Image"
                }
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
                  by {selectedVenue.owner?.name || "Unknown Owner"}
                </p>
                <p className="text-gray-700 mb-6">
                  {selectedVenue.description || "No description"}
                </p>
                <div className="grid grid-cols-2 gap-4 text-sm mb-6">
                  <div className="flex items-center gap-2 text-gray-600">
                    <FiMapPin size={20} className="text-blue-500" />{" "}
                    <div>
                      <strong>Location</strong>
                      <p>
                        {selectedVenue.location?.address || "Unknown Address"},{" "}
                        {selectedVenue.location?.city || "Unknown City"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <FiUsers size={20} className="text-blue-500" />{" "}
                    <div>
                      <strong>Capacity</strong>
                      <p>{selectedVenue.capacity || "N/A"} people</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <FiDollarSign size={20} className="text-blue-500" />{" "}
                    <div>
                      <strong>Price</strong>
                      <p>
                        $
                        {selectedVenue.pricePerHour !== undefined
                          ? selectedVenue.pricePerHour
                          : "N/A"}
                        /hour
                      </p>
                    </div>
                  </div>
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">Amenities</h3>
                <div className="flex flex-wrap gap-4 mb-6">
                  {selectedVenue.amenities && selectedVenue.amenities.length > 0 ? (
                    selectedVenue.amenities.map((amenity) => (
                      <div
                        key={amenity}
                        className="flex items-center gap-2 text-gray-700 bg-gray-100 px-3 py-1 rounded-full text-sm"
                      >
                        {amenityIcons[amenity] || amenity}
                        <span className="ml-1">{amenity}</span>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500">No amenities listed</p>
                  )}
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
