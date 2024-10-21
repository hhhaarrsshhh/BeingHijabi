import React, { useState } from "react";
import axios from "../utils/axios";
import { FaFacebook, FaInstagram ,FaCheckCircle} from "react-icons/fa";

const Footer = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (email) {
            try {
                // Replace with your API endpoint
                const response = await axios.post('users/user/subscribe', { email });
                setMessage(<div className="flex items-center justify-center space-x-2 text-green-500">
                    <FaCheckCircle /> {/* Green tick icon */}
                    <span>Subscription successful!</span>
                </div>);
                setEmail(''); // Clear the input field after success
            } catch (error) {
                setMessage('Subscription failed. Please try again.');
            }
        } else {
            setMessage('Please enter a valid email.');
        }
    };

    return (
        <footer className="bg-black text-white py-10">
            <div className="container mx-auto px-4">
                {/* Subscribe to emails */}
                <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row justify-between items-center mb-8 space-y-4 lg:space-y-0">
                    <div className="w-full lg:w-auto text-center lg:text-left">
                        <p className="text-lg font-semibold">Subscribe to our emails</p>
                    </div>
                    <div className="relative w-full lg:w-1/3 flex">
                        <input
                            type="email"
                            value={email}
                            onChange={handleEmailChange}
                            placeholder="Email"
                            className="px-4 py-2 w-full bg-transparent border border-gray-500 text-white focus:outline-none"
                        />
                        <button 
                            type="submit"
                            className="absolute right-0 top-0 px-6 py-2 bg-gray-600 hover:bg-gray-500 transition text-white"
                        >
                            →
                        </button>
                    </div>
                </form>

                {/* Display message */}
                {message && <p className="text-center text-sm text-gray-400">{message}</p>}

                {/* Divider */}
                <div className="border-t border-gray-700 my-8"></div>

                {/* Social Links */}
                <div className="flex justify-center space-x-6 mb-8">
                    <a href="#" className="text-white hover:text-gray-400 transition">
                        <FaFacebook size={20} />
                    </a>
                    <a href="#" className="text-white hover:text-gray-400 transition">
                        <FaInstagram size={20} />
                    </a>
                </div>

                {/* Country/Region and Payment Methods */}
                <div className="flex flex-col lg:flex-row justify-between items-center space-y-6 lg:space-y-0">
                    {/* Country/Region */}
                    <div className="flex flex-col lg:flex-row items-center text-sm space-y-4 lg:space-y-0 lg:space-x-4">
                        <div>
                            <label htmlFor="country" className="sr-only">Country/Region</label>
                            <select 
                                id="country" 
                                className="px-4 py-2 bg-black border border-gray-500 text-white"
                            >
                                <option value="IN">INR ₹ | India</option>
                            </select>
                        </div>
                        <p className="text-gray-400 text-xs text-center lg:text-left">
                            &copy; 2024, BeingHijabi Powered by Shopify
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
