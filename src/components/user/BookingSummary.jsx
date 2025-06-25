import React from "react";

const BookingSummary = ({
  venueName,
  location,
  venueCost,
  selectedDate,
  selectedTimeSlot,
  timeSlots,
  currentStep,
  numberOfGuests,
  eventType,
  selectedAddons,
  addOns,
  calculateTotal
}) => {
  return (
    <div className="w-full lg:w-1/3 bg-gray-50 p-8 rounded-r-lg flex flex-col justify-between">
      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Booking Summary</h2>

        {/* Venue Info */}
        <div className="flex items-center mb-6">
          <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mr-4">
            <i className="fas fa-building text-gray-600"></i>
          </div>
          <div>
            <p className="font-semibold text-gray-800">{venueName || "Venue Name"}</p>
            <p className="text-sm text-gray-600">
              <i className="fas fa-map-marker-alt mr-1"></i>
              {location || "Location not available"}
            </p>
          </div>
        </div>

        <hr className="border-gray-200 my-6" />

        {/* Booking Info */}
        <div className="space-y-4">
          <div className="flex justify-between text-gray-700">
            <span>Date:</span>
            <span className="font-medium">
              {selectedDate
                ? selectedDate.toLocaleDateString("en-US", {
                    month: "numeric",
                    day: "numeric",
                    year: "numeric",
                  })
                : "N/A"}
            </span>
          </div>

          <div className="flex justify-between text-gray-700">
            <span>Time Slot:</span>
            <span className="font-medium">
              {selectedTimeSlot
                ? timeSlots.find((slot) => slot.id === selectedTimeSlot)?.label
                : "N/A"}
            </span>
          </div>

          <div className="flex justify-between text-gray-700">
            <span>Venue Cost (per hour):</span>
            <span className="font-medium">
              ₹{venueCost?.toLocaleString() || 0}
            </span>
          </div>

          {currentStep >= 2 && (
            <>
              <div className="flex justify-between text-gray-700">
                <span>No. of Guests:</span>
                <span className="font-medium">{numberOfGuests || "N/A"}</span>
              </div>

              <div className="flex justify-between text-gray-700">
                <span>Event Type:</span>
                <span className="font-medium">{eventType || "N/A"}</span>
              </div>
            </>
          )}

          {currentStep >= 3 && selectedAddons.length > 0 && (
            <div className="pt-2">
              <span className="font-medium text-gray-800">Add-ons:</span>
              <ul className="text-sm text-gray-600 pl-4 list-disc space-y-1">
                {selectedAddons.map((addonId) => {
                  const addon = addOns.find((a) => a.id === addonId);
                  return addon ? (
                    <li key={addon.id}>
                      {addon.name}: ₹
                      {addon.price.toLocaleString()}
                      {addon.perPerson &&
                        ` x ${numberOfGuests || 0} guest(s)`}
                    </li>
                  ) : null;
                })}
              </ul>
            </div>
          )}
        </div>

        <hr className="border-gray-200 my-6" />

        {/* Total */}
        <div className="flex justify-between items-center text-gray-900 text-xl font-bold mb-4">
          <span>Total:</span>
          <span>₹{calculateTotal().toLocaleString()}</span>
        </div>

        {/* Notes */}
        <ul className="text-gray-600 text-sm space-y-2 list-disc pl-5">
          <li>25% advance payment required</li>
          <li>Free cancellation up to 48 hours before the event</li>
          <li>All taxes included</li>
        </ul>
      </div>
    </div>
  );
};

export default BookingSummary;
