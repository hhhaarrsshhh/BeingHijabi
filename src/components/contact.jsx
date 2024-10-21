import React, { useState } from 'react';
import Header from './Header';
import { FaArrowLeft } from 'react-icons/fa';
import axios from '../utils/axios';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    comment: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Replace 'https://api.example.com/contact' with your actual API endpoint
      const response = await axios.post("/users/user/contacts/message", formData);
      alert("Form submitted successfully!");
      console.log(response.data); // Log response from the server (optional)
      // Reset form after submission
      setFormData({
        name: "",
        email: "",
        phoneNumber: "",
        comment: "",
      });
    } catch (error) {
      console.error("There was an error submitting the form!", error);
      alert("Form submission failed. Please try again.");
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen flex flex-col lg:flex-row gap-8 justify-center bg-gray-50 p-4">
        <button 
                onClick={() => navigate(-1)} 
                className="absolute top-16 left-0 mt-4 ml-4 flex items-center  text-gray-700 px-4 py-2 rounded-lg hover:bg-black hover:text-white transition duration-300">
                <FaArrowLeft className="mr-2" />
                
            </button>
        
        {/* Contact Information Section */}
        <section className="w-full lg:w-1/2 mb-12 lg:mb-0">
          <div className=" p-6 rounded-lg ">
            <h2 className="text-4xl font-bold mb-8 text-center text-gray-800">Get in Touch</h2>
            <div className="grid grid-cols-1 gap-8">
              <div className="flex flex-col">
                <h3 className="text-xl font-semibold mb-4 text-gray-700">Contact Information</h3>
                <p className="text-md text-gray-600 mb-2">
                  <i className="fas fa-envelope mr-2"></i>
                  Email: <a href="mailto:info@ecommerce.com" className="text-blue-500 hover:underline">info@ecommerce.com</a>
                </p>
                <p className="text-md text-gray-600 mb-2">
                  <i className="fas fa-phone mr-2"></i>
                  Phone: +91 9109792700
                </p>
                <p className="text-md text-gray-600">
                  <i className="fas fa-map-marker-alt mr-2"></i>
                  Address: Koh-e-Fiza, Bhopal (M.P.)
                </p>
              </div>
              <div className="w-full">
                <h3 className="text-xl font-semibold mb-4 text-gray-700">Find Us</h3>
                <div className="w-full h-64 bg-gray-200 rounded-lg overflow-hidden">
                  <iframe
                    title="Company Location"
                    className="w-full h-full"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3660.2745228629445!2d77.3984592749191!3d23.264924981699048!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x397c694f8fbe169d%3A0x14f2e5fcf91d9f6a!2sD55%20BDA%20Colony%2C%20Koh-e-Fiza%2C%20Bhopal%2C%20Madhya%20Pradesh%20462003!5e0!3m2!1sen!2sin!4v1691777016094!5m2!1sen!2sin"
                    allowFullScreen
                    loading="lazy"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <form onSubmit={handleSubmit} className="w-full lg:h-[450px] lg:w-1/2 max-w-lg p-8 rounded-lg">
      <h2 className="text-3xl font-semibold mb-6 text-gray-800">Contact Us</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Name */}
        <div>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        {/* Email */}
        <div>
          <input
            type="email"
            name="email"
            placeholder="Email *"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>
      </div>

      {/* Phone Number */}
      <div className="mt-4">
        <input
          type="tel"
          name="phoneNumber"
          placeholder="Phone number"
          value={formData.phoneNumber}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
        />
      </div>

      {/* Comment */}
      <div className="mt-4">
        <textarea
          name="comment"
          placeholder="Comment"
          value={formData.comment}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black h-32"
        />
      </div>

      {/* Submit Button */}
      <div className="mt-6">
        <button
          type="submit"
          className="w-full py-3 bg-black text-white font-bold rounded-lg hover:bg-white border border-black hover:text-black transition duration-300"
        >
          Send
        </button>
      </div>
    </form>
      </div>
    </>
  );
};

export default Contact;
