import React from "react";
const  AddOnsSelectionPage = ({ addOns, selectedAddons, handleAddonToggle, numberOfGuests }) => {
  return (
    <>
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">Add-ons</h2>
      <p className="text-gray-600 mb-6">Choose additional services</p>

      <div className="space-y-4">
        {addOns.map(addon => (
          <label
            key={addon.id} htmlFor={addon.id}
            className="flex items-center justify-between p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors duration-200"
          >
            <div className="flex items-center">
              <input
                type="checkbox" id={addon.id} className="form-checkbox h-5 w-5 text-purple-600 rounded"
                checked={selectedAddons.includes(addon.id)} onChange={() => handleAddonToggle(addon.id)}
              />
              <div className="ml-4">
                <p className="font-medium text-gray-800">{addon.name}</p>
                <p className="text-sm text-gray-600">{addon.description}</p>
              </div>
            </div>
            <span className="font-semibold text-gray-800">
              ₹{addon.price.toLocaleString()}{addon.perPerson ? ' per person' : ''}
            </span>
          </label>
        ))}
      </div>
    </>
  );
};

export default AddOnsSelectionPage;
