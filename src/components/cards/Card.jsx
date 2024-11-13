import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const Card = ({ image, route, productName, price }) => {
  const [showView, setShowView] = useState(false);
  function handleShowView() {
    setShowView((prev) => !prev);
  }
  const cardImageRef = useRef();
  useEffect(() => {
    gsap.from(cardImageRef.current, {
      y: 40,
      opacity: 0,
      duration: 0.4,
    });
  }, [showView]);

  return (
    <div className=" min-w-[330px] pb-5 ">
      <Link to={route} className="inline-block">
        <div
          className="w-full h-full relative overflow-hidden "
          onMouseEnter={handleShowView}
          onMouseLeave={handleShowView}
        >
          <img
            src={image}
            className={`w-full h-full -z-10 duration-200 transition-all ${showView ? "scale-110" : ""}`}
            alt="product-card"
          />
          {showView && (
            <div
              ref={cardImageRef}
              className="bg-white/40   p-3 z-10 opacity-100 absolute bottom-0 w-full text-black text-center cursive--font text-xl capitalize"
            >
              quick view
            </div>
          )}
        </div>
        <div className="bg-white p-4 text-center font-[300] rounded-b-lg ">
          <div className="text-xl text-left font-semibold">{productName}</div>
          <div className="text-left font-bold">₹{price}</div>
          <div className="text-sm text-gray-600 font-semibold text-left">
            Taxes included <span className="underline">Free shipping</span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Card;
