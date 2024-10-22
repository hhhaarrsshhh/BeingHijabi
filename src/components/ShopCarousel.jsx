import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
// Optional Swiper modules (navigation, pagination, autoplay, etc.)

const ShopCarousel = () => {
  return (
    <div>
      <div className="max-w-7xl mx-auto py-8">
        <div className="text-center font-bold text-3xl mb-8">
          Shop the luxury by Fragrance Family
        </div>
        <Carousel />
      </div>
    </div>
  );
};

const Carousel = () => {
  const array = [1, 23, 4, 5, 67, 32, 67, 32];
  return (
    <div className="max-w-7xl mx-auto">
      <Swiper
        spaceBetween={50}
        _swiper={true}
        slidesPerView={3}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
      >
        {array.map((item, index) => {
          return (
            <SwiperSlide key={index}>
              <div className="w-96 h-96 flex  items-center justify-center relative">
                <img src="" alt="" />
                <div className="bg-cyan-500 h-10 w-full">{item}</div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default ShopCarousel;
