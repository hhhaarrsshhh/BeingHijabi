import React from "react";
import { useNavigate } from "react-router-dom";

const ProductDetail = ({ product, closeModal }) => {
  const navigate = useNavigate();

  const handleBuyNow = () => {
    navigate("/checkout", {
      state: {
        product,
        quantity: 1, // Default quantity can be set here
      },
    });
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl relative">
        {/* Close Button */}
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-gray-600 text-xl"
        >
          X
        </button>

        {/* Product Details */}
        <div className="flex flex-col md:flex-row items-center">
          {/* Product Image */}
          <div className="w-full md:w-1/2 mb-4 md:mb-0">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-auto object-cover rounded-md"
            />
          </div>

          {/* Product Info */}
          <div className=" md:ml-8 text-center md:text-left">
            <h2 className="text-3xl font-semibold text-gray-800">{product.name}</h2>
            <p className="text-lg text-gray-600 font-medium mt-2">₹{product.price}</p>
            <p className="text-sm text-gray-500 mt-2">Taxes Included | Free Shipping</p>

            {/* Add to Cart and Buy Now Buttons */}
            <div className="mt-6 space-y-2">
              <button className="bg-black text-white px-6 py-2 rounded-md hover:bg-yellow-600 focus:outline-none">
                Add to Cart
              </button>
              <br />
              <button
                className="bg-black text-white px-9 py-2 rounded-md hover:bg-yellow-600 focus:outline-none"
                onClick={handleBuyNow}
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
