import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import UserVenueCard from "../common/UserVenueCard";
import { useFilterVenues } from "../../hooks/user/useFilterVenues";
import { useGetFavoriteVenueIds } from "../../hooks/user/useGetFavoriteVenueIds";
import { useToggleFavoriteVenue } from "../../hooks/user/useToggleFavoriteVenue";
import { useDebounce } from "../../hooks/useDebounce";

export default function VenueList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [capacityRange, setCapacityRange] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // ✅ Debounced filter values
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const debouncedCity = useDebounce(selectedCity, 300);
  const debouncedAmenities = useDebounce(selectedAmenities.join(","), 300);
  const debouncedCapacity = useDebounce(capacityRange, 300);
  const debouncedSort = useDebounce(sortOrder, 300);

  // ✅ Memoized filters object to prevent re-fetch on same values
  const filters = useMemo(() => ({
    search: debouncedSearchTerm || undefined,
    city: debouncedCity || undefined,
    capacityRange: debouncedCapacity || undefined,
    sort: debouncedSort || undefined,
    amenities: debouncedAmenities || undefined,
    page: currentPage,
    limit: 6,
  }), [debouncedSearchTerm, debouncedCity, debouncedCapacity, debouncedSort, debouncedAmenities, currentPage]);

  const { data, isLoading, isError, error } = useFilterVenues(filters);
  const venues = data?.data || [];
  const totalPages = data?.pages || 1;

  const { data: favoriteVenueIds = [], isLoading: favLoading } = useGetFavoriteVenueIds();
  const { mutate: toggleFavorite } = useToggleFavoriteVenue();

  // ✅ Reset page to 1 when filters (excluding page) change
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearchTerm, debouncedCity, debouncedAmenities, debouncedCapacity, debouncedSort]);

  const amenitiesList = [
    "WiFi", "Parking", "AC", "Rooftop Access", "Bar Service",
    "Garden Access", "Catering Services", "Stage Lighting",
  ];
  const cityList = [...new Set(venues.map((v) => v.location.city))];
  const capacityRanges = [
    { label: "Any", value: "" },
    { label: "1-50", value: "1-50" },
    { label: "51-100", value: "51-100" },
    { label: "101-200", value: "101-200" },
    { label: "201+", value: "201-" },
  ];

  const toggleAmenity = (amenity) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity) ? prev.filter((a) => a !== amenity) : [...prev, amenity]
    );
  };

  useEffect(() => {
  console.log("Search Term Changed:", searchTerm);
}, [searchTerm]);

  if (isLoading) return <div className="text-center py-20">Loading venues...</div>;
  if (isError) return <div className="text-center py-20 text-red-600">Error loading venues: {error.message}</div>;

  return (
    <div className="min-h-screen bg-[#fffdf8] px-6 md:px-12 py-16 font-sans">
      <div className="max-w-7xl mx-auto">
        <motion.h1
          className="text-4xl md:text-5xl font-serif text-center text-gray-800 mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Explore Our Premium Venues
        </motion.h1>

        <div className="md:hidden flex justify-between items-center mb-6">
          <button
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="bg-rose-500 text-white px-4 py-2 rounded-full shadow"
          >
            {mobileFilterOpen ? "Hide Filters" : "Show Filters"}
          </button>
        </div>

        {(mobileFilterOpen || window.innerWidth >= 768) && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
            <input
              type="text"
              placeholder="Search venues..."
              className="col-span-1 lg:col-span-2 px-4 py-3 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-rose-300 bg-white shadow-sm placeholder:text-gray-400"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <select
              className="px-4 py-3 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-rose-300 bg-white shadow-sm text-gray-700"
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
            >
              <option value="">All Locations</option>
              {cityList.map((city, idx) => (
                <option key={idx} value={city}>{city}</option>
              ))}
            </select>

            <select
              className="px-4 py-3 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-rose-300 bg-white shadow-sm text-gray-700"
              value={capacityRange}
              onChange={(e) => setCapacityRange(e.target.value)}
            >
              {capacityRanges.map((range, idx) => (
                <option key={idx} value={range.value}>{range.label}</option>
              ))}
            </select>

            <select
              className="px-4 py-3 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-rose-300 bg-white shadow-sm text-gray-700"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="">Sort by Price</option>
              <option value="low-to-high">Low to High</option>
              <option value="high-to-low">High to Low</option>
            </select>
          </div>
        )}

        <div className="flex flex-wrap gap-3 mb-10">
          {amenitiesList.map((amenity, idx) => (
            <button
              key={idx}
              onClick={() => toggleAmenity(amenity)}
              className={`px-4 py-2 rounded-full text-sm border transition duration-200 shadow-sm ${
                selectedAmenities.includes(amenity)
                  ? "bg-rose-500 text-white border-rose-500"
                  : "bg-white text-gray-700 border-gray-300"
              }`}
            >
              {amenity}
            </button>
          ))}
        </div>

        {venues.length === 0 ? (
          <p className="text-center text-gray-500 text-lg mt-20">No venues found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {venues.map((venue, index) => (
              <motion.div
                key={venue._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.5 }}
              >
                <UserVenueCard
                  venue={venue}
                  index={index}
                  isFavorite={favoriteVenueIds.includes(venue._id)}
                  onToggleFavorite={() => toggleFavorite(venue._id)}
                />
              </motion.div>
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex justify-center mt-12 space-x-2 flex-wrap">
            {Array.from({ length: totalPages }, (_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentPage(idx + 1)}
                className={`px-4 py-2 rounded-full text-sm font-medium shadow-sm border transition-all duration-200 ${
                  currentPage === idx + 1
                    ? "bg-rose-500 text-white"
                    : "bg-white text-gray-700 border-gray-300"
                }`}
              >
                {idx + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
