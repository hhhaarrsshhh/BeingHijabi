const CartCard = ({ productName, price, image }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg max-w-xs overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <img
        src={image}
        alt={productName}
        className="w-full h-48 object-cover"
      />
      <div className="p-4 flex flex-col items-center">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          {productName}
        </h3>
        <p className="text-gray-500 text-base">₹{price}</p>
        <button className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md font-medium hover:bg-red-600 transition duration-200">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default CartCard;
