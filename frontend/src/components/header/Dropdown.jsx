import React from "react";

const Dropdown = ({ setDropdownOpen }) => {
  return (
    <div className="absolute right-0 top-12 mt-2 py-2 w-32 bg-white border border-gray-200 rounded-md shadow-lg z-50">
      <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition">
        Profile
      </button>
      <button
        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
        onClick={() => setDropdownOpen(false)}
      >
        Logout
      </button>
    </div>
  );
};

export default Dropdown;
