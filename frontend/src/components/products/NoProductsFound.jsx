import { IoAlertCircleOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

const NoProductsFound = ({ onClearFilters }) => {
  return (
    <div className="col-span-full flex flex-col items-center justify-center text-center p-6 border border-gray-300 rounded-xl text-gray-500 dark:text-gray-400 shadow-sm">
      <IoAlertCircleOutline className="text-4xl mb-2 text-yellow-500" />
      <p className="text-lg font-semibold">No products found</p>
      <p className="text-sm mb-4">Try adjusting your filters or search term.</p>

      <div className="flex gap-4">
        {onClearFilters && (
          <button
            onClick={onClearFilters}
            className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
          >
            Clear filters
          </button>
        )}
        <Link
          to="/"
          className="px-4 py-2 border border-yellow-500 text-yellow-500 rounded hover:bg-yellow-50 transition"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NoProductsFound