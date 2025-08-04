import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/pagination";

import ProductCard from "../products/ProductCard";
import Alert from "../Alert";
import Spinner from "../loaders/Spinner";
import { useFetchTopRatedProducts } from "../../lib/queries/productsQueries";
import SectionHeader from "../SectionHeader";

const TopRatedProducts = () => {
  const { data: topRatedProducts, isPending, isError, error } = useFetchTopRatedProducts()

  if (isPending) return <Spinner />
  if (isError)
    return (
      <Alert
        message={error.message || "Fetching Top Rated Products Failed"}
        type="error"
      />
    );
  return (
    <section className="w-full px-4 md:px-8 mx-auto my-4">
      <SectionHeader 
        title="Top Rated Products"
        description="Discover our highest-rated items based on customer reviews. Quality guaranteed!"
      />

      {/* Swiper */}
      <Swiper
        modules={[FreeMode, Pagination]}
        spaceBetween={16}
        freeMode={true}
        grabCursor={true}
        pagination={{ clickable: true }}
        className="mySwiper custom-pagination"
        breakpoints={{
          0: { slidesPerView: 1.2 },     
          480: { slidesPerView: 1.5 },     
          640: { slidesPerView: 2.2 },    
          768: { slidesPerView: 3.2 },     
          1024: { slidesPerView: 4.2 },    
        }}
      >
        {topRatedProducts?.map((product) => (
          <SwiperSlide key={product._id} className="pb-6">
            <ProductCard product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default TopRatedProducts;