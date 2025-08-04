import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { Link } from "react-router-dom"
import 'swiper/css';
import { useFetchBanners } from '../../lib/queries/bannerMutation';
import Spinner from "../loaders/Spinner"
import Alert from '../Alert';

export default function Brands() {
  const {
    data: banners,
    isPending: isBannersPending,
    isError: isBannersError,
    error: bannersError,
  } = useFetchBanners();
 
  if (isBannersPending) return <Spinner />
  if (isBannersError)
    return (
      <Alert
        message={bannersError.message || "Fetching Banners Is Failed"}
        type="error"
      />
    );
  return (
    <Swiper
      modules={[Autoplay]}
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      loop={true}
      slidesPerView={1}
      className="h-[calc(100vh-80px)]"
    >
      {banners?.map((banner) => (
        <SwiperSlide key={banner._id}>
          <div
            className="h-full w-full bg-cover bg-center text-white flex items-center justify-start px-10"
            style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.5)), url(${banner.image.secureUrl})`,
            }}
          >
            <div className="max-w-xl">
              <h1 className="text-4xl md:text-5xl font-black mb-4">
                {banner.title}
              </h1>
              <p className="text-base md:text-lg mb-8">{banner.description}</p>
              <Link 
                to="/products" 
                className="px-6 py-2 bg-[#e92932] text-white text-lg font-bold rounded-lg hover:bg-[#c3212a] transition-colors"
              >
                Shop Now
              </Link>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}