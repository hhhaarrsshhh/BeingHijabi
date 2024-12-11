import "swiper/css";
import "swiper/css"; 
import "swiper/css/navigation"; 
import "swiper/css/pagination";


const ShopCarousel = () => {
  return (
    <div className="bg-[#cacbca]">
      <div className="py-8">
        <div className="text-center  text-4xl mb-8 cursive--font">
          Shop the luxury by Fragrance Family
        </div>
        <Carousel />
      </div>
    </div>
  );
};

const Carousel = () => {
  function scroll(distance) {
    document.querySelector(".overflow-x-auto").scrollBy({
      top: 0,
      left: distance,
      behavior: "smooth",
    });
  }
  const array = [
    { content: "Fresh", color: "red", image: "fresh.jpg" },
    { content: "Floral", color: "green", image: "floral.jpg" },
    { content: "Fruity", color: "gray", image: "fruity.jpg" },
    { content: "Oriental", color: "green", image: "oriental.jpg" },
    { content: "Woody", color: "red", image: "woody.jpg" },
  ];

  return (
    <div className=" max-w-7xl mx-auto">
      {/* <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        scrollbar={{ draggable: true }}
        slidesPerView={4}
        navigation={true}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
      >
        {array.map((item, index) => {
          return (
            <SwiperSlide key={index}>
              <div className="w-72 h-96 flex bg-white/40  items-center justify-center relative">
                <img
                  src={item.image}
                  className=" absolute top-0 left-0 w-full h-full"
                  alt=""
                />
                <div>{item.content}</div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper> */}
      <div className="relative">
        <div className="flex overflow-x-auto w-14 space-x-4 scrollbar-hide">
          {array.map((item, index) => {
            return (
              <div
                className="w-72 h-96 flex bg-white/40  items-center justify-center relative "
                key={index}
              >
                <img
                  src={item.image}
                  className=" absolute top-0 left-0 w-full h-full"
                  alt=""
                />
                <div>{item.content}</div>
              </div>
            );
          })}
        </div>

        {/* Optional: Previous/Next Buttons */}
        <button
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-500 p-2 text-white"
          onClick={() => scroll(-200)}
        >
          &#8249;
        </button>
        <button
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-500 p-2 text-white"
          onClick={() => scroll(200)}
        >
          &#8250;
        </button>
      </div>
    </div>
  );
};

export default ShopCarousel;
