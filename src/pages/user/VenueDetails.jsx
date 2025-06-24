import React, { useState } from 'react';

const VenueDetails = () => {
  const venue = {
    venueName: 'Golden Hall',
    pricePerHour: 500,
    capacity: 300,
    location: {
      city: 'Kathmandu',
      state: 'Bagmati',
      country: 'Nepal',
      address: 'New Baneshwor, Kathmandu',
    },
    description:
      'An elegant multi-purpose hall perfect for weddings, corporate events, and special gatherings. Featuring state-of-the-art lighting, acoustics, and decor.',
    venueImages: [
      {
        filename: 'venue1.jpg',
        url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
      },
      {
        filename: 'venue2.jpg',
        url: 'https://images.unsplash.com/photo-1600585154209-c7e974c3186b?auto=format&fit=crop&w=800&q=80',
      },
      {
        filename: 'venue3.jpg',
        url: 'https://images.unsplash.com/photo-1600585154014-8beacd1b8a06?auto=format&fit=crop&w=800&q=80',
      },
    ],
    amenities: [
      'Air Conditioning',
      'Sound System',
      'Lighting',
      'Projector',
      'WiFi',
      'Parking Facility',
    ],
  };

  const [currentIndex, setCurrentIndex] = useState(0);
  const totalImages = venue.venueImages.length;

  const prevImage = () => {
    setCurrentIndex((prev) => (prev === 0 ? totalImages - 1 : prev - 1));
  };

  const nextImage = () => {
    setCurrentIndex((prev) => (prev === totalImages - 1 ? 0 : prev + 1));
  };

  return (
    <div className="px-10 py-8 font-sans">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-6">
        <div>
          <h1 className="text-4xl font-semibold text-gray-900">{venue.venueName}</h1>
          <p className="text-xl text-gray-700 mt-2">${venue.pricePerHour} / hour</p>
          <div className="text-sm text-gray-600 mt-2">
            {venue.capacity} People &middot; {venue.location.city}, {venue.location.state}
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
            src={venue.venueImages[currentIndex].url}
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
        <h2 className="text-3xl font-semibold text-center mb-10">Luxurious Features & Amenities</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 text-center">
          {venue.amenities.map((amenity, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <div className="text-3xl mb-3">🏷️</div>
              <h4 className="text-lg font-semibold">{amenity}</h4>
              <p className="text-sm text-gray-300 mt-1">Included in your booking</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VenueDetails;
