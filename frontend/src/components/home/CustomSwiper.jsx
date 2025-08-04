import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

export default function CustomSwiper({
  items,
  renderItem,
  autoplayDelay = 0,
  pauseOnMouseEnter = false,
}) {
  return (
      <Swiper
        modules={[Autoplay]}
        spaceBetween={30}
        loop={true}
        speed={3000}
        autoplay={{
          delay: autoplayDelay,
          disableOnInteraction: false,
          pauseOnMouseEnter,
        }}
        grabCursor={true}
        breakpoints={{
          0: { slidesPerView: 3 },
          768: { slidesPerView: 4 },
          1024: { slidesPerView: 5 },
        }}
      >
        {items?.map((item) => (
          <SwiperSlide key={item.id}>{renderItem(item)}</SwiperSlide>
        ))}
      </Swiper>
  );
}