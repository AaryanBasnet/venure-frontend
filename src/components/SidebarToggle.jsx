import React from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const SidebarToggle = ({ open, setOpen }) => {
  return (
    <button
      className="p-2 rounded-md bg-gray-100 hover:bg-gray-200"
      onClick={() => setOpen(!open)}
    >
      {open ? <FiChevronLeft size={18} /> : <FiChevronRight size={18} />}
    </button>
  );
};

export default SidebarToggle;
