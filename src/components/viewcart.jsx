import React, { useState, useEffect } from "react";
import axios from "../utils/axios";
import ClipLoader from "react-spinners/ClipLoader";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import Header2 from "../components/header2";
import { useNavigate } from "react-router-dom";
import { IoMdClose } from "react-icons/io";

const ViewCart = () => {
  const [cart, setCart] = useState([]);
  const [loadingCart, setLoadingCart] = useState(true);
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const handleViewProductClick = (productId) => {
    navigate(`/singleproduct/${productId}`);
  };
  const fetchProducts = async () => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];

    if (token) {
      try {
        const response = await axios.get(
          `/users/user/cart/view?token=${token}`
        );
        setCart(response.data.carts);
        setRecommendedProducts(response.data.randomProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Failed to load products.");
        toast.error("Error fetching products.");
      } finally {
        setLoadingCart(false);
        setLoadingProducts(false);
      }
    } else {
      setLoadingCart(false);
      setLoadingProducts(false);
      toast.error("User does not have a token.");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleRemove = async (id) => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];

    if (token) {
      try {
        const response = await axios.put(
          `/users/user/cart/remove?token=${token}`,
          { productId: id }
        );
        if (response.data.success) {
          setCart(cart.filter((item) => item._id !== id));
          fetchProducts();
          toast.success("Item removed from cart.");
        } else {
          toast.error("Failed to remove item from cart.");
        }
      } catch (error) {
        console.error("Error removing item from cart:", error);
        toast.error("Error removing item from cart.");
      }
    } else {
      toast.error("User does not have a token.");
    }
  };

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity < 1) {
      alert("Quantity cannot be less than 1.");
      return;
    }

    setCart(
      cart.map((item) =>
        item._id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const calculateTotal = () => {
    return cart
      .reduce(
        (total, item) =>
          total + (item.priceAfterDiscount - item.discount) * item.quantity,
        0
      )
      .toFixed(2);
  };

  const platformFee = 10.0;
  const deliveryCharges = 5.0;

  const calculateFinalAmount = () => {
    return (
      parseFloat(calculateTotal()) +
      platformFee +
      deliveryCharges
    ).toFixed(2);
  };

  const handlePlaceOrder = () => {
    navigate("/checkout");
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50">
        <button
          onClick={() => navigate(-1)}
          className="absolute top-16 left-0 mt-12 ml-4 flex items-center text-gray-700 px-4 py-2 rounded-lg hover:bg-black hover:text-white transition duration-300"
        >
          <FaArrowLeft className="mr-2" />
        </button>
        {/* Left Side - Cart Items */}
        <div className="flex-1 overflow-y-auto mt-10 p-4 lg:w-2/3">
          {loadingCart ? (
            <div className="flex justify-center items-center h-64">
              <ClipLoader color="#3B82F6" size={50} />
            </div>
          ) : cart && cart.length === 0 ? (
            <div className="text-center text-gray-600">
              <p className="text-lg font-semibold">No products in the cart.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {cart &&
                cart.length > 0 &&
                cart.map((item) => (
                  <div
                    key={item._id}
                    className="relative flex flex-col items-center justify-center border border-gray-200 p-4 shadow-md rounded-lg bg-white"
                  >
                    {/* Close Button */}
                    <button
                      onClick={() => handleRemove(item._id)}
                      className="absolute top-2 right-2 text-gray-600 hover:text-red-600"
                    >
                      <IoMdClose size={20} />
                    </button>

                    {/* Product Image */}
                    <img
                      src={item.images[0]}
                      alt={item.name}
                      className="w-32 h-32 object-cover rounded-md mb-4"
                    />
                    <div className="text-center">
                      <h2 className="text-lg font-semibold">{item.name}</h2>
                      <p className="text-gray-600">
                        <span className="text-red-600 font-semibold mr-2">
                          {item.discount}% OFF
                        </span>
                        <span className="line-through text-gray-400">
                          {item.price}
                        </span>
                      </p>
                      <p className="text-gray-800">
                        Final Price :{" "}
                        <span className="text-green-600 font-semibold">
                          {item.priceAfterDiscount}
                        </span>
                      </p>
                      <div className="flex items-center justify-center mt-2">
                        {/* Quantity Selector with + and - */}
                        <div className="flex items-center space-x-1">
                          <button
                            onClick={() =>
                              handleQuantityChange(item._id, item.quantity - 1)
                            }
                            className={`w-6 h-6 flex justify-center items-center bg-gray-200 rounded-full ${
                              item.quantity <= 1
                                ? "opacity-50 cursor-not-allowed"
                                : "hover:bg-gray-300"
                            }`}
                            disabled={item.quantity <= 1}
                          >
                            -
                          </button>
                          <span className="px-2">{item.quantity}</span>
                          <button
                            onClick={() =>
                              handleQuantityChange(item._id, item.quantity + 1)
                            }
                            className="w-6 h-6 flex justify-center items-center bg-gray-200 rounded-full hover:bg-gray-300"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>

        {/* Right Side - Summary */}
        {cart.length > 0 && (
          <div className="lg:w-1/3 lg:h-72 bg-white p-6  shadow-md lg:sticky lg:top-0  mt-10 rounded-lg">
            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Total Price:</span>
                <span>{calculateTotal()}</span>
              </div>
              <div className="flex justify-between">
                <span>Platform Fee:</span>
                <span>{platformFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Charges:</span>
                <span>{deliveryCharges.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-semibold">
                <span>Final Amount:</span>
                <span>{calculateFinalAmount()}</span>
              </div>
            </div>
            <button
              onClick={handlePlaceOrder}
              className="mt-6 w-full px-4 py-2 bg-white text-black border border-black rounded-md hover:bg-black hover:text-white"
            >
              Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default ViewCart;















