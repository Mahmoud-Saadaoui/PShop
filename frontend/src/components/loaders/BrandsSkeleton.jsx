export const BrandsSkeleton = () => {
  return (
    <div className="py-8 px-4 bg-white my-8 text-center animate-pulse">
      {/* Fake SectionHeader */}
      <div className="space-y-2 mb-8">
        <div className="mx-auto h-6 w-48 bg-gray-300 rounded" />
        <div className="mx-auto h-4 w-80 bg-gray-200 rounded" />
      </div>

      {/* Fake brand logos */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className="h-12 bg-gray-200 rounded w-full mx-auto"
          />
        ))}
      </div>
    </div>
  );
};
