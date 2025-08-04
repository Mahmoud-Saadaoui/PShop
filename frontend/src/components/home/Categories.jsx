import { Link } from "react-router-dom";
import SectionHeader from "../SectionHeader";
import CustomSwiper from "./CustomSwiper";
import { useFetchCategories } from "../../lib/queries/productsQueries";
import { BrandsSkeleton } from "../loaders/BrandsSkeleton";

export default function Categories() {
  const {
    data: categories,
    isPending: isCategoriesPending,
    isError: isCategoriesError,
    error: categoriesError,
  } = useFetchCategories();

  if (isCategoriesPending) return <BrandsSkeleton />
  if (isCategoriesError)
    return (
      <Alert
        message={categoriesError.message || "Fetching Categories Is Failed"}
        type="error"
      />
    );
  return (
    <div className="py-12 px-4 text-center bg-gray-50">
      <SectionHeader
        title="Explore Our Categories"
        description="Discover a wide range of product categories tailored to your needs."
      />
      <div dir="rtl">
        {categories &&  <CustomSwiper
          items={categories}
          renderItem={(category) => (
            <p className="text-base md:text-lg font-medium text-gray-700 hover:text-[#e92932] transition">
              {category}
            </p>
          )}
          autoplayDelay={1}
          pauseOnMouseEnter={true}
        />}
      </div>
    </div>
  );
}