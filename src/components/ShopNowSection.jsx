import { useNavigate } from "react-router-dom";

const ShopNowSection = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="bg-white py-12 px-8">
        <h2 className="text-center max-sm:text-left md:text-4xl text-3xl font-bold mb-4 cursive--font">
          Embrace The Affordable Luxury with Signature Scents from Fatir
        </h2>
        <p className="mx-auto w-fit text-center text-[18px] font-[300] text-secondary max-sm:text-left">
          Experience the Art of Scent. <br />
          The meticulous blending of various fragrance notes to encapsulate a
          unique and memorable <br />
          olfactory experience
        </p>
      </div>
      <div className="relative md:h-[600px] h-[300px] w-full bg-cover bg-center flex items-center justify-center">
        {/* Overlay for dimming the background */}
        <div className="absolute w-full h-full">
          <img
            src="https://static.wixstatic.com/media/b6bc2e_45daf509aeb84c5f970dabdf81c960cf~mv2.jpg/v1/fill/w_1520,h_714,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/b6bc2e_45daf509aeb84c5f970dabdf81c960cf~mv2.jpg"
            alt=""
            className="w-full h-52  md:h-80  lg:h-auto object-cover"
            />
        </div>
        {/* Content */}
        {/* Line of text */}

        {/* Shop More Button */}
        <button
          onClick={() => navigate("/productsforuser")}
          className="md:px-8 md:py-3 px-5 py-2 border-2 border-black/50 absolute bottom-20 hover:translate-y-1 w-fit rounded-full text-black text-lg font-medium  shadow-lg transform hover:text-white bg-white hover:bg-black transition-all duration-300 "
        >
          Shop More
        </button>
      </div>
    </>
  );
};

export default ShopNowSection;
