import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
// Optional Swiper modules (navigation, pagination, autoplay, etc.)

const ShopCarousel = () => {
  return (
    <div className="bg-[#cacbca]">
      <div className="max-w-7xl mx-auto py-8">
        <div className="text-center  text-3xl mb-8 cursive--font">
          Shop the luxury by Fragrance Family
        </div>
        <Carousel />
      </div>
    </div>
  );
};

const Carousel = () => {
  const array = [
    { content: "Fresh", color: "red" },
    { content: "Floral", color: "green" },
    { content: "Fruity", color: "gray" },
    { content: "Oriental", color: "green" },
    { content: "Woody", color: "red" },
  ];

  return (
    <div className="max-w-7xl mx-auto ">
      <Swiper
        spaceBetween={50}
        _swiper={true}
        slidesPerView={4}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
      >
        {array.map((item, index) => {
          {/* console.log(item.color); */}
          const bg = "bg-" + item.color + "-500";
          {/* console.log(bg); */}
          return (
            <SwiperSlide key={index}>
              <div className="w-72 h-96 flex bg-white  items-center justify-center relative">
                <img src="" alt="" />
                <div
                  className={`${bg} text-5xl font-bold opacity-50 text-white flex items-center justify-center w-full`}
                >
                  {item.content}
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default ShopCarousel;
