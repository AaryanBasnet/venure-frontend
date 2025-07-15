import React from "react";
import { useFormikContext } from "formik";

const BookingSummary = ({
  venueName,
  location,
  timeSlots, // Added timeSlots prop for internal calculation
  addOns, // Added addOns prop for internal calculation
  calculateTotal, // Now receives the actual calculateTotal function
}) => {
  const { values } = useFormikContext(); // Get the current form values from Formik context

  const {
    selectedDate,
    selectedTimeSlot,
    numberOfGuests,
    eventType,
    selectedAddons = [],
  } = values;

  const slot = timeSlots.find((slot) => slot.id === selectedTimeSlot);

  // Call calculateTotal with the current form values
  const total = calculateTotal ? calculateTotal(values) : 0;

  return (
    <div className="w-full p-6 bg-white border border-gray-200 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">Booking Summary</h3>

      {/* Venue Information */}
      <div className="mb-4">
        <p className="font-semibold text-gray-700">{venueName}</p>
        <p className="text-gray-500 text-sm">{location}</p>
      </div>

      {/* Date and Time Slot */}
      <div className="mb-4 text-gray-700">
        <p className="flex justify-between items-center mb-1">
          <span className="font-medium">Date:</span>
          <span>{selectedDate ? new Date(selectedDate).toLocaleDateString() : "Not selected"}</span>
        </p>
        <p className="flex justify-between items-center">
          <span className="font-medium">Time Slot:</span>
          <span>{slot ? slot.label : "Not selected"}</span>
        </p>
      </div>

      {/* Guests and Event Type */}
      <div className="mb-4 text-gray-700">
        <p className="flex justify-between items-center mb-1">
          <span className="font-medium">Guests:</span>
          <span>{numberOfGuests || 0}</span>
        </p>
        <p className="flex justify-between items-center">
          <span className="font-medium">Event Type:</span>
          <span>{eventType || "Not selected"}</span>
        </p>
      </div>

      {/* Add-ons */}
      <div className="mb-4">
        <p className="font-medium text-gray-700 mb-2">Add-ons:</p>
        {selectedAddons.length === 0 && <p className="text-gray-500 text-sm">None selected</p>}
        <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
          {selectedAddons.map((addonId) => {
            const addon = addOns.find((a) => a.id === addonId);
            if (!addon) return null;
            return (
              <li key={addon.id}>
                {addon.name}{" "}
                {addon.perPerson &&
                  `(Nrs.${addon.price.toLocaleString()} × ${numberOfGuests || 0})`}
              </li>
            );
          })}
        </ul>
      </div>

      {/* Total and Payment Details */}
      <div className="border-t border-gray-200 pt-4 mt-4">
        <p className="text-xl font-bold text-purple-600 flex justify-between items-center">
          <span>Total:</span>
          <span>Nrs.{total.toLocaleString()}</span>
        </p>
        <p className="text-xs text-gray-500 mt-2 leading-tight">
          • 25% advance payment required
          <br />
          • Free cancellation up to 48 hours
          <br />
          • All taxes included
        </p>
      </div>
    </div>
  );
};

export default BookingSummary;