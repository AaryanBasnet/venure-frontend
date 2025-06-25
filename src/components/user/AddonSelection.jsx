import React from "react";
import { useFormikContext } from "formik";
import { useNavigate, useParams } from "react-router-dom";

// Define static addOns list (or you can receive it via props if preferred)
const addOns = [
  { id: "premium-decoration", name: "Premium Decoration", price: 15000 },
  { id: "professional-photography", name: "Photography", price: 25000 },
  { id: "premium-catering", name: "Catering", price: 800, perPerson: true },
  { id: "dj-sound-system", name: "DJ & Sound", price: 12000 },
  { id: "guest-transportation", name: "Transportation", price: 8000 },
];

const AddOnsSelectionPage = () => {
  const { values, setFieldValue } = useFormikContext();
  const { selectedAddons = [], numberOfGuests = 0 } = values;
  const navigate = useNavigate();

  const handleAddonToggle = (addonId) => {
    const updated = selectedAddons.includes(addonId)
      ? selectedAddons.filter((id) => id !== addonId)
      : [...selectedAddons, addonId];
    setFieldValue("selectedAddons", updated);
  };

  const { id } = useParams(); // ← Fixes the undefined `id`

  return (
    <>
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">Add-ons</h2>
      <p className="text-gray-600 mb-6">Choose additional services</p>

      <div className="space-y-4">
        {addOns.map((addon) => (
          <label
            key={addon.id}
            htmlFor={addon.id}
            className="flex items-center justify-between p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors duration-200"
          >
            <div className="flex items-center">
              <input
                type="checkbox"
                id={addon.id}
                className="form-checkbox h-5 w-5 text-purple-600 rounded"
                checked={selectedAddons.includes(addon.id)}
                onChange={() => handleAddonToggle(addon.id)}
              />
              <div className="ml-4">
                <p className="font-medium text-gray-800">{addon.name}</p>
                {addon.perPerson && (
                  <p className="text-sm text-gray-600">
                    Cost calculated as ₹{addon.price} × {numberOfGuests || 0}{" "}
                    guests
                  </p>
                )}
              </div>
            </div>
            <span className="font-semibold text-gray-800">
              Nrs.{addon.price.toLocaleString()}
              {addon.perPerson ? " per person" : ""}
            </span>
          </label>
        ))}
        <div className="mt-6 flex justify-between">
          <button
            type="button"
            onClick={() => navigate(`/checkout/${id}/guests`)}
            className="bg-gray-300 text-black px-4 py-2 rounded"
          >
            Back
          </button>
          <button
            type="button"
            onClick={() => navigate(`/checkout/${id}/payment`)}
            className="bg-purple-600 text-white px-4 py-2 rounded"
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default AddOnsSelectionPage;
