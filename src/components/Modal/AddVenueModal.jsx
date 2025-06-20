import React, { useState, useEffect } from 'react';

function AddVenueModal({ isOpen, onClose, onSave }) {
  const [venueData, setVenueData] = useState({
    venueName: '',
    description: '',
    address: '',
    city: '',
    state: '',
    country: '',
    capacity: '',
    pricePerHour: '',
    amenities: [],
    venueImages: [],
  });

  const [newAmenity, setNewAmenity] = useState('');

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setVenueData({
        venueName: '',
        description: '',
        address: '',
        city: '',
        state: '',
        country: '',
        capacity: '',
        pricePerHour: '',
        amenities: [],
        venueImages: [],
      });
      setNewAmenity('');
    }
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVenueData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddAmenity = () => {
    if (newAmenity.trim() !== '' && !venueData.amenities.includes(newAmenity.trim())) {
      setVenueData((prevData) => ({
        ...prevData,
        amenities: [...prevData.amenities, newAmenity.trim()],
      }));
      setNewAmenity('');
    }
  };

  const handleRemoveAmenity = (amenityToRemove) => {
    setVenueData((prevData) => ({
      ...prevData,
      amenities: prevData.amenities.filter((amenity) => amenity !== amenityToRemove),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(venueData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative">
        <div className="flex justify-between items-center pb-4 mb-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">Add New Venue</h2>
          <button
            className="text-gray-400 hover:text-gray-700 text-3xl leading-none transition duration-200"
            onClick={onClose}
          >
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Venue Name */}
          <div>
            <label htmlFor="venueName" className="block text-sm font-semibold text-gray-700 mb-2">
              Venue Name:
            </label>
            <input
              type="text"
              id="venueName"
              name="venueName"
              value={venueData.venueName}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-lg"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2">
              Description:
            </label>
            <textarea
              id="description"
              name="description"
              value={venueData.description}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-lg min-h-[100px] resize-y"
              maxLength="1000"
            ></textarea>
          </div>

          <h3 className="text-xl font-bold text-gray-700 mt-8 mb-4 border-b pb-2">Location Details</h3>
          {/* Address */}
          <div>
            <label htmlFor="address" className="block text-sm font-semibold text-gray-700 mb-2">
              Address:
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={venueData.address}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-lg"
            />
          </div>
          {/* City & State */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="city" className="block text-sm font-semibold text-gray-700 mb-2">
                City:
              </label>
              <input
                type="text"
                id="city"
                name="city"
                value={venueData.city}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-lg"
              />
            </div>
            <div>
              <label htmlFor="state" className="block text-sm font-semibold text-gray-700 mb-2">
                State:
              </label>
              <input
                type="text"
                id="state"
                name="state"
                value={venueData.state}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-lg"
              />
            </div>
          </div>
          {/* Country */}
          <div>
            <label htmlFor="country" className="block text-sm font-semibold text-gray-700 mb-2">
              Country:
            </label>
            <input
              type="text"
              id="country"
              name="country"
              value={venueData.country}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-lg"
            />
          </div>

          <h3 className="text-xl font-bold text-gray-700 mt-8 mb-4 border-b pb-2">Venue Specifics</h3>
          {/* Capacity */}
          <div>
            <label htmlFor="capacity" className="block text-sm font-semibold text-gray-700 mb-2">
              Capacity:
            </label>
            <input
              type="number"
              id="capacity"
              name="capacity"
              value={venueData.capacity}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-lg"
              min="1"
            />
          </div>
          {/* Price Per Hour */}
          <div>
            <label htmlFor="pricePerHour" className="block text-sm font-semibold text-gray-700 mb-2">
              Price Per Hour ($):
            </label>
            <input
              type="number"
              id="pricePerHour"
              name="pricePerHour"
              value={venueData.pricePerHour}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-lg"
              min="0"
            />
          </div>

          {/* Amenities */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Amenities:</label>
            <div className="flex gap-3 mb-3">
              <input
                type="text"
                value={newAmenity}
                onChange={(e) => setNewAmenity(e.target.value)}
                placeholder="Add amenity (e.g., WiFi, Parking)"
                className="flex-grow p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-lg"
              />
              <button
                type="button"
                onClick={handleAddAmenity}
                className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-5 rounded-lg transition duration-200"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {venueData.amenities.map((amenity, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-800 text-sm font-medium px-4 py-2 rounded-full flex items-center gap-2"
                >
                  {amenity}
                  <button
                    type="button"
                    onClick={() => handleRemoveAmenity(amenity)}
                    className="text-blue-800 hover:text-red-600 text-lg leading-none"
                  >
                    &times;
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Venue Images */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Venue Images:</label>
            <input
              type="file"
              id="venueImages"
              name="venueImages"
              multiple
              className="block w-full text-lg text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
            />
            <small className="text-gray-500 mt-2 block">
              (Image upload functionality is not implemented in this UI demo)
            </small>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 pt-6 border-t border-gray-200 mt-8">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg transition duration-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 shadow-md"
            >
              Add Venue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddVenueModal;