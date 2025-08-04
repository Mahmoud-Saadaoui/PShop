import React from "react";

export default function SingleProductSkeleton() {
  return (
    <section className="container mx-auto px-6 py-6 grid grid-cols-1 md:grid-cols-2 gap-10 text-gray-800 items-stretch animate-pulse">
      {/* Image Skeleton */}
      <div className="relative">
        <div className="aspect-square w-full h-full rounded-xs border border-gray-200 bg-gray-200" />
        <div className="absolute left-1/2 -translate-x-1/2 -bottom-4 flex gap-2 px-4 py-2">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="w-16 h-16 bg-gray-300 rounded border border-gray-400"
            />
          ))}
        </div>
      </div>

      {/* Details Skeleton */}
      <div className="space-y-4">
        <div className="h-4 w-24 bg-gray-300 rounded" />
        <div className="flex justify-between items-center">
          <div className="h-6 w-2/3 bg-gray-300 rounded" />
          <div className="h-6 w-20 bg-gray-300 rounded" />
        </div>
        <hr className="border border-gray-200" />
        <div className="space-y-2">
          <div className="h-4 w-full bg-gray-300 rounded" />
          <div className="h-4 w-5/6 bg-gray-300 rounded" />
          <div className="h-4 w-2/3 bg-gray-300 rounded" />
        </div>
        <hr className="border border-gray-200" />
        <div className="flex justify-between items-center">
          <div className="h-8 w-24 bg-gray-300 rounded" />
          <div className="h-4 w-20 bg-gray-300 rounded" />
        </div>
        <hr className="border border-gray-200" />
        <div className="flex justify-center gap-4">
          <div className="h-10 w-10 bg-gray-300 rounded" />
          <div className="h-10 w-20 bg-gray-300 rounded" />
          <div className="h-10 w-10 bg-gray-300 rounded" />
        </div>
        <hr className="border border-gray-200" />
        <div className="flex justify-between items-center">
          <div className="h-10 w-40 bg-gray-300 rounded" />
          <div className="h-4 w-24 bg-gray-300 rounded" />
        </div>
      </div>
    </section>
  );
}
