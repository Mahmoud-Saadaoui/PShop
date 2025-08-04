import React from 'react'

const Skeleton = ({ count = 6 }) => {
  return (
    <div className="animate-pulse space-y-6 mx-14">

      {/* Search input */}
      <div className="flex w-full rounded-md border border-gray-300">
        <div className="flex-grow px-4 py-2 bg-gray-200 rounded-l-md" />
        <div className="w-12 bg-gray-300 flex items-center justify-center rounded-r-md" />
      </div>

      {/* Layout with sidebar and content */}
      <div className="md:flex md:gap-6">

        {/* Sidebar Filters (hidden on mobile) */}
        <div className="hidden md:block md:w-1/4 space-y-6">
          {[1, 2].map((section) => (
            <div key={section} className="border border-gray-300 p-3 space-y-3">
              <div className="h-4 bg-gray-300 w-2/3 rounded" />
              {[1, 2, 3].map((item) => (
                <div key={item} className="h-4 bg-gray-200 w-3/4 rounded" />
              ))}
            </div>
          ))}
          <div className="h-10 bg-gray-300 rounded-md mt-4" />
        </div>

        {/* Products + Pagination */}
        <div className="md:w-3/4 space-y-6">

          {/* Product grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: count }).map((_, i) => (
              <div key={i} className="border border-gray-400 rounded-lg p-4 space-y-4 bg-white shadow-sm">
                <div className="w-full h-40 bg-gray-200 rounded-md" />
                <div className="h-4 bg-gray-300 w-3/4 rounded" />
                <div className="h-4 bg-gray-200 w-1/2 rounded" />
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center gap-4">
            <div className="w-20 h-8 bg-gray-200 rounded-md" />
            <div className="w-24 h-6 bg-gray-100 rounded-md" />
            <div className="w-20 h-8 bg-gray-200 rounded-md" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Skeleton