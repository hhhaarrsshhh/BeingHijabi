import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import "swiper/css"; 
import "swiper/css/navigation"; 
import "swiper/css/pagination"; 


const Reviews = () => {
  const testimonials = [
    {
      name: "Saib Arsalan, IN",
      text: "I purchased 'Oudh E Tamasha' from FATIR Apparels and Perfumes. It has become my go-to fragrance...",
    },
    {
      name: "John Doe, US",
      text: "This fragrance has completely changed my perception of quality. It lasts all day and feels luxurious.",
    },
    {
      name: "Jane Smith, UK",
      text: "I absolutely love the calming effect it has. It's subtle but long-lasting, perfect for daily use.",
    },
    {
      name: "Michael Johnson, CA",
      text: "I highly recommend FATIR Apparels and Perfumes. The fragrance selection is amazing, and Oudh is my favorite.",
    },
  ];

  return (
    <div className="bg-black mb-[1px] ">
      <div className="max-w-7xl mx-auto py-16">
        <Swiper
          spaceBetween={50}
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
          slidesPerView={1}
          navigation={true}
          onSlideChange={() => console.log("slide change")}
          onSwiper={(swiper) => console.log(swiper)}
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index}>
              <div className="text-white p-6  text-center mb-28">
                <h3 className="font-bold text-2xl mb-2">{testimonial.name}</h3>
                <div className="w-8 h-[2px] bg-white mx-auto mb-8"></div>
                <p className="px-20 text-lg">{testimonial.text}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      {/* Add extra styling for arrows or pagination if needed */}
    </div>
  );
};

export default Reviews;
