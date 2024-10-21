import React, { useState, useEffect } from 'react';
import {
    FaHome,
    FaCartPlus,
    FaUser,
    FaBox,
    FaChartLine,
    FaCogs,
    FaTimes,
    FaBars,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import axios from '../utils/axios'; // Import axios
import Header2 from './header2';

const Orders = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [orders, setOrders] = useState([]); // State to hold orders data
    const [loading, setLoading] = useState(true); // State to manage loading state
    const [error, setError] = useState(null); // State to manage error messages

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const closeSidebar = () => {
        setIsSidebarOpen(false);
    };

    const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];

    // Fetch orders data using Axios
    const fetchOrders = async () => {
        setLoading(true); // Start loading before fetching
        try {
            const response = await axios.get(`/dashboard/total/orders?token=${token}`);
            console.log('Full API Response:', response.data); // Log the full response for debugging
            
            // Ensure the response is structured correctly
            if (response.data.success && Array.isArray(response.data.data.customers)) {
                setOrders(response.data.data.customers); // Update state with customers
            } else {
                setError('Expected an array of orders'); // Handle unexpected response
            }
        } catch (err) {
            setError('Failed to fetch orders'); // Handle error
        } finally {
            setLoading(false); // Stop loading after fetching
        }
    };

    // useEffect to fetch data when the component mounts
    useEffect(() => {
        fetchOrders();
    }, []);

    return (
        <>
            <Header2 />
            <div className="flex scroll h-screen">
                {/* Sidebar */}
                <aside
                    className={`fixed top-0 left-0 h-full bg-black text-white flex flex-col space-y-6 p-4 transition-transform duration-300 ease-in-out ${
                        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
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
                            {/* <Link to='/customers' className="flex items-center space-x-2">
                                <FaUser />
                                <span>Customers</span>
                            </Link> */}
                            <Link to='/products' className="flex items-center space-x-2">
                                <FaBox />
                                <span>Products</span>
                            </Link>
                            <Link to='/addproducts' className="flex items-center space-x-2">
                                <FaBox />
                                <span>Add Products</span>
                            </Link>
                            {/* <Link to='/reports' className="flex items-center space-x-2">
                                <FaChartLine />
                                <span>Reports</span>
                            </Link> */}
                            <Link to='/admin/settings' className="flex items-center space-x-2">
                                <FaCogs />
                                <span>Settings</span>
                            </Link>
                        </ul>
                    </nav>
                </aside>

                {/* Overlay for smaller screens */}
                {isSidebarOpen && (
                    <div
                        className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
                        onClick={closeSidebar}
                    ></div>
                )}

                {/* Main Content */}
                <div className="flex-1 scroll flex flex-col">
                    {/* Top Navigation */}
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
                            <h2 className="text-2xl font-semibold text-gray-800 ml-4">Orders</h2>
                        </div>
                    </header>

                    {/* Orders Table */}
                    <main className="flex-1 overflow-y-auto p-6">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-medium text-gray-700">Orders ({orders?.length})</h3>
                        </div>

                        {/* Loading and Error States */}
                        {loading && <p className="text-gray-500">Loading orders...</p>}
                        {error && <p className="text-red-500">{error}</p>}

                        <div className="mt-6 overflow-hidden bg-white shadow rounded-lg">
                            <div className="overflow-x-auto">
                                <table className="min-w-full table-auto">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Customer ID
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Customer
                                            </th>
                                            <th className="hidden md:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Total Orders
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Payment Status
                                            </th>
                                            <th className="hidden md:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Date
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Total
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {Array.isArray(orders) && orders.map((order) => (
                                            <tr key={order._id}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {order.customerId} {/* Replace with actual order ID */}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {order.name} {/* Replace with actual customer name */}
                                                </td>
                                                <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {order.totalOrders} {/* Replace with actual total orders */}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-500">
                                                    {order.paymentStatus} {/* Replace with actual payment status */}
                                                </td>
                                                <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {order.joinDate} {/* Format the date */}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    Rs{order.totalSpent.toFixed(2)} {/* Format the total */}
                                                </td>
                                            </tr>
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

export default Orders;
