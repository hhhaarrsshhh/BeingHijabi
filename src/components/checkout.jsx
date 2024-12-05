import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate(); // Initialize the useNavigate hook

  const { product, quantity } = location.state || { product: null, quantity: 0 };

  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
    country: "India",
    address: "",
    city: "",
    region: "Uttar Pradesh",
    postalCode: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);

    // Navigate to PaymentComponent after form submission
    navigate("/payment", { state: { product, quantity, formData } });
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6 flex justify-center">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-5xl">
        <h1 className="text-2xl font-bold mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Section */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Customer Details */}
              <div>
                <h2 className="text-lg font-semibold mb-4">Customer Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email *"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="p-2 border rounded w-full"
                  />
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name *"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    className="p-2 border rounded w-full"
                  />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name *"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    className="p-2 border rounded w-full"
                  />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone *"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="p-2 border rounded w-full"
                  />
                </div>
              </div>

              {/* Delivery Details */}
              <div>
                <h2 className="text-lg font-semibold mb-4">Delivery Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    required
                    className="p-2 border rounded w-full"
                  >
                    <option value="India">India</option>
                    <option value="USA">USA</option>
                    <option value="Canada">Canada</option>
                    <option value="Australia">Australia</option>
                  </select>
                  <textarea
                    name="address"
                    placeholder="Address *"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    className="p-2 border rounded w-full h-20"
                  ></textarea>
                  <input
                    type="text"
                    name="city"
                    placeholder="City *"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                    className="p-2 border rounded w-full"
                  />
                  <select
                    name="region"
                    value={formData.region}
                    onChange={handleInputChange}
                    required
                    className="p-2 border rounded w-full"
                  >
                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Karnataka">Karnataka</option>
                  </select>
                  <input
                    type="text"
                    name="postalCode"
                    placeholder="Zip / Postal Code *"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    required
                    className="p-2 border rounded w-full"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="bg-black text-white py-3 px-6 rounded hover:bg-gray-800"
              >
                Continue
              </button>
            </form>
          </div>

          {/* Right Section - Order Summary */}
          <div className="bg-gray-50 p-6 rounded-lg border">
            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

            {product && (
              <div className="flex items-center mb-4">
                <img
                  src={product.image} // Make sure `product` includes an image URL
                  alt={product.name}
                  className="w-16 h-16 object-cover mr-4"
                />
                <div>
                  <p className="font-medium">{product.name}</p>
                  <p className="text-gray-500">Qty: {quantity}</p>
                </div>
                <p className="ml-auto font-semibold">₹{product.price}</p>
              </div>
            )}

            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between text-gray-600">
                <span>Items:</span>
                <span>₹{(product.price * quantity).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Delivery:</span>
                <span>₹150.00</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Taxes:</span>
                <span>₹381.20</span>
              </div>
              <div className="flex justify-between font-bold text-lg">
                <span>Total:</span>
                <span>₹{(parseFloat(product.price.replace(/,/g, "")) || 0) * (isNaN(quantity) ? 0 : quantity) + 150 + 381.20}</span>
              </div>
            </div>

            <div className="flex items-center justify-center mt-6">
              <span className="text-black text-sm font-medium">
                &#128274; Secure Checkout
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
