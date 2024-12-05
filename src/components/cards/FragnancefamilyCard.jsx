import { useState } from "react";
import ProductDetail from "./ProductDetail";
import products from "../ProductData/product";

const FragranceFamilyCard = () => {
  const [visibleProducts, setVisibleProducts] = useState(8); // Initially show 8 products
  const [selectedProduct, setSelectedProduct] = useState(null); // To manage the selected product

  // Function to handle loading more products
  const handleLoadMore = () => {
    setVisibleProducts((prevVisible) => prevVisible + 8); // Load 8 more products
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product); // Open product details on click
  };

  const closeModal = () => {
    setSelectedProduct(null); // Close the modal by setting selectedProduct to null
  };

  const handleAddToCart = (product) => {
    // Logic for adding the product to the cart
    console.log(`${product.name} added to cart.`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.slice(0, visibleProducts).map((product, index) => (
          <div
            key={index}
            className="relative flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow-md p-4 transition transform hover:scale-105"
            onClick={() => handleProductClick(product)} // Show product detail when clicked
          >
            {/* Conditionally render "New Arrival" tag */}
            {product.newArrival && (
              <div className="absolute z-40 top-0 left-0 bg-[rgb(154,42,72)] text-white px-2 py-1 text-xs font-semibold">
                New Arrival
              </div>
            )}
            <div className="w-full relative overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover rounded-md"
              />
            </div>
            <div className="mt-4 text-left space-y-1">
              <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
              <p className="text-gray-600 font-medium">From ₹{product.price}</p>
              <p className="text-sm text-gray-500">Taxes Included | Free Shipping</p>
              <div className="w-full border border-gray-300 hover:border-black rounded px-3 py-2 mt-2 text-sm">
                <select
                  className="w-full"
                  onClick={(e) => e.stopPropagation()} // Prevent click propagation
                >
                  <option>Size</option>
                  <option>10ml</option>
                  <option>20ml</option>
                  <option>30ml</option>
                </select>
              </div>
              <div className="flex items-center mt-3 justify-center space-x-2 border border-gray-300 hover:border-black rounded p-2">
                <button
                  className="px-3 py-1 bg-gray-200 rounded focus:outline-none hover:border-black"
                  onClick={(e) => e.stopPropagation()} // Prevent click propagation
                >
                  -
                </button>
                <span className="font-medium">{product.quantity}</span>
                <button
                  className="px-3 py-1 bg-gray-200 rounded focus:outline-none hover:border-black"
                  onClick={(e) => e.stopPropagation()} // Prevent click propagation
                >
                  +
                </button>
              </div>
              {/* Add to Cart Button */}
              <button
                className="mt-3 w-full bg-black text-white py-2 px-4 rounded hover:bg-gray-500 focus:outline-none"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent click propagation
                  handleAddToCart(product);
                }}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Load More button */}
      {visibleProducts < products.length && (
        <div className="flex justify-center mt-8">
          <button
            onClick={handleLoadMore}
            className="bg-yellow-300 border border-yellow-700 w-40 h-12 text-yellow-800 shadow-md hover:bg-yellow-200 transition"
          >
            Load More
          </button>
        </div>
      )}

      {/* Show ProductDetail modal when a product is selected */}
      {selectedProduct && (
        <ProductDetail product={selectedProduct} closeModal={closeModal} />
      )}
    </div>
  );
};

export default FragranceFamilyCard;
