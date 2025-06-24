import React from "react";
const  GuestDetailsPage = ({
  numberOfGuests, setNumberOfGuests,
  eventType, setEventType,
  specialRequirements, setSpecialRequirements,
  contactName, setContactName,
  phoneNumber, setPhoneNumber,
}) => {
  return (
    <>
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">Guest Details</h2>
      <p className="text-gray-600 mb-6">Provide guest count and requirements</p>

      <div className="mb-6">
        <label htmlFor="numGuests" className="block text-xl font-medium text-gray-800 mb-4">Number of Guests</label>
        <input
          type="number" id="numGuests" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
          placeholder="Enter guest count" value={numberOfGuests} onChange={(e) => setNumberOfGuests(e.target.value)}
        />
      </div>

      <div className="mb-6">
        <label htmlFor="eventType" className="block text-xl font-medium text-gray-800 mb-4">Event Type</label>
        <select
          id="eventType" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
          value={eventType} onChange={(e) => setEventType(e.target.value)}
        >
          <option value="">Select event type</option>
          <option value="wedding">Wedding</option>
          <option value="birthday">Birthday Party</option>
          <option value="corporate">Corporate Event</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div className="mb-6">
        <label htmlFor="specialRequirements" className="block text-xl font-medium text-gray-800 mb-4">Special Requirements</label>
        <textarea
          id="specialRequirements" rows="4" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 resize-y"
          placeholder="Any special requirements or notes..." value={specialRequirements} onChange={(e) => setSpecialRequirements(e.target.value)}
        ></textarea>
      </div>

      <div>
        <h3 className="text-xl font-medium text-gray-800 mb-4">Contact Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="contactName" className="block text-gray-700 text-sm font-medium mb-1">Contact Name</label>
            <input
              type="text" id="contactName" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
              placeholder="Your name" value={contactName} onChange={(e) => setContactName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="phoneNumber" className="block text-gray-700 text-sm font-medium mb-1">Phone Number</label>
            <input
              type="tel" id="phoneNumber" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
              placeholder="Your phone number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default GuestDetailsPage;