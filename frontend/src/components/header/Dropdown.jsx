import React from "react";
import { Link } from "react-router-dom";

const Dropdown = ({ setDropdownOpen, auth }) => {
  return (
    <div className="absolute right-0 top-12 mt-2 py-2 w-32 bg-white border border-gray-200 rounded-md shadow-lg z-50">
      {auth.isAdmin && (
        <Link
          to="/dashboard"
          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
          onClick={() => setDropdownOpen(false)}
        >
          Dashboard
        </Link>
      )}
      <Link
        to="/profile"
        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
        onClick={() => setDropdownOpen(false)}
      >
        Profile
      </Link>
      <Link
        to="/"
        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
        onClick={() => setDropdownOpen(false)}
      >
        Logout
      </Link>
    </div>
  );
};

export default Dropdown;