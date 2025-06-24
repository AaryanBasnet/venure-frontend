import React from "react";
import { FiSearch } from "react-icons/fi";

const SearchInput = ({ value, onChange, placeholder }) => {
  return (
    <div className="relative w-full sm:w-64">
      <FiSearch className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400 pointer-events-none" />
      <input
        type="text"
        placeholder={placeholder || "Search..."}
        value={value}
        onChange={onChange}
        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-poppins"
      />
    </div>
  );
};

export default SearchInput;
