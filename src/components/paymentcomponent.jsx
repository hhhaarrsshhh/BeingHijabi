import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const PaymentComponent = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { product, quantity, formData } = location.state || {};

  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [billingAddress, setBillingAddress] = useState(formData ? formData.address : '');
  const [processingPayment, setProcessingPayment] = useState(false);

  const handleCreditCardPayment = (e) => {
    e.preventDefault();
    setProcessingPayment(true);

    setTimeout(() => {
      setProcessingPayment(false);
      alert('Payment Successful');
      navigate('/order-confirmation', { state: { product, quantity, formData } });
    }, 2000);
  };

  const handlePaypalPayment = () => {
    alert('PayPal Payment Coming Soon!');
    // Implement PayPal Integration
  };

  const handleRazorpayPayment = () => {
    const options = {
      key: 'your-razorpay-key-here',
      amount: (product.price * quantity + 150 + 381.2) * 100, // in paise
      currency: 'INR',
      name: 'Your Business Name',
      description: 'Test Transaction',
      image: '/your-logo.png',
      handler: function (response) {
        alert('Payment Successful with Razorpay');
        navigate('/order-confirmation', { state: { product, quantity, formData } });
      },
      prefill: {
        name: 'Customer Name',
        email: 'customer@example.com',
        contact: '+911234567890',
      },
    };
    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6 flex justify-center">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-5xl">
        <h1 className="text-2xl font-bold mb-8">Payment</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Section - Order Summary */}
          <div className="lg:col-span-1">
            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
            {product && (
              <div className="flex items-center mb-4">
                <img
                  src={product.image}
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
                <span>
                  ₹
                  {(
                    (parseFloat(product.price.replace(/,/g, "")) || 0) *
                      (isNaN(quantity) ? 0 : quantity) +
                    150 +
                    381.2
                  ).toFixed(2)}
                </span>
              </div>

              {/* Display Billing Address in Order Summary */}
              <div className="mt-4 text-gray-700">
                <h3 className="font-semibold">Billing Address:</h3>
                <p>{billingAddress}</p>
              </div>
            </div>
          </div>

          {/* Right Section - Payment Form */}
          <div className="lg:col-span-2 bg-gray-50 p-6 rounded-lg border">
            <h2 className="text-lg font-semibold mb-4">Payment Information</h2>

            <form onSubmit={handleCreditCardPayment} className="space-y-6">
              {/* Card Number */}
              <div>
                <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">
                  Card Number
                </label>
                <input
                  id="cardNumber"
                  type="text"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  placeholder="1234 5678 9012 3456"
                  className="p-2 border rounded w-full"
                  required
                />
              </div>

              {/* Expiry Date */}
              <div>
                <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700">
                  Expiry Date
                </label>
                <input
                  id="expiryDate"
                  type="text"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                  placeholder="MM/YY"
                  className="p-2 border rounded w-full"
                  required
                />
              </div>

              {/* CVV */}
              <div>
                <label htmlFor="cvv" className="block text-sm font-medium text-gray-700">
                  CVV
                </label>
                <input
                  id="cvv"
                  type="text"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                  placeholder="123"
                  className="p-2 border rounded w-full"
                  required
                />
              </div>

              <button
                type="submit"
                className="bg-black text-white py-3 px-6 rounded hover:bg-gray-800 w-full"
                disabled={processingPayment}
              >
                {processingPayment ? 'Processing...' : 'Debit Card'}
              </button>
            </form>

            {/* Other Payment Options */}
            <div className="mt-6">
              <button
                onClick={handlePaypalPayment}
                className="w-full py-3 px-6 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Paypal
              </button>
              <button
                onClick={handleRazorpayPayment}
                className="w-full mt-4 py-3 px-6 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Razorpay
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentComponent;
