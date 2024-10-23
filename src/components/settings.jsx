import React, { useState, useEffect } from 'react';
import {
  FaHome,
  FaCartPlus,
  FaBox,
  FaChartLine,
  FaCogs,
  FaTimes,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import axios from '../utils/axios';
import Header2 from './header2';

const Settings = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };


  const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
  const handleStatusChange = async (orderId, orderEmail, newStatus) => {
    // Optionally, you can send a request to update the status in your backend here
    try {
      
      const response = await axios.put(`/order/update/${orderId}/status?token=${token}`, {
        status: newStatus,
        userEmail: orderEmail
      });
      console.log(response)

      if (response.data) {
        // Optionally, you can refresh the orders to reflect changes
        fetchOrders();
      } else {
        setError('Failed to update order status');
      }
    } catch (error) {
      setError('Error updating order status');
    }
  };


  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`/dashboard/orders/status?token=${token}`);
      console.log('Full API Response:', response?.data);

      if (response.data.success && Array.isArray(response?.data?.data)) {
        setOrders(response?.data?.data); // Correct access to data array
      } else {
        setError('Expected an array of customers');
      }
    } catch (err) {
      setError('Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <>
      <div className="flex scroll h-screen">
        <aside
          className={`fixed top-0 left-0 h-full bg-black text-white flex flex-col space-y-6 p-4 transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
            } md:translate-x-0 md:relative md:w-64`}
        >
          <button
            className="md:hidden absolute top-4 right-4 text-white"
            onClick={closeSidebar}
          >
            <FaTimes size={24} />
          </button>
          <nav>
            <ul className="space-y-4">
              <Link to='/admin' className="flex items-center space-x-2">
                <FaHome />
                <span>Dashboard</span>
              </Link>
              <Link to='/orders' className="flex items-center space-x-2">
                <FaCartPlus />
                <span>Orders</span>
              </Link>
              <Link to='/products' className="flex items-center space-x-2">
                <FaBox />
                <span>Products</span>
              </Link>
              <Link to='/addproducts' className="flex items-center space-x-2">
                <FaBox />
                <span>Add Products</span>
              </Link>
              <Link to='/admin/settings' className="flex items-center space-x-2">
                <FaCogs />
                <span>Settings</span>
              </Link>
            </ul>
          </nav>
        </aside>

        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
            onClick={closeSidebar}
          ></div>
        )}

        <div className="flex-1 scroll flex flex-col">
          <header className="flex items-center justify-between bg-white shadow-lg px-6 py-4">
            <div className="flex items-center">
              <button
                className="text-gray-500 focus:outline-none lg:hidden"
                onClick={toggleSidebar}
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  ></path>
                </svg>
              </button>
              <h2 className="text-2xl font-semibold text-gray-800 ml-4">Settings</h2>
            </div>
          </header>

          <main className="flex-1 overflow-y-auto p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-700">Orders ({orders?.length})</h3>
            </div>

            {loading && <p className="text-gray-500">Loading orders...</p>}
            {error && <p className="text-red-500">{error}</p>}

            <div className="mt-6 overflow-hidden bg-white shadow rounded-lg">
              <div className="overflow-x-auto">
                <table className="min-w-full table-auto">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Order ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Customer
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Products
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Order Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Total
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {Array.isArray(orders) && orders?.map((customer) => (
                      Array.isArray(customer?.orders) && customer.orders.map((order) => (
                        <tr key={order.orderId}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {order.orderId}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {customer.username}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {Array.isArray(order.products) ? (
                              order.products.map((product, index) => (
                                <div key={index}>
                                  {product.productName?.name} (x{product.quantity})
                                </div>
                              ))
                            ) : (
                              <span>No products available</span>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            <select
                              value={order.status}
                              onChange={(e) => handleStatusChange(order.orderId, customer.email, e.target.value)}
                              className="border border-gray-300 rounded-md p-1"
                            >
                              <option value="pending">Pending</option>
                              <option value="processing">Processing</option>
                              <option value="shipped">Shipped</option>
                              <option value="delivered">Delivered</option>
                              <option value="cancelled">Cancelled</option>
                            </select>
                          </td>

                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {order.orderDate}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            Rs {order.totalAmount?.toFixed(2)}
                          </td>
                        </tr>
                      ))
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default Settings;
