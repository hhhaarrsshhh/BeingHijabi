import React, { useEffect, useState } from 'react';
import axios from '../utils/axios';
import Header from './Header';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa6';
import { toast } from 'react-toastify';

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancelReason, setCancelReason] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [cancelOrderId, setCancelOrderId] = useState(null);
  const navigate = useNavigate();

  // Retrieve the token from cookies
  const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];

  useEffect(() => {
    // Fetch the orders from the API
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`/order/user/orders?token=${token}`);
        console.log(response.data.orders);
        setOrders(response.data.orders);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching orders:', error);
        setLoading(false);
      }
    };

    fetchOrders();
  }, [token]);

  // Handle cancellation of an order
  const handleCancelOrder = async (orderId) => {
    if (!cancelReason.trim()) {
      alert('Please enter a reason to cancel the order.');
      return;
    }

    setIsSubmitting(true);

    try {
      // Send cancellation request with orderId and reason
      const response = await axios.put(`/order/cancel/${orderId}?token=${token}`, {
        cancelReason,
      });

      console.log('Order cancellation response:', response.data);

      // Update the order status locally
      setOrders(orders.map(order => order._id === orderId ? { ...order, status: 'Cancelled' } : order));

      alert('Order cancelled successfully');

      // Close the modal after success
      setCancelOrderId(null);
    } catch (error) {
      console.error('Error cancelling order:', error.response ? error.response.data : error.message);
      alert('Failed to cancel the order');
    } finally {
      setIsSubmitting(false);
    }
  };

  const generateInvoice = async (orderId) => {
    try {
      const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
      if (!token) {
        toast.error('Authentication token not found. Please log in again.');
        return;
      }

      // Request to generate invoice and download the PDF
      const response = await axios.get(`/order/generate/${orderId}?token=${token}`, {
        responseType: 'blob' // Important to handle binary data
      });

      // Create a blob from the response and open it in a new tab
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      window.open(url, '_blank');

      toast.success('Invoice generated successfully.');
    } catch (error) {
      console.error('Error generating invoice:', error);
      toast.error('Failed to generate invoice.');
    }
  };

  // Open the cancellation modal
  const openCancelModal = (orderId) => {
    setCancelOrderId(orderId);
  };

  // Display loading state
  if (loading) {
    return <p>Loading...</p>;
  }

  // Display when there are no orders
  if (orders.length === 0) {
    return (
      <>
        <div className="flex flex-col justify-center items-center mt-10 bg-white p-10 rounded-md w-full md:w-6/12 lg:w-4/12 mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="absolute top-16 left-0 mt-4 ml-4 flex items-center text-gray-700 px-4 py-2 rounded-lg hover:bg-black hover:text-white transition duration-300"
          >
            <FaArrowLeft className="mr-2" />
            Go Back
          </button>
          <h2 className="text-lg font-semibold mb-4">No orders yet</h2>
          <p>Go to the store to place an order.</p>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="flex flex-col items-center mt-10 px-4 lg:px-0">
        <h2 className="text-2xl font-semibold mb-6">Orders</h2>
        <div className="w-full lg:w-8/12 bg-white p-6 shadow-md rounded-lg">
          {orders.map((order) => (
            <div key={order._id} className="border-b py-4">
              <div className="flex flex-col lg:flex-row justify-between">
                <div>
                  <h3 className="font-semibold">Order #{order._id}</h3>
                  <p className="text-gray-600">
                    Products: {order.products.map((item, index) => (
                      <span key={item.product._id}>
                        {item.product.name}
                        {index < order.products.length - 1 && ', '}
                      </span>
                    ))}
                  </p>
                </div>
                <div className="text-left lg:text-right mt-4 lg:mt-0">
                  <p className={`font-semibold ${order.status === 'Delivered' ? 'text-green-500' : 'text-yellow-500'}`}>
                    {order.status}
                  </p>
                  <p className="font-semibold">Total: Rs{order.totalAmount.toFixed(2)}</p>
                  <button
                    onClick={() => generateInvoice(order._id)}
                    className="whitespace-nowrap bg-black text-white hover:bg-white hover:text-black border border-black px-4 py-2 rounded mr-4 mt-2 lg:mt-0"
                  >
                    Download Invoice
                  </button>
                  {/* Only show the Cancel button if the order is neither Delivered nor Cancelled */}
                  {order.status !== 'Delivered' && order.status !== 'Cancelled' && (
                    <button
                      onClick={() => openCancelModal(order._id)}
                      className="mt-2 bg-black text-white hover:bg-white hover:text-black border border-black px-4 py-2 rounded-md"
                    >
                      Cancel Order
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal for cancelling the order */}
      {cancelOrderId && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50 px-4">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Cancel Order #{cancelOrderId}</h2>
            <label className="block mb-2">Reason for Cancellation:</label>
            <textarea
              value={cancelReason}
              onChange={(e) => setCancelReason(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded-md"
              rows="4"
              placeholder="Enter your reason for cancellation"
            ></textarea>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setCancelOrderId(null)}
                className="bg-gray-500 text-white px-4 py-2 rounded-md mr-2"
              >
                Close
              </button>
              <button
                onClick={() => handleCancelOrder(cancelOrderId)}
                className={`bg-black text-white px-4 py-2 rounded-md ${isSubmitting ? 'opacity-50' : ''}`}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Cancelling...' : 'Submit'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Order;
