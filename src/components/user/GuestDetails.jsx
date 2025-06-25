import React from "react";
import { useFormikContext } from "formik";
import { useNavigate, useParams } from "react-router-dom";

const GuestDetailsPage = () => {
  const { values, setFieldValue } = useFormikContext();
  const navigate = useNavigate();
  const { id } = useParams(); // ← Fixes the undefined `id`

  return (
    <>
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">
        Guest Details
      </h2>
      <p className="text-gray-600 mb-6">Provide guest count and requirements</p>

      <div className="mb-6">
        <label
          htmlFor="numberOfGuests"
          className="block text-xl font-medium text-gray-800 mb-4"
        >
          Number of Guests
        </label>
        <input
          type="number"
          id="numberOfGuests"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
          placeholder="Enter guest count"
          value={values.numberOfGuests}
          onChange={(e) => setFieldValue("numberOfGuests", e.target.value)}
        />
      </div>

      <div className="mb-6">
        <label
          htmlFor="eventType"
          className="block text-xl font-medium text-gray-800 mb-4"
        >
          Event Type
        </label>
        <select
          id="eventType"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
          value={values.eventType}
          onChange={(e) => setFieldValue("eventType", e.target.value)}
        >
          <option value="">Select event type</option>
          <option value="wedding">Wedding</option>
          <option value="birthday">Birthday Party</option>
          <option value="corporate">Corporate Event</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div className="mb-6">
        <label
          htmlFor="specialRequirements"
          className="block text-xl font-medium text-gray-800 mb-4"
        >
          Special Requirements
        </label>
        <textarea
          id="specialRequirements"
          rows="4"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 resize-y"
          placeholder="Any special requirements or notes..."
          value={values.specialRequirements}
          onChange={(e) => setFieldValue("specialRequirements", e.target.value)}
        ></textarea>
      </div>

      <div>
        <h3 className="text-xl font-medium text-gray-800 mb-4">
          Contact Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="contactName"
              className="block text-gray-700 text-sm font-medium mb-1"
            >
              Contact Name
            </label>
            <input
              type="text"
              id="contactName"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
              placeholder="Your name"
              value={values.contactName}
              onChange={(e) => setFieldValue("contactName", e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="phoneNumber"
              className="block text-gray-700 text-sm font-medium mb-1"
            >
              Phone Number
            </label>
            <input
              type="tel"
              id="phoneNumber"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
              placeholder="Your phone number"
              value={values.phoneNumber}
              onChange={(e) => setFieldValue("phoneNumber", e.target.value)}
            />
          </div>
        </div>
        <div className="mt-6 flex justify-between">
          <button
            type="button"
            onClick={() => navigate("../")}
            className="bg-gray-300 text-black px-4 py-2 rounded"
          >
            Back
          </button>
          <button
            type="button"
            onClick={() => navigate(`/checkout/${id}/addons`)}
            className="bg-purple-600 text-white px-4 py-2 rounded"
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default GuestDetailsPage;
