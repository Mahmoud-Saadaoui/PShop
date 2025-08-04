import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

const Search = ({ onSearch }) => {
  const [searchText, setSearchText] = useState("");
  return (
    <div className="flex w-full rounded-md border border-gray-300">
      <input
        type="text"
        placeholder="Search products..."
        className="flex-grow px-4 py-2 focus:outline-none"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <button
        onClick={() => onSearch(searchText)}
        className="bg-gray-200 hover:bg-gray-300 px-4 flex items-center justify-center text-gray-600"
      >
        <FaSearch />
      </button>
    </div>
  );
};

export default React.memo(Search);