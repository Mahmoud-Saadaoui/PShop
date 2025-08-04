export default function SectionHeader({ title, description }) {
  return (
    <div className="text-center my-2">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
        {title}
      </h2>
      <p className="text-sm md:text-base text-gray-600 mb-6 max-w-2xl mx-auto">
        {description}
      </p>
    </div>
  );
}