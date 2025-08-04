import 'swiper/css';
import SectionHeader from '../SectionHeader';
import CustomSwiper from './CustomSwiper';
import { useFetchBrands } from '../../lib/queries/productsQueries';
import { BrandsSkeleton } from '../loaders/BrandsSkeleton';
import Alert from "../Alert"

export default function Brands() {
  const {
    data: brands,
    isPending: isBrandsPending,
    isError: isBrandsError,
    error: brandsError,
  } = useFetchBrands();
 
  if (isBrandsPending) return <BrandsSkeleton />
  if (isBrandsError) return <Alert message={brandsError.message || "Fetching Brands Is Failed"} type="error" />
  return (
    <div className="py-8 px-4 bg-gray-100 text-center">
      <SectionHeader 
        // title="Trusted by Leading Brands"
        description="We proudly collaborate with top global brands known for their quality, innovation, and customer satisfaction."
      />
      {brands && <CustomSwiper
        items={brands}
        renderItem={(brand) => (
          <div className="container flex items-center justify-center mx-auto">
            <img
              src={`https://logo.clearbit.com/${brand}.com`}
              alt={brand}
              className="h-8 w-auto object-contain grayscale hover:grayscale-0 transition duration-300"
            />
          </div>
        )}
        autoplayDelay={0}
      />}
    </div>
  );
}
